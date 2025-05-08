"use client";
import { useEditorStore } from "@/store/useEditorStore";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);

  const [inputValue, setInputValue] = useState(fontSize);

  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(size);
      setInputValue(size);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
    if (e.key === "Escape") {
      setInputValue(fontSize);
      setIsEditing(false);
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };
  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button className="h-7 w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80">
        <MinusIcon className="size-4" onClick={decrement} />
      </button>
      {isEditing ? (
        <input
          className="h-7 w-10 text-sm rounded-sm bg-transparent focus:outline-none focus:ring-0 border border-neutral-400 text-center"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
        />
      ) : (
        <button
          className="h-7 w-10 text-sm rounded-sm bg-transparent cursor-text border border-neutral-400 text-center hover:bg-neutral-200/80"
          onClick={() => {
            setIsEditing(true);
            // updateFontSize(currentFontSize);
          }}
        >
          {currentFontSize}
        </button>
      )}
      <button className="h-7 w-7 shrink-0 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80">
        <PlusIcon className="size-4" onClick={increment} />
      </button>
    </div>
  );
};
