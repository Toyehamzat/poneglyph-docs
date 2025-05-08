import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { PaginationStatus } from "convex/react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-react";
import { format } from "date-fns";
import { DocumentTableMenu } from "./document-table-menu";
import { useRouter } from "next/navigation";

interface DocumentsTableRowProps {
  document: Doc<"documents">;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTableRow: React.FC<DocumentsTableRowProps> = ({
  document,
  //   loadMore,
  //   status,
}) => {
  const router = useRouter();

  const onNewTabClick = (documentId: string) => {
    router.prefetch(`/document/${documentId}`);
    window.open(`/document/${documentId}`, "_blank");
  };

  const onRowClick = (documentId: string) => {
    router.prefetch(`/document/${documentId}`);
    router.push(`/document/${documentId}`);
  };
  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => onRowClick(document._id)}
    >
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy 'at' h:mm a")}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentTableMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
};
