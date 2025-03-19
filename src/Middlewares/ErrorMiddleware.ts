import { IRequestMiddleware } from "./IRequestMiddleware.js";

export const ErrorMiddleware: IRequestMiddleware = async (request, next) => {
  try {
    return await next(request);
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Unexpected error occurred: ${error.message}`,
        },
      ],
    };
  }
};
