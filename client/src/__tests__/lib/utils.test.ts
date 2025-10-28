import { describe, it, expect } from "vitest";
import { priceFormat } from "@/lib/utils";

describe("priceFormat", () => {
  it("formats price in EUR", () => {
    const result = priceFormat(12345);
    expect(result).toContain("12.345,00");
    expect(result).toContain("€");
  });

  it("formats small price correctly", () => {
    const result = priceFormat(99);
    expect(result).toContain("99,00");
    expect(result).toContain("€");
  });

  it("formats large price correctly", () => {
    const result = priceFormat(1234567);
    expect(result).toContain("1.234.567,00");
    expect(result).toContain("€");
  });

  it("handles zero price", () => {
    const result = priceFormat(0);
    expect(result).toContain("0,00");
    expect(result).toContain("€");
  });
});
