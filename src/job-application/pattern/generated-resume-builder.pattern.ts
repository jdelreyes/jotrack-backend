import { GeneratedResumeEntity } from '../entity';

export class GeneratedResumeBuilder {
  objective: string;
  experience: string[];
  education: string[];
  skills: string[];
  additionalInformation: string[];
  userJobApplicationJobId: number;
  userJobApplicationUserId: number;

  public setObjective(objective: string): GeneratedResumeBuilder {
    this.objective = objective;
    return this;
  }

  public setExperience(experience: string[]): GeneratedResumeBuilder {
    this.experience = experience;
    return this;
  }

  public setEducation(education: string[]): GeneratedResumeBuilder {
    this.education = education;
    return this;
  }

  public setSkills(skills: string[]): GeneratedResumeBuilder {
    this.skills = skills;
    return this;
  }

  public setAdditionalInformation(
    additionalInformation: string[],
  ): GeneratedResumeBuilder {
    this.additionalInformation = additionalInformation;
    return this;
  }

  public setUserJobApplicationUserId(
    userJobApplicationUserId: number,
  ): GeneratedResumeBuilder {
    this.userJobApplicationUserId = userJobApplicationUserId;
    return this;
  }

  public setUserJobApplicationJobId(userJobApplicationJobId: number) {
    this.userJobApplicationJobId = userJobApplicationJobId;
    return this;
  }

  public build() {
    return new GeneratedResumeEntity(this);
  }
}
