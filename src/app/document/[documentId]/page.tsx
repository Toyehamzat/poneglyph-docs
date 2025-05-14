import { preloadQuery } from "convex/nextjs";
import { Document } from "./_components/document";
import { auth } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
interface DocumentPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

export default async function page({ params }: DocumentPageProps) {
  const { documentId } = await params;
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token }
  );
  return <Document preloadedDocument={preloadedDocument} />;
}
