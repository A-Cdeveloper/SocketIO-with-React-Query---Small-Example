import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyResults from "@/components/layout/EmptyResults";

describe("EmptyResults", () => {
  const renderEmptyResults = (type: "cars" | "users", message: string) => {
    render(<EmptyResults type={type} message={message} />);
    return {
      title: screen.getByTestId("empty-title"),
      message: screen.getByTestId("empty-message"),
      container: screen.getByTestId("empty-results"),
      icon: screen.getByTestId("empty-icon"),
    };
  };

  it("should render empty message for cars", () => {
    const { title, message } = renderEmptyResults("cars", "No cars available");
    expect(title).toHaveTextContent("No cars");
    expect(message).toBeInTheDocument();
  });

  it("should have proper accessibility attributes", () => {
    const { container } = renderEmptyResults("cars", "Test message");
    expect(container).toHaveAttribute("role", "status");
    expect(container).toHaveAttribute("aria-live", "polite");
  });
});
