import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GeneratedResumeService } from './generated-resume.service';
import { GeneratedResume } from '@prisma/client';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/api/generated-resumes')
export class GeneratedResumeController {
  public constructor(private generatedResumeService: GeneratedResumeService) {}

  @ApiResponse({ description: 'get all generated resumes' })
  @Get()
  @HttpCode(HttpStatus.OK)
  public retrieveGeneratedResumes(): Promise<GeneratedResume[]> {
    return this.generatedResumeService.retrieveGeneratedResumes();
  }
}
