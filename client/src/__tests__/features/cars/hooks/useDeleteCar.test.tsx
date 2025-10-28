import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useDeleteCar from "@/features/cars/hooks/useDeleteCar";
import * as carsAPI from "@/features/cars/api/cars";

// Mock API
vi.mock("@/features/cars/api/cars", () => ({
  deleteCar: vi.fn(),
}));

describe("useDeleteCar", () => {
  let queryClient: QueryClient;

  const renderUseDeleteCar = () => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return renderHook(() => useDeleteCar(), { wrapper });
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  it("should delete car and remove queries", async () => {
    vi.mocked(carsAPI.deleteCar).mockResolvedValueOnce(undefined);

    const { result } = renderUseDeleteCar();

    // Set up some queries first
    queryClient.setQueryData(["cars", { page: 1 }], {
      cars: [],
      pagination: {},
    });
    queryClient.setQueryData(["cars", { page: 2 }], {
      cars: [],
      pagination: {},
    });

    result.current.deleteCarMutation(1);

    await waitFor(() => {
      expect(carsAPI.deleteCar).toHaveBeenCalledWith(1);
    });

    // Should remove cars queries
    expect(queryClient.getQueryState(["cars", { page: 1 }])).toBeUndefined();
    expect(queryClient.getQueryState(["cars", { page: 2 }])).toBeUndefined();
  });
});
