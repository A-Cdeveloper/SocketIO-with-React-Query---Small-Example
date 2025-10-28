import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useTheme } from "@/hooks/useTheme";

describe("useTheme", () => {
  const renderUseTheme = () => renderHook(() => useTheme()).result.current;

  beforeEach(() => {
    localStorage.clear();
  });

  it("should return isDark and toggleTheme", () => {
    const result = renderUseTheme();
    expect(result).toHaveProperty("isDark");
    expect(result).toHaveProperty("toggleTheme");
    expect(typeof result.isDark).toBe("boolean");
    expect(typeof result.toggleTheme).toBe("function");
  });

  it("should have isDark false when theme is not dark", () => {
    localStorage.setItem("theme", "light");
    const result = renderUseTheme();
    expect(result.isDark).toBe(false);
  });

  it("should have isDark true when theme is dark", () => {
    localStorage.setItem("theme", "dark");
    const result = renderUseTheme();
    expect(result.isDark).toBe(true);
  });

  it("should toggle theme and update localStorage", async () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(false);

    result.current.toggleTheme();

    await waitFor(() => {
      expect(result.current.isDark).toBe(true);
      expect(localStorage.getItem("theme")).toBe("dark");
    });

    result.current.toggleTheme();

    await waitFor(() => {
      expect(result.current.isDark).toBe(false);
      expect(localStorage.getItem("theme")).toBe("light");
    });
  });
});
