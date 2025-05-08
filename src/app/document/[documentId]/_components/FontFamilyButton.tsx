import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Impact", value: "Impact" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Lucida Console", value: "Lucida Console" },
    { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
    { label: "Arial Black", value: "Arial Black" },
    { label: "Arial Narrow", value: "Arial Narrow" },
    { label: "Arial Rounded MT Bold", value: "Arial Rounded MT Bold" },
    { label: "Palatino Linotype", value: "Palatino Linotype" },
    { label: "Book Antiqua", value: "Book Antiqua" },
    { label: "Garamond", value: "Garamond" },
    { label: "Candara", value: "Candara" },
    { label: "Century Gothic", value: "Century Gothic" },
    { label: "Franklin Gothic Medium", value: "Franklin Gothic Medium" },
    { label: "Gill Sans", value: "Gill Sans" },
    { label: "Segoe UI", value: "Segoe UI" },
    { label: "Calibri", value: "Calibri" },
    { label: "Cambria", value: "Cambria" },
    { label: "Perpetua", value: "Perpetua" },
    { label: "Rockwell", value: "Rockwell" },
    { label: "Futura", value: "Futura" },
    { label: "Monaco", value: "Monaco" },
    { label: "Consolas", value: "Consolas" },
    { label: "Optima", value: "Optima" },
    { label: "Didot", value: "Didot" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm cursor-pointer">
          <span className="truncate">
            {editor?.getAttributes("TextStyle")?.fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 max-h-[300px] overflow-y-auto">
        {fonts.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center gap-x-2",
              editor?.getAttributes("textStyle")?.fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{
              fontFamily: value,
            }}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};