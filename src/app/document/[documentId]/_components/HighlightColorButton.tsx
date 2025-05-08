import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColorResult, SketchPicker } from "react-color";
import { HighlighterIcon } from "lucide-react";

export const HighlightColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "#000000";
  const onChange = (color: ColorResult) => {
    if (editor?.can().chain().focus().setColor) {
      editor.chain().focus().setHighlight({ color: color.hex }).run();
    } else {
      console.error(
        "setHighlight method not available - make sure you have the Color extension configured"
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm cursor-pointer">
          <HighlighterIcon className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-0 shadow-md">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
