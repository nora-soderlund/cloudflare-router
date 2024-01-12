import { CloudflareRequestHandler } from "../models/CloudflareRequestHandler";
import { Validator } from "@cfworker/json-schema";

export function handleJsonSchemaValidation(validator: Validator | Record<string, unknown>): CloudflareRequestHandler {
  const validatorInstance = (validator instanceof Validator)?(validator):(new Validator(validator));
  
  return async (request) => {
    console.log("validate");

    request.body = await request.incoming.json();

    const result = validatorInstance.validate(request.body);

    console.log("result", { result });

    if(!result.valid) {
      return Response.json({
        message: result.errors
      }, {
        status: 400
      });
    }
  }
}