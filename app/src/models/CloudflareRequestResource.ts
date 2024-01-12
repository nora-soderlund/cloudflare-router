import { CloudflareRequestHandler } from "./CloudflareRequestHandler";

export interface CloudflareRequestResource {
  method: string;
  path: RegExp | string;
  handlers: CloudflareRequestHandler[];
}