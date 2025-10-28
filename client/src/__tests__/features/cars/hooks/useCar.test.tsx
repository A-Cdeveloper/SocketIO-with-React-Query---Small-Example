import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCar } from "@/features/cars/hooks/useCar";
import * as carsAPI from "@/features/cars/api/cars";

// Mock API
vi.mock("@/features/cars/api/cars", () => ({
  getCarById: vi.fn(),
}));

describe("useCar", () => {
  let queryClient: QueryClient;

  const renderUseCar = (id: number) => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return renderHook(() => useCar(id), { wrapper });
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  it("should fetch car data", async () => {
    const mockCar = {
      id: 1,
      car_name: "A6",
      brand: "Audi",
      price: 12345,
      description: "Test",
    };

    vi.mocked(carsAPI.getCarById).mockResolvedValueOnce(mockCar);

    const { result } = renderUseCar(1);

    await waitFor(() => {
      expect(result.current.car).toEqual(mockCar);
    });
  });
});
