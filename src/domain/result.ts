export class Result<Type = unknown> {
  isSuccess = Result.validateSuccessValue(this.value);
  isFailure = !this.isSuccess;

  private constructor(public value: Type | null, public error?: Error) {}

  private static validateSuccessValue(value: unknown): boolean {
    if (!!value || value === 0) {
      return true;
    }
    return false;
  }

  static from<Type>(value: Type): Result<Type> {
    if (Result.validateSuccessValue(value)) {
      return Result.success(value);
    }
    return Result.failure(new Error("Value is not valid"));
  }

  static success<Type>(value: Type): Result<Type> {
    return new Result<Type>(value);
  }

  static failure<Type>(error: Error): Result<Type> {
    return new Result<Type>(null, error);
  }
}
