import { ResumeEntity } from '../entity/resume.entity';

export class ResumeBuilder {
  objective: string;
  experience: string[];
  education: string[];
  skills: string[];
  additionalInformation: string[];
  userId: number;

  public setObjective(objective: string): ResumeBuilder {
    this.objective = objective;
    return this;
  }

  public setExperience(experience: string[]): ResumeBuilder {
    this.experience = experience;
    return this;
  }

  public setEducation(education: string[]): ResumeBuilder {
    this.education = education;
    return this;
  }

  public setSkills(skills: string[]) {
    this.skills = skills;
    return this;
  }

  public setAdditionalInformation(additionalInformation: string[]) {
    this.additionalInformation = additionalInformation;
    return this;
  }

  public setUserId(userId: number) {
    this.userId = userId;
    return this;
  }

  public build(): ResumeEntity {
    return new ResumeEntity(this);
  }
}
