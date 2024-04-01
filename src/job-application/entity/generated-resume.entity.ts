import { GeneratedResume } from '@prisma/client';
import { GeneratedResumeBuilder } from '../pattern';

export class GeneratedResumeEntity implements GeneratedResume {
  content: string;
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
  userJobApplicationJobId: number;
  userJobApplicationUserId: number;

  public constructor(generatedResumeBuilder: GeneratedResumeBuilder) {
    this.content = generatedResumeBuilder.content;
    this.userJobApplicationJobId =
      generatedResumeBuilder.userJobApplicationJobId;
    this.userJobApplicationUserId =
      generatedResumeBuilder.userJobApplicationUserId;
  }
}
