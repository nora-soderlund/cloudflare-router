export type CloudflareRequest<Env = unknown, Inputs extends CloudflareRequestInputs = {
  query?: {},
  headers?: {},
  parameters?: {},
  body?: {}
}> = {
  incoming: Request;
  env: Env;
  context: ExecutionContext;

  method: string;
  url: URL;
} & Inputs;

export type CloudflareRequestInputs = {
  body?: unknown | undefined;
  parameters?: Record<string, unknown>;
  query?: Record<string, string>;
  headers?: Record<string, string>;
}
