import { CloudflareRequest } from "./CloudflareRequest";

export type CloudflareRequestHandler = (request: CloudflareRequest<any, any>) => (undefined | void | Response) | (Promise<undefined | void | Response>);
