import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Assistant } from 'openai/resources/beta/assistants/assistants';

@Injectable()
export class OpenaiService extends OpenAI {
  private assistant: Assistant;
  private thread: OpenAI.Beta.Threads.Thread;

  public constructor(readonly configService: ConfigService) {
    super({ apiKey: configService.get('OPEN_AI_API_KEY') });

    this.createAssistant().then((assistant): void => {
      this.assistant = assistant;
    });

    this.createThread().then((thread) => {
      this.thread = thread;
    });
  }

  private async createAssistant(): Promise<Assistant> {
    return await this.beta.assistants.create({
      name: 'Resume Builder',
      description:
        "you help build a new resume for a user tailored to their desired job using the user's master or main resume and the job's description.",
      model: 'gpt-3.5-turbo',
    });
  }

  private async createThread(): Promise<OpenAI.Beta.Threads.Thread> {
    return await this.beta.threads.create();
  }

  public async createMessage(content: string) {
    this.beta.threads.messages.create(this.thread.id, {
      role: 'user',
      content,
    });
  }
}
