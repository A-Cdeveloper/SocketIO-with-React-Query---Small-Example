import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import AllCars from "@/features/cars/components/AllCars";
import type { CarType } from "@shared/types";
import * as carsAPI from "@/features/cars/api/cars";

// Mock environment variables
vi.mock("@/lib/env", () => ({
  env: {
    VITE_REST_API_URL: "http://localhost:3001/api",
    VITE_SOCKET_URL: "http://localhost:3001",
  },
}));

// Mock useInfiniteScroll - vraća ref za infinite scroll div
vi.mock("@/hooks/useInfiniteScroll", () => ({
  useInfiniteScroll: vi.fn(() => ({ current: null })),
}));

// Mock API call
vi.mock("@/features/cars/api/cars");

describe("AllCars", () => {
  const mockCars: CarType[] = [
    { id: 1, car_name: "A6", brand: "Audi", price: 12345, description: "Test" },
    {
      id: 2,
      car_name: "C-Class",
      brand: "Mercedes",
      price: 23456,
      description: "Test",
    },
  ];

  // Helper function za render sa QueryClient i Router
  const renderAllCars = () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    return render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AllCars />
        </QueryClientProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    renderAllCars();
    expect(screen.getByLabelText("Loading cars")).toBeInTheDocument();
  });

  it("renders error when API fails", async () => {
    // Simuliraj API error
    vi.mocked(carsAPI.getCars).mockRejectedValueOnce(new Error("API Error"));

    renderAllCars();

    // Čekaj da se error prikaže
    await waitFor(() => {
      expect(screen.getByTestId("error-results")).toBeInTheDocument();
    });

    expect(screen.getByTestId("error-message")).toHaveTextContent("API Error");
  });

  it("renders cars when data is loaded", async () => {
    // Simuliraj successful API response
    vi.mocked(carsAPI.getCars).mockResolvedValueOnce({
      cars: mockCars,
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
        hasNext: false,
        totalPages: 1,
      },
    });

    renderAllCars();

    // Čekaj da se cars prikažu (React Query je asinhrono)
    await waitFor(() => {
      expect(screen.getAllByTestId("car-list-item")).toHaveLength(2);
    });
  });
});
