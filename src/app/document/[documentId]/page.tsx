import React from "react";
import { Editor } from "./_components/editor";
import ToolBar from "./_components/toolBar";
import { Navbar } from "./_components/navbar";
import { Room } from "./_components/Room";


interface DocumentPageProps {
  params: Promise<{ documentId: string }>;
}
export async function generateMetadata({ params }: DocumentPageProps) {
  const { documentId } = await params;
  return {
    title: `Document: ${documentId}`,
  };
}
export default async function page() {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 bg-[#FAFBFD] z-10  print:hidden">
        <Navbar />
        <ToolBar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Room>
          <Editor />
        </Room>
      </div>
    </div>
  );
}
