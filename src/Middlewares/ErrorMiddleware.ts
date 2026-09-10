import { describeError } from "../Utils/describeError.js";
import { IRequestMiddleware } from "./IRequestMiddleware.js";

export const ErrorMiddleware: IRequestMiddleware = async (request, next) => {
  try {
    return await next(request);
  } catch (error: unknown) {
    return {
      content: [
        {
          type: "text",
          text: `Unexpected error occurred: ${describeError(error)}`,
        },
      ],
    };
  }
};
