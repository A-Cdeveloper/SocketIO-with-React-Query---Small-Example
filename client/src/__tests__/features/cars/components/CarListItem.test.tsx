import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CarListItem from "@/features/cars/components/CarListItem";
import type { CarType } from "@shared/types";

describe("CarListItem", () => {
  const car: CarType = {
    id: 1,
    car_name: "A6",
    brand: "Audi",
    price: 12345,
    description: "Test description",
  };

  const renderCar = () => {
    render(
      <MemoryRouter>
        <CarListItem car={car} />
      </MemoryRouter>
    );
    return {
      nameEl: screen.getByRole("heading", { name: car.car_name }),
      brandEl: screen.getByTestId("car-brand"),
      priceEl: screen.getByTestId("car-price"),
      linkEl: screen.getByLabelText(`View ${car.car_name}`),
    };
  };

  it("should render car name, brand and price", () => {
    const { nameEl, brandEl, priceEl } = renderCar();
    expect(nameEl).toBeInTheDocument();
    expect(brandEl).toBeInTheDocument();
    expect(priceEl).toBeInTheDocument();
  });

  it("should render formatted price", () => {
    const { priceEl } = renderCar();
    expect(priceEl.textContent).toContain("12.345,00");
  });

  it("should link to car details page", () => {
    const { linkEl } = renderCar();
    expect(linkEl).toHaveAttribute("href", `/cars/${car.id}`);
  });
});
