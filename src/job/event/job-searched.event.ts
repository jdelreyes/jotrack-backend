export class JobSearchedEvent {
  constructor(
    public userId: number,
    public searchedJob: string,
  ) {}
}
