import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job, Resume } from '@prisma/client';
import OpenAI from 'openai';
import { Assistant } from 'openai/resources/beta/assistants/assistants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OpenaiService extends OpenAI {
  private assistant: Assistant;
  private thread: OpenAI.Beta.Threads.Thread;

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
        console.log('1');
        console.log(assistant);
      })
      .catch((error) => {
        console.error(error);
      });

    this.beta.threads
      .create()
      .then((thread) => {
        this.thread = thread;
        console.log('2');
        console.log(thread);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // todo
  public generateResume(resume: Resume, job: Job) {
    console.log(resume, job);
    return null;
  }

  /**
   * retrieves message list that have been previously created.
   * in this case, is an array of newly created stringified resume.
   * @returns {Promise<OpenAI.Beta.Threads.Messages.ThreadMessagesPage>}
   */
  private async retrieveMessages(): Promise<OpenAI.Beta.Threads.Messages.ThreadMessagesPage> {
    return await this.beta.threads.messages.list(this.thread.id);
  }

  /**
   * creates a message in a thread associated with the user.
   * the content that is sent to the thread is, in this case,
   * is the stringified resume and job that are to be converted
   * into a newly created resume.
   * @param {Resume} resume - applicant's resume.
   * @param {Job} job - being currently applied.
   * @returns {Promise<OpenAI.Beta.Threads.Messages.ThreadMessage>}
   */
  private async createThreadMessage(
    resume: Resume,
    job: Job,
  ): Promise<OpenAI.Beta.Threads.Messages.ThreadMessage> {
    const resumeContent: string = await this.mapResumeToMessageBody(resume);
    const jobContent: string = await this.mapJobToMessageBody(job);

    const content: string = `
    resume:
    ${resumeContent}
    ---
    job:
    ${jobContent}
    `;

    return await this.beta.threads.messages.create(this.thread.id, {
      role: 'user',
      content,
    });
  }

  /**
   * retrieves thread that has been previously ran.
   * @returns {Promise<OpenAI.Beta.Threads.Runs.Run>}
   */
  private async retrieveRanThread(): Promise<OpenAI.Beta.Threads.Runs.Run> {
    const run: OpenAI.Beta.Threads.Runs.Run = await this.runThreadMessage();

    return await this.beta.threads.runs.retrieve(this.thread.id, run.id);
  }

  /**
   * create a thread that is associated with the assistant's capability using its id.
   * in this case, it's resume building.
   * @returns {Promise<OpenAI.Beta.Threads.Runs.Run>}
   */
  private async runThreadMessage(): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return await this.beta.threads.runs.create(this.thread.id, {
      assistant_id: this.assistant.id,
    });
  }

  /**
   * maps Resume instance to string.
   * @param {Resume} resume - resume to be mapped.
   * @returns {Promise<string>} Promise
   */
  private async mapResumeToMessageBody(resume: Resume): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: resume.userId,
      },
    });

    return `
    fullName: ${user.firstName} ${user.lastName}
    email: ${user.email}
    phoneNumber: ${user.phoneNumber}

    objective:
    ${resume.objective}
    experience:
    ${resume.experience.toString()}
    education:
    ${resume.education.toString()}
    skills:
    ${resume.skills.toString()}
    additionalInformation:
    ${resume.additionalInformation.toString()}
    `;
  }

  /**
   * maps Job instance to string.
   * @param {Job} job - resume to be mapped.
   * @returns {Promise<string>}
   */
  private async mapJobToMessageBody(job: Job): Promise<string> {
    return `
    job title:
    ${job.title}
    job description:
    ${job.description}
    job requirements:
    ${job.requirements.toString()}
    job position:
    ${job.position}
    `;
  }
}
