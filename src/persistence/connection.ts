export interface Connection {
  query<Output extends Record<string, unknown>>(
    query: string,
    params?: unknown[]
  ): Promise<Output[]>;
  close(): Promise<void>;
}
