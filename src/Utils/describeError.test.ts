import { describeError } from "./describeError.js";

const BEARER = "Bearer eyJhbGciOiJSUzI1NiJ9.super-secret-access-token";

describe("describeError", () => {
  it("summarises a xero-node validation rejection without the bearer token", () => {
    const rejection = {
      response: {
        statusCode: 400,
        statusMessage: "Bad Request",
        request: { headers: { authorization: BEARER, "xero-tenant-id": "tenant" } },
        headers: { "www-authenticate": BEARER },
        body: {
          ErrorNumber: 10,
          Type: "ValidationException",
          Message: "A validation exception occurred",
          Elements: [
            { ValidationErrors: [{ Message: "Name is required" }, { Message: "Email is invalid" }] },
          ],
        },
      },
      body: {},
    };

    const text = describeError(rejection);

    expect(text).toBe(
      "Xero API 400 Bad Request: A validation exception occurred; Name is required; Email is invalid"
    );
    expect(text).not.toContain(BEARER);
    expect(text).not.toContain("authorization");
  });

  it("summarises an expired-token rejection", () => {
    const text = describeError({
      response: {
        statusCode: 401,
        body: { Title: "Unauthorized", Status: 401, Detail: "TokenExpired: token expired at 2026-09-06" },
      },
      body: null,
    });
    expect(text).toBe("Xero API 401: Unauthorized; TokenExpired: token expired at 2026-09-06");
  });

  it("falls back to the status alone when the body has no message", () => {
    expect(describeError({ response: { statusCode: 429 }, body: undefined })).toBe("Xero API 429");
  });

  it("never reads token-like keys from an arbitrary object", () => {
    const text = describeError({ headers: { authorization: BEARER }, access_token: BEARER });
    expect(text).toBe("Xero API error");
  });

  it("passes Error messages and strings through", () => {
    expect(describeError(new Error("boom"))).toBe("boom");
    expect(describeError("plain string")).toBe("plain string");
    expect(describeError(undefined)).toBe("undefined");
  });
});
