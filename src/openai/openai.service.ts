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

  public constructor(
    readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({ apiKey: configService.get('OPEN_AI_API_KEY') });

    this.beta.assistants
      .retrieve(this.configService.get('OPEN_AI_ASSISTANT_ID'))
      .then((assistant) => {
        this.assistant = assistant;
        console.log(assistant);
      })
      .catch((error) => {
        console.error(error);
      });

    this.beta.threads
      .create()
      .then((thread) => {
        this.thread = thread;
        console.log(thread);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   *
   * @param {Resume} resume - the user's main resume
   * @param {Job} job - the job being applied
   * @returns {string} thread
   */
  public async generateResume(resume: Resume, job: Job): Promise<string> {
    const resumeContent: string = await this.mapResumeToMessageBody(resume);
    const jobContent: string = await this.mapJobToMessageBody(job);

    const content: string = `
    resume:
    ${resumeContent}
    ---
    job:
    ${jobContent}
    `;

    const threadMessage: OpenAI.Beta.Threads.Messages.ThreadMessage =
      await this.beta.threads.messages.create(this.thread.id, {
        role: 'user',
        content,
      });

    return threadMessage.content.toString();
  }

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
