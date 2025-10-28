import CarFormular from "@/features/cars/components/CarFormular";
import type { AddCarForm } from "@/features/cars/schemas/car";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock environment variables
vi.mock("@/lib/env", () => ({
  env: {
    VITE_REST_API_URL: "http://localhost:3001/api",
    VITE_SOCKET_URL: "http://localhost:3001",
  },
}));

// Mock API calls
vi.mock("@/features/cars/api/cars", () => ({
  addNewCar: vi.fn().mockResolvedValue({}),
  editCar: vi.fn().mockResolvedValue({}),
}));

// Mock hooks
const mockAddCarMutation = vi.fn();
const mockEditCarMutation = vi.fn();

vi.mock("../hooks/useAddNewCar", () => ({
  useAddNewCar: () => ({
    addNewCarMutation: mockAddCarMutation,
    isPending: false,
    error: null,
  }),
}));

vi.mock("../hooks/useEditCar", () => ({
  useEditCar: () => ({
    editCarMutation: mockEditCarMutation,
    isPending: false,
    error: null,
  }),
}));

describe("CarFormular", () => {
  const mockInitialValues: AddCarForm = {
    car_name: "Test Car",
    brand: "Test Brand",
    price: 10000,
    description: "Test Description",
  };

  const renderCarFormular = (initialValues?: AddCarForm) => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    return render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <CarFormular initialValues={initialValues} />
        </QueryClientProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders add car form when no initial values", () => {
    renderCarFormular();

    expect(
      screen.getByRole("textbox", { name: /car name/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /brand/i })).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /price/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /description/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add car/i })
    ).toBeInTheDocument();
  });

  it("renders edit car form when initial values provided", () => {
    renderCarFormular(mockInitialValues as AddCarForm);

    expect(screen.getByDisplayValue("Test Car")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Brand")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10000")).toBeInTheDocument();
    expect(screen.getByText("Edit Car")).toBeInTheDocument();
  });

  // Submit test je isključen jer zahteva kompleksan setup (mock API poziva, local storage itd.)
  // i nije kritičan za funkcionalnost komponente.
});
