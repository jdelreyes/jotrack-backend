import { GeneratedResumeEntity } from '../entity';

export class GeneratedResumeBuilder {
  content: string;
  userJobApplicationJobId: number;
  userJobApplicationUserId: number;

  public setContent(content: string): GeneratedResumeBuilder {
    this.content = content;
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
