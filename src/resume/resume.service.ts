import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as parsePdf from 'pdf-parse';
import { Resume } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ResumeEntity } from './entity';
import { ResumeBuilder } from './pattern';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class ResumeService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly openaiService: OpenaiService,
  ) {}

  public async uploadResume(
    userId: number,
    resumeFile: Express.Multer.File,
  ): Promise<Resume> {
    try {
      const resume: ResumeEntity =
        await this.mapResumeFileToResumeEntity(resumeFile);

      return await this.prismaService.resume.create({
        data: {
          ...resume,
          userId,
        },
      });
    } catch (error) {
      // console.error(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') throw new ConflictException();
      }
      throw new BadRequestException();
    }
  }

  public async retrieveOwnResume(userId: number): Promise<Resume> {
    return await this.prismaService.resume.findUnique({
      where: { userId: userId },
    });
  }

  public async reUploadResume(
    userId: number,
    resumeFile: Express.Multer.File,
  ): Promise<Resume> {
    try {
      const resume: ResumeEntity =
        await this.mapResumeFileToResumeEntity(resumeFile);

      return await this.prismaService.resume.update({
        where: {
          userId,
        },
        data: {
          ...resume,
          userId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  private async mapResumeFileToResumeEntity(
    resumeFile: Express.Multer.File,
  ): Promise<ResumeEntity> {
    try {
      const bufferResult: parsePdf.Result = await parsePdf(resumeFile.buffer);
      const resumeContent: string = bufferResult.text;
      const resumeSections: string[] = resumeContent.split(/[A-Z][a-z]*:/);

      const objective: string = resumeSections[1].replaceAll('\n', '').trim();
      const experience: string[] = resumeSections[2]
        .split('•')
        .filter((resumeSection) => resumeSection.trim())
        .map((bulletPoint) => bulletPoint.replaceAll('\n', '').trim());
      const education: string[] = resumeSections[3]
        .split('•')
        .filter((resumeSection) => resumeSection.trim())
        .map((bulletPoint) => bulletPoint.replaceAll('\n', '').trim());
      const skills: string[] = resumeSections[4]
        .split('•')
        .filter((resumeSection) => resumeSection.trim())
        .map((bulletPoint) => bulletPoint.replaceAll('\n', '').trim());
      const additionalInformation: string[] = resumeSections[5]
        .split('•')
        .filter((resumeSection) => resumeSection.trim())
        .map((bulletPoint) => bulletPoint.replaceAll('\n', '').trim());

      const resume: ResumeEntity = new ResumeBuilder()
        .setObjective(objective)
        .setExperience(experience)
        .setEducation(education)
        .setSkills(skills)
        .setAdditionalInformation(additionalInformation)
        .build();

      return resume;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
