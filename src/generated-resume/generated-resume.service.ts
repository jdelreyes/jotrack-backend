import { Injectable } from '@nestjs/common';
import { GeneratedResume } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GeneratedResumeService {
  public constructor(private prismaService: PrismaService) {}

  public async retrieveGeneratedResumes(): Promise<GeneratedResume[]> {
    return this.prismaService.generatedResume.findMany({});
  }
}
