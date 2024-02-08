import { Resume } from '@prisma/client';
import { ResumeBuilder } from '../pattern/resume-builder.pattern';

export class ResumeEntity implements Resume {
  objective: string;
  experience: string[];
  education: string[];
  skills: string[];
  additionalInformation: string[];
  userId: number;

  constructor(resumeBuilder: ResumeBuilder) {
    this.objective = resumeBuilder.objective;
    this.experience = resumeBuilder.experience;
    this.education = resumeBuilder.education;
    this.skills = resumeBuilder.skills;
    this.additionalInformation = resumeBuilder.additionalInformation;
    this.userId = resumeBuilder.userId;
  }
}
