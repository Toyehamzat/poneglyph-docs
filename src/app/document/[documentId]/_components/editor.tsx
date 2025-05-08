"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import ImageResize from "tiptap-extension-resize-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import { useEditorStore } from "@/store/useEditorStore";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FontSizeExtensions } from "@/extensions/font-size";
import { lineHeightExtension } from "@/extensions/line-height";
import {Ruler} from "./ruler";
export const Editor = () => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    immediatelyRender:false,
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    extensions: [
      StarterKit,
      lineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
      FontSizeExtensions,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      FontFamily,
      TextStyle,
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Dropcursor,
      ImageResize,
      Paragraph,
      Text,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right:56px;",
        class:
          "focus:outline-none print:border-0 border bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text shadow-xl print:shadow-none rounded-lg print:rounded-none",
      },
    },
    // content: ``,
  });
  return (
    <div className="size-full overflow-auto bg-[#F9FBFD] px-4 print:px-0 print:bg-white print:overflow-visible">
      <Ruler />

      <div className="min-w-max flex justify-center w-[816px] py-6 print:py-0 mx-auto print:w-full print:min-w-0 ">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
