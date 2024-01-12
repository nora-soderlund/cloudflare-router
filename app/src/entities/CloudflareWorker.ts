import type { Request, ExecutionContext } from "@cloudflare/workers-types"
import { CloudflareRouter } from "./CloudflareRouter";

export class CloudflareWorker {
  constructor(
    private readonly router: CloudflareRouter
  ) {

  }

  async fetch(request: Request, env: unknown, context: ExecutionContext) {
    return await this.router.handleRequest(request, env, context);
  }

  async scheduled(event: ScheduledEvent, env: unknown, context: ExecutionContext) {

  }
}
