import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin } from "@/features/auth/hooks/useLogin";
import * as authAPI from "@/features/auth/api/auth";

// Mock dependencies
vi.mock("@/features/auth/api/auth", () => ({
  login: vi.fn(),
}));

const mockLoginToStore = vi.fn();
vi.mock("@/store/authStore", () => ({
  useAuthStore: () => ({
    login: mockLoginToStore,
  }),
}));

describe("useLogin", () => {
  let queryClient: QueryClient;

  const renderUseLogin = () => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return renderHook(() => useLogin(), { wrapper });
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  it("should call loginToStore on successful login", async () => {
    const mockResponse = {
      user: {
        id: 1,
        email: "test@test.com",
        username: "testuser",
        createdAt: "2025-01-01T00:00:00Z",
      },
      token: "mock-token",
      refreshToken: "mock-refresh-token",
    };

    vi.mocked(authAPI.login).mockResolvedValueOnce(mockResponse);

    const { result } = renderUseLogin();

    result.current.loginMutation({
      email: "test@test.com",
      password: "password123",
    });

    await waitFor(() => {
      expect(mockLoginToStore).toHaveBeenCalledWith(
        mockResponse.user,
        mockResponse.token,
        mockResponse.refreshToken
      );
    });
  });

  it("should set error when login fails", async () => {
    vi.mocked(authAPI.login).mockRejectedValueOnce(new Error("Login failed"));

    const { result } = renderUseLogin();

    result.current.loginMutation({
      email: "test@test.com",
      password: "password123",
    });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
