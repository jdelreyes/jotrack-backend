import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as parsePdf from 'pdf-parse';

@Injectable()
export class ResumeService {
  public constructor(private prismaService: PrismaService) {}

  public async uploadFile(resume: Express.Multer.File) {
    const bufferResult: parsePdf.Result = await parsePdf(resume.buffer);
    const resumeContent: string = bufferResult.text;
    const resumeSections: string[] = resumeContent.split(/[A-Z][a-z]*:/);

    return resumeContent;
  }
}
