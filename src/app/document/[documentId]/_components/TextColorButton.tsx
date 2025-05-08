import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColorResult, SketchPicker } from "react-color";

export const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    if (editor?.can().chain().focus().setColor) {
      editor.chain().focus().setColor(color.hex).run();
    } else {
      console.error(
        "setColor method not available - make sure you have the Color extension configured"
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm cursor-pointer">
          <span className="text-sm">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 border-0 shadow-md">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};