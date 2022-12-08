export interface Connection {
  query<Output>(query: string, params?: unknown[]): Promise<Output[]>;
  close(): Promise<void>;
}
