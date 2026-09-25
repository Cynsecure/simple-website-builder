import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RightTop from "../right-top";

const mockSavePage = vi.fn();
const mockPublishPage = vi.fn();
const mockSetRightPanel = vi.fn();
const mockOnPreview = vi.fn();

vi.mock("@/core/hooks", () => ({
  useRightPanel: () => ["block", mockSetRightPanel],
  useSavePage: () => ({ savePage: mockSavePage, saveState: "SAVED" }),
  usePublishPage: () => ({ publishPage: mockPublishPage, publishState: "NOT_PUBLISHED" }),
  useBuilderProp: (key: string, fallback: any) => {
    if (key === "onPreview") return mockOnPreview;
    return fallback;
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("RightTop Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all four buttons in the correct order with correct variants and styles", () => {
    const { container } = render(<RightTop />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(4);

    // 1st button: Theme (icon button)
    const themeBtn = buttons[0];
    expect(themeBtn.getAttribute("title")).toBe("Theme");
    expect(themeBtn.textContent).toBe(""); // Icon button with no text

    // 2nd button: Preview (icon button)
    const previewBtn = buttons[1];
    expect(previewBtn.getAttribute("title")).toBe("Preview");
    expect(previewBtn.textContent).toBe(""); // Icon button with no text

    // 3rd button: Save (secondary button)
    const saveBtn = buttons[2];
    expect(saveBtn.textContent).toContain("Saved");
    // Check that it has secondary button styling
    expect(saveBtn.className).toContain("bg-secondary");

    // 4th button: Publish (primary button, right-most)
    const publishBtn = buttons[3];
    expect(publishBtn.textContent).toContain("Publish");
    // Check that it has default (primary) button styling
    expect(publishBtn.className).toContain("bg-blue-500");
  });

  it("toggles theme panel when Theme button is clicked", () => {
    const { container } = render(<RightTop />);
    const themeBtn = container.querySelectorAll("button")[0];
    fireEvent.click(themeBtn);
    expect(mockSetRightPanel).toHaveBeenCalledWith("theme");
  });

  it("triggers onPreview when Preview button is clicked", () => {
    const { container } = render(<RightTop />);
    const previewBtn = container.querySelectorAll("button")[1];
    fireEvent.click(previewBtn);
    expect(mockOnPreview).toHaveBeenCalledTimes(1);
  });

  it("triggers savePage when Save button is clicked", () => {
    const { container } = render(<RightTop />);
    const saveBtn = container.querySelectorAll("button")[2];
    fireEvent.click(saveBtn);
    expect(mockSavePage).toHaveBeenCalledWith(false);
  });

  it("triggers publishPage when Publish button is clicked", async () => {
    mockPublishPage.mockResolvedValueOnce(true);
    const { container } = render(<RightTop />);
    const publishBtn = container.querySelectorAll("button")[3];
    fireEvent.click(publishBtn);
    await waitFor(() => {
      expect(mockPublishPage).toHaveBeenCalledTimes(1);
    });
  });
});
