import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/openai/openai.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Job, Resume } from '@prisma/client';

@Injectable()
export class ResumeBuilderService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly openAIService: OpenAIService,
  ) {}

  public async generateResume(resume: Resume, job: Job) {
    const resumeContent: string = await this.mapResumeToMessageBody(resume);
    const jobContent: string = await this.mapJobToMessageBody(job);

    const content = `
    instructions: make a newly-generated resume based on the resume tailored to the job provided below.

    -------
    resume
    -------
    ${resumeContent}

    -------
    job description
    -------
    ${jobContent}
    `;

    const threadId: string = (
      await this.prismaService.openAI.findUnique({
        where: {
          userId: resume.userId,
        },
        select: {
          threadId: true,
        },
      })
    ).threadId;

    await this.openAIService.createMessage(threadId, content);
    let run = await this.openAIService.run(threadId);

    while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      run = await this.openAIService.retrieveRun(run.thread_id, run);
    }

    if (run.status === 'completed') {
      const messages = await this.openAIService.retrieveMessages(run.thread_id);

      for (const message of messages.data.reverse()) {
        if (message.role == 'assistant')
          return message.content[0]['text']['value'];
      }
      return null;
    } else {
      console.log(run.status);
    }
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
