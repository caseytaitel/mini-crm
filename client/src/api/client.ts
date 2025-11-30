import { API_BASE_URL } from "./constants";

export async function request<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      // Try to read any error body, but don't rely on it
      let details: unknown = null;
      try {
        details = await res.json();
      } catch {
        // ignore JSON parse errors for error responses
      }

      const message =
        typeof details === "object" && details && "error" in details
          ?
            (details as any).error
          : `API error: ${res.status}`;

      throw new Error(message);
    }

    // For 204 No Content, avoid parsing JSON
    if (res.status === 204) {
      // @ts-expect-error - caller expects something; here it's just void
      return undefined;
    }

    return (await res.json()) as T;
  } catch (err) {
    // Centralized network-level error
    if (err instanceof Error) {
      console.error("Network / API error:", err.message);
      throw err;
    }

    console.error("Unknown API error:", err);
    throw new Error("Unknown API error");
  }
}
