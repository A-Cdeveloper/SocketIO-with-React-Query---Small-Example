import { refreshAccessToken } from "@/features/auth/api/auth";

export const apiFetch = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  let response = await fetch(url, options);

  if (response.status === 403) {
    const authStorage = JSON.parse(
      localStorage.getItem("auth-storage") || "{}"
    ).state;

    if (authStorage?.refreshToken) {
      try {
        const newToken = await refreshAccessToken(authStorage.refreshToken);

        authStorage.token = newToken;
        localStorage.setItem(
          "auth-storage",
          JSON.stringify({ state: authStorage })
        );

        const newHeaders = {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        };
        response = await fetch(url, { ...options, headers: newHeaders });
      } catch (error) {
        console.error("Refresh failed:", error);
      }
    }
  }

  return response;
};
