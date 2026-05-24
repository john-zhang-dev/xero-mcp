import { Auditor } from "../Auditor.js";
import { IRequestMiddleware } from "./IRequestMiddleware.js";

export const AuditMiddleware: IRequestMiddleware = async (request, next) => {
  const { name } = request.params;
  Auditor.record(`${name}_begin`);
  const result = await next(request);
  Auditor.record(`${name}_end`);
  return result;
};
