import { useBuilderProp } from "@/core/hooks/use-builder-prop";
import { useGetPageData } from "@/core/hooks/use-get-page-data";
import { useLanguages } from "@/core/hooks/use-languages";
import { checkMissingTranslations } from "@/core/hooks/use-save-page";
import { useTheme } from "@/core/hooks/use-theme";
import { atom, useAtom } from "jotai";
import { noop } from "lodash-es";
import { getHTMLFromBlocks } from "@/core/export-html/json-to-html";
import { useCanvasDisplayWidth } from "./use-screen-size-width";

export const builderPublishStateAtom = atom<"PUBLISHED" | "PUBLISHING" | "NOT_PUBLISHED">("NOT_PUBLISHED");
builderPublishStateAtom.debugLabel = "builderPublishStateAtom";

export const usePublishPage = () => {
  const [canvasDisplayWidth] = useCanvasDisplayWidth();
  const [publishState, setPublishState] = useAtom(builderPublishStateAtom);
  const onPublish = useBuilderProp("onPublish", async (_args) => {});
  const onPublishStateChange = useBuilderProp("onPublishStateChange", noop);
  const getPageData = useGetPageData();
  const [theme] = useTheme();
  const { selectedLang, fallbackLang } = useLanguages();

  const needTranslations = () => {
    const pageData = getPageData();
    return !selectedLang || selectedLang === fallbackLang
      ? false
      : checkMissingTranslations(pageData.blocks || [], selectedLang);
  };

  const publishPage = async () => {
    setPublishState("PUBLISHING");
    onPublishStateChange("PUBLISHING");
    try {
      const pageData = getPageData();
      const domElements = await getHTMLFromBlocks(pageData.blocks, theme);

      const result = await onPublish({
        autoSave: false,
        blocks: pageData.blocks,
        theme,
        needTranslations: needTranslations(),
        domElements,
        canvasDisplayWidth,
      });
      setTimeout(() => {
        setPublishState("PUBLISHED");
        onPublishStateChange("PUBLISHED");
      }, 100);
      return result;
    } catch (error) {
      setPublishState("NOT_PUBLISHED");
      onPublishStateChange("NOT_PUBLISHED");
      throw error;
    }
  };

  return { publishPage, publishState, setPublishState };
};
