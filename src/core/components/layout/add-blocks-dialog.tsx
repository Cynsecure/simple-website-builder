import AddBlocksPanel from "@/core/components/sidepanels/panels/add-blocks/add-blocks";
import { CHAI_BUILDER_EVENTS } from "@/core/events";
import { usePubSub } from "@/core/hooks/use-pub-sub";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const AddBlocksDialog = () => {
  const { t } = useTranslation();
  const [parentId, setParentId] = useState<string>("");
  const [position, setPosition] = useState<number>(-1);
  const [open, setOpen] = useState(false);

  usePubSub(CHAI_BUILDER_EVENTS.OPEN_ADD_BLOCK, (data: { _id: string; position?: number } | undefined) => {
    setParentId(data ? data._id : null);
    setPosition(isNaN(data?.position) ? -1 : data?.position);
    setOpen(true);
  });

  usePubSub(CHAI_BUILDER_EVENTS.CLOSE_ADD_BLOCK, () => {
    setParentId("");
    setPosition(-1);
    setOpen(false);
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80" onClick={() => setOpen(false)} />
      {/* Dialog */}
      <div className="relative z-50 w-full max-w-5xl rounded-lg bg-popover p-6 shadow-lg">
        {/* Header */}
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{t("Add blocks")}</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
            <Cross2Icon className="h-6 w-6" />
          </button>
        </div>
        {/* Content */}
        <div className="no-scrollbar mt-4 h-[500px] max-h-full overflow-hidden">
          <AddBlocksPanel parentId={parentId} position={position} showHeading={false} />
        </div>
      </div>
    </div>
  );
};
