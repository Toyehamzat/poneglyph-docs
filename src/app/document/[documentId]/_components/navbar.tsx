"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  ChevronRightIcon,
  FileIcon,
  FileJsonIcon,
  FilePen,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormatting,
  StrikethroughIcon,
  Table2Icon,
  TextIcon,
  // TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { MenubarSubTrigger } from "@radix-ui/react-menubar";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/useEditorStore";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./avatars";
import { Inbox } from "./inbox";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";

interface NavbarProps {
  data: Doc<"documents">;
}
export const Navbar = ({ data }: NavbarProps) => {
  const router = useRouter();
  const mutation = useMutation(api.documents.create);

  const onNewDocument = () => {
    mutation({ title: "Untitled Document", initialContent: "" })
      .catch(() => toast.error("Something went wrong"))
      .then((id) => {
        toast.success("Document Created");
        router.push(`/document/${id}`);
      });
  };
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setIsMac(userAgent.indexOf("Mac") !== -1);
  }, []);

  const Shortcut = ({ mac, windows }: { mac: string; windows: string }) => {
    return <MenubarShortcut>{isMac ? mac : windows}</MenubarShortcut>;
  };
  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const onSaveJson = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `${data.title}.json`);
  };
  const onSaveHtml = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/html" });
    onDownload(blob, `${data.title}.html`);
  };
  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], { type: "text/plain" });
    onDownload(blob, `${data.title}.txt`);
  };
  return (
    <nav className="flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <FileIcon className="size-4 mx-2" />
                        Save As
                      </div>
                      <ChevronRightIcon className="ml-auto h-4 w-4" />
                    </MenubarSubTrigger>
                    <MenubarSubContent className="ml-2">
                      <MenubarItem onClick={onSaveJson}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHtml}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        TEXT
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDocument}>
                    <FilePlusIcon className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <FilePen className="size-4 mr-2" />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  {/* <RemoveDialog documentId={data._id}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <TrashIcon className="size-4 mr-2" />
                      Remove
                    </MenubarItem>
                  </RemoveDialog> */}
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    Print <Shortcut mac="⌘P" windows="Ctrl+P" />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    className="cursor-pointer"
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className="size-4 mr-2" />
                    Undo <Shortcut mac="⌘Z" windows="Ctrl+Z" />
                  </MenubarItem>
                  <MenubarItem
                    className="cursor-pointer"
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className="size-4 mr-2" />
                    Redo <Shortcut mac="⌘Y" windows="Ctrl+Y" />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <Table2Icon className="size-4 mr-2" />
                        Table
                      </div>
                      <ChevronRightIcon className="ml-auto h-4 w-4" />
                    </MenubarSubTrigger>
                    <MenubarSubContent className="ml-2">
                      {Array.from({ length: 4 }, (_, i) => i + 1).map(
                        (rows) => (
                          <MenubarItem
                            key={`${rows}x${rows}`}
                            onClick={() => insertTable({ rows, cols: rows })}
                          >
                            {rows} x {rows}
                          </MenubarItem>
                        )
                      )}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <TextIcon className="size-4 mr-2" />
                        Text
                      </div>
                      <ChevronRightIcon className="ml-auto h-4 w-4" />
                    </MenubarSubTrigger>
                    <MenubarSubContent className="ml-2">
                      <MenubarItem
                        className="cursor-pointer"
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="size-4 mr-2" />
                        Bold <Shortcut mac="⌘B" windows="Ctrl+B" />
                      </MenubarItem>
                      <MenubarItem
                        className="cursor-pointer"
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4 mr-2" />
                        Italic <Shortcut mac="⌘I" windows="Ctrl+I" />
                      </MenubarItem>
                      <MenubarItem
                        className="cursor-pointer"
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline <Shortcut mac="⌘U" windows="Ctrl+U" />
                      </MenubarItem>
                      <MenubarItem
                        className="cursor-pointer"
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="size-4 mr-2" />
                        Strikethrough &nbsp;&nbsp;{" "}
                        <Shortcut mac="⌘S" windows="Ctrl+S" />
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormatting className="size-4 mr-2" />
                    Clear Formatting &nbsp;&nbsp;
                    <Shortcut mac="⌘\" windows="Ctrl+\" />
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 pl-6">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />
        <UserButton />
      </div>
    </nav>
  );
};
