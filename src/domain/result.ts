export class Result<Type = unknown> {
  readonly isSuccess = Result.validateSuccessValue(this._value);
  readonly isFailure = !this.isSuccess;

  get value(): Type {
    if (!this.isSuccess) {
      this.logCurrentValues();
      throw new Error("Cannot get value from failure result");
    }
    return this._value as Type;
  }

  get error(): Error {
    if (!this.isFailure) {
      this.logCurrentValues();
      throw new Error("Cannot get error from success result");
    }
    return this._error as Error;
  }

  private constructor(private _value: Type | null, private _error?: Error) {}

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

  private logCurrentValues(): void {
    console.log({ value: this._value }, { error: this._error });
  }
}
