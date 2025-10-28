import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useOutsideClick from "@/hooks/useOutsideClick";

describe("useOutsideClick", () => {
  const renderUseOutsideClick = (callback = vi.fn()) => {
    const { result } = renderHook(() => useOutsideClick(callback));
    return result.current;
  };

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should return refEl", () => {
    const result = renderUseOutsideClick();
    expect(result).toHaveProperty("refEl");
    expect(result.refEl).toBeDefined();
  });

  it("should call callback when clicking outside", () => {
    const callback = vi.fn();
    const result = renderUseOutsideClick(callback);

    const div = document.createElement("div");
    result.refEl.current = div;
    document.body.appendChild(div);

    document.body.click();

    expect(callback).toHaveBeenCalled();
  });

  it("should not call callback when clicking inside", () => {
    const callback = vi.fn();
    const result = renderUseOutsideClick(callback);

    const div = document.createElement("div");
    result.refEl.current = div;
    document.body.appendChild(div);

    div.click();

    expect(callback).not.toHaveBeenCalled();
  });
});
