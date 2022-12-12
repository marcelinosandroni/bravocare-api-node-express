export interface QueryHandler<Result> {
  handle(): Promise<Result>;
}
