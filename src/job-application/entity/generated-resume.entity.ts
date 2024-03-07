import { generatedResume } from '@prisma/client';
import { GeneratedResumeBuilder } from '../pattern';

export class GeneratedResumeEntity implements generatedResume {
  objective: string;
  experience: string[];
  education: string[];
  skills: string[];
  additionalInformation: string[];
  dateTimeCreated: Date;
  dateTimeUpdated: Date;
  userJobApplicationJobId: number;
  userJobApplicationUserId: number;

  public constructor(generatedResumeBuilder: GeneratedResumeBuilder) {
    this.objective = generatedResumeBuilder.objective;
    this.experience = generatedResumeBuilder.experience;
    this.education = generatedResumeBuilder.education;
    this.skills = generatedResumeBuilder.skills;
    this.additionalInformation = generatedResumeBuilder.additionalInformation;
    this.userJobApplicationJobId =
      generatedResumeBuilder.userJobApplicationJobId;
    this.userJobApplicationUserId =
      generatedResumeBuilder.userJobApplicationUserId;
  }
}
