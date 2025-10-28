import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorResults from "@/components/layout/ErrorResults";

describe("ErrorResults", () => {
  const renderErrorResults = (message: string) => {
    render(<ErrorResults message={message} />);
    return {
      message: screen.getByTestId("error-message"),
      container: screen.getByTestId("error-results"),
      icon: screen.getByTestId("error-icon"),
    };
  };

  it("should render error message", () => {
    const { message } = renderErrorResults("Something went wrong");
    expect(message).toBeInTheDocument();
  });

  it("should have proper accessibility attributes", () => {
    const { container } = renderErrorResults("Error occurred");
    expect(container).toHaveAttribute("role", "alert");
    expect(container).toHaveAttribute("aria-live", "assertive");
  });
});
