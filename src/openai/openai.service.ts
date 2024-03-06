import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Assistant } from 'openai/resources/beta/assistants/assistants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OpenAIService extends OpenAI {
  private assistant: Assistant;

  /**
   * instantiate an instance of OpenAIService that
   * retrieves assistant capability from the API key using Assistant ID.
   * it also creates a dedicated thread for the user.
   * this automatically retrieves the OpenAI API key and OpenAI Assistant ID
   * from .env file provided by the ConfigService.
   * @param {ConfigService} configService
   * @param {PrismaService} prismaService
   */
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

  public async retrieveLatestMessage(
    threadId: string,
  ): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage> {
    const retrievedMessages = await this.retrieveMessages(threadId);
    const messageListLength = retrievedMessages.data.length;

    return retrievedMessages.data[messageListLength - 1];
  }

  public async retrieveMessages(
    threadId: string,
  ): Promise<OpenAI.Beta.Threads.Messages.ThreadMessagesPage> {
    return await this.beta.threads.messages.list(threadId);
  }

  public async createMessage(
    threadId: string,
    content: string,
  ): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage> {
    return await this.beta.threads.messages.create(threadId, {
      role: 'user',
      content,
    });
  }

  public async retrieveRun(
    thread: OpenAI.Beta.Threads.Thread,
    run: OpenAI.Beta.Threads.Runs.Run,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return await this.beta.threads.runs.retrieve(thread.id, run.id);
  }

  public async run(
    thread: OpenAI.Beta.Threads.Thread,
  ): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return await this.beta.threads.runs.create(thread.id, {
      assistant_id: this.assistant.id,
      instructions:
        'do not address the user nor add any additional introductory/closing statements. give the answer right away instead',
    });
  }
}
