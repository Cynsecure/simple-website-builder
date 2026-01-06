import { useBuilderProp } from "@/core/hooks/use-builder-prop";
import { useGetPageData } from "@/core/hooks/use-get-page-data";
import { usePermissions } from "@/core/hooks/use-permissions";
import { useTheme } from "@/core/hooks/use-theme";
import { useThrottledCallback } from "@react-hookz/web";
import { getRegisteredChaiBlock } from "@chaibuilder/runtime";
import { atom, useAtom } from "jotai";
import { has, isEmpty, noop } from "lodash-es";
import { useLanguages } from "@/core/hooks/use-languages";
import { useIsPageLoaded } from "@/core/hooks/use-is-page-loaded";
import { getHTMLFromBlocks } from "../export-html/json-to-html";
import { canvasIframeAtom } from "@/core/atoms/ui";
import html2canvas from "html2canvas";
export const builderSaveStateAtom = atom<"SAVED" | "SAVING" | "UNSAVED">("SAVED"); // SAVING
builderSaveStateAtom.debugLabel = "builderSaveStateAtom";

const captureCanvasScreenshot = async (iframe: HTMLIFrameElement | null): Promise<string | undefined> => {
  if (!iframe?.contentDocument?.body) return undefined;

  try {
    const targetWidth = 1920;
    const targetHeight = 1080;

    const canvas = await html2canvas(iframe.contentDocument.body, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      width: targetWidth,
      height: targetHeight,
      windowWidth: targetWidth,
      windowHeight: targetHeight,
      logging: false,
    });

    // Resize to exact 1920x1080 if needed
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = targetWidth;
    resizedCanvas.height = targetHeight;
    const ctx = resizedCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
      return resizedCanvas.toDataURL("image/png", 0.8);
    }
    return canvas.toDataURL("image/png", 0.8);
  } catch (error) {
    console.warn("Failed to capture canvas screenshot:", error);
    return undefined;
  }
};

export const checkMissingTranslations = (blocks: any[], lang: string): boolean => {
  if (!lang) return false;

  return blocks.some((block) => {
    if (!block?._type || block._type === "PartialBlock") {
      return false;
    }

    try {
      const blockDef = getRegisteredChaiBlock(block._type);
      if (!blockDef) return false;

      const i18nProps = has(blockDef, "i18nProps") ? blockDef.i18nProps : [];

      return i18nProps.some((prop: string) => {
        const translatedProp = `${prop}-${lang}`;
        return !block[translatedProp] || isEmpty(block[translatedProp]);
      });
    } catch (error) {
      console.warn(`Failed to get block definition for type: ${block._type}`, error);
      return false;
    }
  });
};

export const useSavePage = () => {
  const [saveState, setSaveState] = useAtom(builderSaveStateAtom);
  const onSave = useBuilderProp("onSave", async (_args) => {});
  const onSaveStateChange = useBuilderProp("onSaveStateChange", noop);
  const onImageUpload = useBuilderProp("onImageUpload", async (_args) => {});
  const getPageData = useGetPageData();
  const [theme] = useTheme();
  const { hasPermission } = usePermissions();
  const { selectedLang, fallbackLang } = useLanguages();
  const [isPageLoaded] = useIsPageLoaded();
  const [canvasIframe] = useAtom(canvasIframeAtom);

  const needTranslations = () => {
    const pageData = getPageData();
    return !selectedLang || selectedLang === fallbackLang
      ? false
      : checkMissingTranslations(pageData.blocks || [], selectedLang);
  };

  const savePage = useThrottledCallback(
    async (autoSave: boolean = false) => {
      // if (!hasPermission("save_page") || !isPageLoaded) {
      // console.log("4 No permission to save");
      // console.log("has permission", hasPermission("save_page"))
      // console.log("is page loaded", isPageLoaded)
      // return;
      // }
      setSaveState("SAVING");
      onSaveStateChange("SAVING");
      const pageData = getPageData();

      const domElements = await getHTMLFromBlocks(pageData.blocks, theme);
      const screenshot = await captureCanvasScreenshot(canvasIframe as HTMLIFrameElement | null);

      await onSave({
        autoSave,
        blocks: pageData.blocks,
        theme,
        needTranslations: needTranslations(),
        domElements,
        screenshot,
      });
      setTimeout(() => {
        setSaveState("SAVED");
        onSaveStateChange("SAVED");
      }, 100);
      return true;
    },
    [getPageData, setSaveState, theme, onSave, onSaveStateChange, isPageLoaded, canvasIframe],
    3000, // save only every 5 seconds
  );

  const savePageAsync = async () => {
    if (!hasPermission("save_page") || !isPageLoaded) {
      return;
    }
    setSaveState("SAVING");
    onSaveStateChange("SAVING");
    const pageData = getPageData();
    const screenshot = await captureCanvasScreenshot(canvasIframe as HTMLIFrameElement | null);

    await onSave({
      autoSave: true,
      blocks: pageData.blocks,
      theme,
      needTranslations: needTranslations(),
      screenshot,
    });
    setTimeout(() => {
      setSaveState("SAVED");
      onSaveStateChange("SAVED");
    }, 100);
    return true;
  };

  const uploadImage = async (file: File) => {
    const url = await onImageUpload(file);
    return url;
  };

  return { savePage, savePageAsync, saveState, setSaveState, needTranslations, uploadImage };
};
