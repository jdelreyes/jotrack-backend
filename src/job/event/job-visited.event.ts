export class JobVisitedEvent {
  constructor(
    public userId: number,
    public jobId: number,
  ) {}
}
