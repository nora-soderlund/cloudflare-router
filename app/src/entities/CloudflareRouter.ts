import { CloudflareRequestResource } from "../models/CloudflareRequestResource";
import { CloudflareRequestHandler } from "../models/CloudflareRequestHandler";
import { CloudflareRequest } from "../models/CloudflareRequest";

export class CloudflareRouter {
  private readonly cloudflareRequests: CloudflareRequestResource[] = [];

  public addRequestHandler(method: string, path: RegExp | string, ...handlers: CloudflareRequestHandler[]) {
    this.cloudflareRequests.push({
      method,
      path,
      handlers
    });

    return this;
  }

  public async handleRequest(request: Request, env: unknown, context: ExecutionContext) {
    const url = new URL(request.url);

    const cloudflareRequest: CloudflareRequest = {
      incoming: request,
      env,
      context,
      method: request.method,
      url,
      headers: Object.fromEntries(request.headers.entries()),
      query: Object.fromEntries(url.searchParams.entries())
    };

    cloudflareRequest

    const pathName = cloudflareRequest.url.pathname.toLowerCase();

    const matchedCloudflareRequest = this.cloudflareRequests.find((cloudflareRequest) => {
      if(cloudflareRequest.method !== request.method) {
        return false;
      }

      if(typeof cloudflareRequest.path === "string") {
        if(cloudflareRequest.path !== pathName) {
          return false;
        }

        return true;
      }

      const regExpExec = cloudflareRequest.path.exec(pathName);

      if(!regExpExec) {
        return false;
      }

      return true;
    });

    if(!matchedCloudflareRequest) {
      return Response.json({
        message: "Path resource not found."
      }, {
        status: 404
      });
    }

    console.debug("Handling request", { matchedCloudflareRequest });

    for(let cloudflareRequestHandler of matchedCloudflareRequest.handlers) {
      console.debug("Running request handler", { cloudflareRequestHandler });

      const result = await cloudflareRequestHandler(cloudflareRequest);

      if(result) {
        return result;
      }
    }

    return Response.json({
      message: "Path resource did not yield a response."
    }, {
      status: 502
    });
  }
}