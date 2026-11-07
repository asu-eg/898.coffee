import { ApiError, API_CONFIG, type ApiErrorResponse } from "./data";

export { ApiError };

async function parseErrorResponse(
  response: Response
): Promise<{ code: string; message: string }> {
  let code = "UNKNOWN_ERROR";
  let message = `HTTP Error ${response.status}`;

  try {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.error) {
      code = errorData.error.code || code;
      message = errorData.error.message || message;
    }
  } catch {
    if (response.status === 429) code = "RATE_LIMITED";
    if (response.status === 422) code = "INVALID_INPUT";
    if (response.status >= 500) code = "INTERNAL_ERROR";
  }

  return { code, message };
}

export async function postJson<T = unknown>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const { code, message } = await parseErrorResponse(response);
      throw new ApiError(response.status, code, message);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof ApiError) {
      throw err;
    }

    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError(408, "TIMEOUT", "Request timed out");
    }

    throw new ApiError(0, "NETWORK_ERROR", "Network error occurred");
  }
}
