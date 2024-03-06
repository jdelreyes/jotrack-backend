import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/openai/openai.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Job, Resume } from '@prisma/client';

@Injectable()
export class ResumeBuilderService {
  public constructor(
    private prismaService: PrismaService,
    private openAIService: OpenAIService,
  ) {}

  private async generateResume(resume: Resume, job: Job) {
    const content = `
    resume:
    ${this.mapResumeToMessageBody(resume)}

    ----
    job:
    ${this.mapJobToMessageBody(job)}
    `;

    const threadId = (
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

    const newResume = this.openAIService.retrieveLatestMessage(threadId);
    return newResume;
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
