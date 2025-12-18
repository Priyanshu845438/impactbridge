import { apiRequest, normalizeError } from "@/lib/api/client";

describe("apiRequest", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns parsed JSON payload on success", async () => {
    const jsonPayload = { message: "ok" };
    const mockFetch = jest.fn().mockResolvedValue({
      status: 200,
      ok: true,
      headers: {
        get: () => "application/json",
      },
      json: jest.fn().mockResolvedValue(jsonPayload),
      text: jest.fn(),
    });

    global.fetch = mockFetch;

    const response = await apiRequest({ path: "https://example.com/test" });

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/test", expect.objectContaining({
      method: "GET",
    }));
    expect(response).toEqual({
      status: 200,
      ok: true,
      data: jsonPayload,
    });
  });

  it("returns null data for 204 responses", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      status: 204,
      ok: true,
      headers: {
        get: () => null,
      },
      json: jest.fn(),
      text: jest.fn(),
    });

    global.fetch = mockFetch;

    const response = await apiRequest({
      path: "https://example.com/no-content",
      method: "POST",
      body: { foo: "bar" },
    });

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/no-content", expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ foo: "bar" }),
    }));
    expect(response.data).toBeNull();
  });

  it("throws normalized error payload for non-OK responses", async () => {
    const errorPayload = { message: "Bad request", code: "INVALID" };
    const mockFetch = jest.fn().mockResolvedValue({
      status: 400,
      ok: false,
      headers: {
        get: () => "application/json",
      },
      json: jest.fn().mockResolvedValue(errorPayload),
      text: jest.fn(),
    });

    global.fetch = mockFetch;

    await expect(
      apiRequest({ path: "https://example.com/error" }),
    ).rejects.toEqual({
      status: 400,
      message: "Bad request",
      details: errorPayload,
    });
  });
});

describe("normalizeError", () => {
  it("uses provided message when available", () => {
    const error = normalizeError(422, { message: "Invalid input", field: "email" });
    expect(error).toEqual({
      status: 422,
      message: "Invalid input",
      details: { message: "Invalid input", field: "email" },
    });
  });

  it("falls back to generic message for unknown payload", () => {
    const error = normalizeError(503, "Service unavailable");
    expect(error).toEqual({
      status: 503,
      message: "Server error",
      details: "Service unavailable",
    });
  });
});
