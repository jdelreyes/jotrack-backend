import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Assistant } from 'openai/resources/beta/assistants/assistants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OpenAIService extends OpenAI {
  private assistant: Assistant;

  public constructor(
    readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({ apiKey: configService.get('OPEN_AI_API_KEY') });

    this.beta.assistants
      .retrieve(this.configService.get('OPEN_AI_ASSISTANT_ID'))
      .then((assistant) => {
        this.assistant = assistant;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public async createThread(): Promise<OpenAI.Beta.Threads.Thread> {
    return await this.beta.threads.create();
  }

  public async retrieveUserTheadByUserId(
    userId: number,
  ): Promise<OpenAI.Beta.Threads.Thread> {
    const threadId: string = (
      await this.prismaService.openAI.findUnique({
        where: {
          userId,
        },
        select: {
          threadId: true,
        },
      })
    ).threadId;

    return await this.beta.threads.retrieve(threadId);
  }

  public async retrieveLatestMessage(threadId: string) {
    const retrievedMessages = await this.retrieveMessages(threadId);
    const messageListLength = retrievedMessages.data.length;

    return retrievedMessages.data[messageListLength - 1];
  }

  public async retrieveMessages(
    threadId: string,
  ): Promise<OpenAI.Beta.Threads.Messages.MessagesPage> {
    return await this.beta.threads.messages.list(threadId);
  }

  public async retrieveRun(
    threadId: string,
    run: OpenAI.Beta.Threads.Runs.Run,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return await this.beta.threads.runs.retrieve(threadId, run.id);
  }

  public async createMessage(threadId: string, content: string) {
    return await this.beta.threads.messages.create(threadId, {
      role: 'user',
      content,
    });
  }

  public async run(threadId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return await this.beta.threads.runs.create(threadId, {
      assistant_id: this.assistant.id,
      instructions:
        'Please send the a newly-generated resume tailored to the job provided with the same template without introductory or summary statements',
    });
  }
}
