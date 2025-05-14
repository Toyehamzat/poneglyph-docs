"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoader } from "@/components/fullScreenLoader";
import { GetDocument, GetUser } from "../../../../actions/action";
import { toast } from "sonner";
import { Id } from "../../../../../convex/_generated/dataModel";

type User = {
  id: string;
  name: string;
  avatar: string;
};
export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await GetUser();
        if (list.isPersonal) {
          toast.info("This appears to be a personal document");
          return;
        } else {
          toast.info("This appears to be an organization document");
        }

        setUsers(list.users || []);
      } catch (error) {
        toast.error("Error fetching users");
        console.error("Error fetching users:", error);
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });
        return await response.json();
      }}
      throttle={16}
      resolveUsers={({ userIds }) => {
        return (
          userIds.map((userId) => users.find((user) => user.id === userId)) ??
          undefined
        );
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await GetDocument(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Room loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
