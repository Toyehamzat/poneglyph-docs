import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";

export const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialOpen, setIsDialOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
  
    const onChange = (src: string) => {
      editor?.chain().focus().setImage({ src }).run();
      setImageUrl("");
    };
  
    const onUpload = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
  
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
  
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          onChange(imageUrl);
        }
      };
  
      input.click();
    };
  
    const handleImageUrlSubmit = () => {
      if (imageUrl) {
        onChange(imageUrl);
        setImageUrl("");
        setIsDialOpen(false);
      }
    };
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm cursor-pointer">
              <ImageIcon className="size-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuItem onClick={onUpload}>
              <UploadIcon className="size-4 mr-2" />
              Upload
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDialOpen(true)}>
              <SearchIcon className="size-4 mr-2" />
              Paste image Url
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  
        <Dialog open={isDialOpen} onOpenChange={setIsDialOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Image Url</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Insert image Url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleImageUrlSubmit();
                }
              }}
            />
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsDialOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={handleImageUrlSubmit}>Insert</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };