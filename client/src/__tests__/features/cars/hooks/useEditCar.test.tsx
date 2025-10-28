import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEditCar } from "@/features/cars/hooks/useEditCar";
import * as carsAPI from "@/features/cars/api/cars";

// Mock API
vi.mock("@/features/cars/api/cars", () => ({
  editCar: vi.fn(),
}));

describe("useEditCar", () => {
  let queryClient: QueryClient;

  const renderUseEditCar = () => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return renderHook(() => useEditCar(), { wrapper });
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  it("should edit car and remove queries", async () => {
    const updatedCar = {
      car_name: "Updated Car",
      brand: "Updated Brand",
      price: 50000,
      description: "Updated Description",
    };

    vi.mocked(carsAPI.editCar).mockResolvedValueOnce(updatedCar);

    const { result } = renderUseEditCar();

    // Set up some queries first
    queryClient.setQueryData(["cars", { page: 1 }], {
      cars: [],
      pagination: {},
    });
    queryClient.setQueryData(["car", 1], { id: 1, car_name: "Old Car" });

    result.current.editCarMutation({ id: 1, car: updatedCar });

    await waitFor(() => {
      expect(carsAPI.editCar).toHaveBeenCalledWith(1, updatedCar);
    });

    // Should remove cars queries and invalidate single car query
    expect(queryClient.getQueryState(["cars", { page: 1 }])).toBeUndefined();
  });
});
