import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListIcon, ListOrderedIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet list",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onclick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered list",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onclick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm cursor-pointer">
          <ListIcon className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, isActive, onclick, icon: Icon }) => (
          <button
            key={label}
            onClick={onclick}
            className={cn(
              "flex items-center gap-x-2 px-2 rounded-sm hover:bg-neutral-200/80",
              isActive() && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
