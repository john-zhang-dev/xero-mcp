import { AuditTool } from "../AuditTool.js";
import { IRequestMiddleware } from "./IRequestMiddleware.js";

export const AuditMiddleware: IRequestMiddleware = async (request, next) => {
  const { name } = request.params;
  AuditTool.record(`${name}_begin`);
  const result = await next(request);
  AuditTool.record(`${name}_end`);
  return result;
};
