"use client";
import { usePaginatedQuery } from "convex/react";
import { Navbar } from "./_components/navbar";
import { TemplateGallery } from "./_components/templates-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./_components/documents-table";
import { useSearchParams } from "@/hooks/useSearchParams";
import "../../app/globals.css";
export default function Home() {
  const [search] = useSearchParams();
  const { results, loadMore, status, isLoading } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 right-0 left-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
