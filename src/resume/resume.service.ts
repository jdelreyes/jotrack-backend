import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as parsePdf from 'pdf-parse';
import { Resume } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ResumeService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async uploadResume(
    userId: number,
    resumeFile: Express.Multer.File,
  ): Promise<Resume> {
    try {
      const bufferResult: parsePdf.Result = await parsePdf(resumeFile.buffer);
      const resumeContent: string = bufferResult.text;
      const resumeSections: string[] = resumeContent.split(/[A-Z][a-z]*:/);

      const objective = resumeSections[1].replaceAll('\n', '').trim();
      const experience = resumeSections[2]
        .split('•')
        .filter((resumeSection) => resumeSection.trim())
        .map((bulletPoint) => bulletPoint.replaceAll('\n', '').trim());
      const education = resumeSections[3]
        .split('•')
        .filter((resumeSection) => resumeSection.trim())
        .map((bulletPoint) => bulletPoint.replaceAll('\n', '').trim());
      const skills = resumeSections[4]
        .split('•')
        .filter((resumeSection) => resumeSection.trim())
        .map((bulletPoint) => bulletPoint.replaceAll('\n', '').trim());
      const additionalInformation = resumeSections[5]
        .split('•')
        .filter((resumeSection) => resumeSection.trim())
        .map((bulletPoint) => bulletPoint.replaceAll('\n', '').trim());

      return await this.prismaService.resume.create({
        data: {
          objective,
          experience,
          education,
          skills,
          additionalInformation,
          userId,
        },
      });
    } catch (error) {
      console.error(error);
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
}
