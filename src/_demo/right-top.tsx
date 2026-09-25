import { useBuilderProp, usePublishPage, useRightPanel, useSavePage } from "@/core/hooks";
import { Button } from "@/ui/shadcn/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/shadcn/components/ui/tooltip";
import { CheckIcon, EyeOpenIcon, MixerHorizontalIcon, ReloadIcon, UploadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export default function RightTop() {
  const [panel, setRightPanel] = useRightPanel();
  const { savePage, saveState } = useSavePage();
  const { publishPage, publishState } = usePublishPage();
  const onPreview = useBuilderProp("onPreview", () => {});
  const isSaving = saveState === "SAVING";
  const isPublishing = publishState === "PUBLISHING";

  const handlePublish = async () => {
    try {
      await publishPage();
      toast.success("Page published successfully!");
    } catch (error) {
      toast.error("Failed to publish page");
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-2 rounded-lg bg-paper p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={panel === "theme" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setRightPanel(panel !== "theme" ? "theme" : "block")}
              aria-label="Theme"
              title="Theme">
              <MixerHorizontalIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Theme</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPreview()}
              aria-label="Preview"
              title="Preview">
              <EyeOpenIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Preview</TooltipContent>
        </Tooltip>

        <Button
          variant="secondary"
          size="sm"
          className="gap-2"
          onClick={() => savePage(false)}
          disabled={isSaving}>
          {isSaving ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <CheckIcon className="h-4 w-4" />}
          {isSaving ? "Saving..." : saveState === "UNSAVED" ? "Draft" : "Saved"}
        </Button>

        <Button
          variant="default"
          size="sm"
          className="gap-2"
          onClick={handlePublish}
          disabled={isPublishing}>
          {isPublishing ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <UploadIcon className="h-4 w-4" />}
          {isPublishing ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </TooltipProvider>
  );
}
