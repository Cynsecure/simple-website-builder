import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePublishPage, builderPublishStateAtom } from "../use-publish-page";
import { getDefaultStore } from "jotai";

vi.mock("@/core/hooks/use-builder-prop", () => ({
  useBuilderProp: vi.fn((key: string, defaultVal: any) => {
    if (key === "onPublish") return mockOnPublish;
    if (key === "onPublishStateChange") return mockOnPublishStateChange;
    return defaultVal;
  }),
}));

vi.mock("@/core/hooks/use-get-page-data", () => ({
  useGetPageData: () => () => ({
    blocks: [{ _id: "b1", _type: "Box" }],
  }),
}));

vi.mock("@/core/hooks/use-theme", () => ({
  useTheme: () => [{ font: "Inter" }],
}));

vi.mock("@/core/hooks/use-languages", () => ({
  useLanguages: () => ({
    selectedLang: "en",
    fallbackLang: "en",
  }),
}));

vi.mock("@/core/hooks/use-save-page", () => ({
  checkMissingTranslations: vi.fn(() => false),
}));

vi.mock("@/core/export-html/json-to-html", () => ({
  getHTMLFromBlocks: vi.fn(async () => "<div>Mock HTML</div>"),
}));

vi.mock("../use-screen-size-width", () => ({
  useCanvasDisplayWidth: () => [1200],
}));

const mockOnPublish = vi.fn();
const mockOnPublishStateChange = vi.fn();

describe("usePublishPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const store = getDefaultStore();
    store.set(builderPublishStateAtom, "NOT_PUBLISHED");
  });

  it("should have initial publish state as NOT_PUBLISHED", () => {
    const { result } = renderHook(() => usePublishPage());
    expect(result.current.publishState).toBe("NOT_PUBLISHED");
  });

  it("should call onPublish and update state on successful publish", async () => {
    mockOnPublish.mockResolvedValueOnce(true);
    const { result } = renderHook(() => usePublishPage());

    let publishResult: any;
    await act(async () => {
      publishResult = await result.current.publishPage();
    });

    expect(mockOnPublish).toHaveBeenCalledTimes(1);
    expect(mockOnPublish).toHaveBeenCalledWith({
      autoSave: false,
      blocks: [{ _id: "b1", _type: "Box" }],
      theme: { font: "Inter" },
      needTranslations: false,
      domElements: "<div>Mock HTML</div>",
      canvasDisplayWidth: 1200,
    });
    expect(mockOnPublishStateChange).toHaveBeenCalledWith("PUBLISHING");
    expect(publishResult).toBe(true);

    // Wait for setTimeout in hook
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });
    expect(result.current.publishState).toBe("PUBLISHED");
    expect(mockOnPublishStateChange).toHaveBeenCalledWith("PUBLISHED");
  });

  it("should revert state and rethrow when onPublish fails", async () => {
    const publishError = new Error("Publish failed");
    mockOnPublish.mockRejectedValueOnce(publishError);
    const { result } = renderHook(() => usePublishPage());

    let caughtError: any;
    await act(async () => {
      try {
        await result.current.publishPage();
      } catch (e) {
        caughtError = e;
      }
    });

    expect(caughtError).toBe(publishError);
    expect(result.current.publishState).toBe("NOT_PUBLISHED");
    expect(mockOnPublishStateChange).toHaveBeenLastCalledWith("NOT_PUBLISHED");
  });
});
