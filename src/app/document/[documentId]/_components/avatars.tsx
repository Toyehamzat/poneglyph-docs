"use client";
import { useState, useEffect, useMemo } from "react";
import { useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { GetUser } from "../action";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  avatar: string;
};

const AVATAR_SIZE = 36;

export const Avatars = () => {
  return (
    <ClientSideSuspense
      fallback={
        <div className="flex items-center ml-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full ml-2" />
        </div>
      }
    >
      <AvatarStack />
    </ClientSideSuspense>
  );
};

const AvatarStack = () => {
    const [users, setUsers] = useState<User[]>([]);
    const currentUser = useSelf();

    // Fetch users with the GetUser function
    const fetchUsers = useMemo(
        () => async () => {
            try {
                const list = await GetUser();
                setUsers(list);
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
    
    if (!users || users.length === 0) {
        return null;
    }
    
    return (
        <>
            <div className="flex items-center">
                {currentUser && (
                    <div className="relative ml-2">
                        <Avatar name="You" src={currentUser.info.avatar} />
                    </div>
                )}
                <div className="flex">
                    {users
                        .filter((user) => user.id !== currentUser?.id)
                        .map((user) => (
                            <Avatar key={user.id} name={user.name} src={user.avatar} />
                        ))}
                </div>
            </div>
            <Separator orientation="vertical" className="h-6" />
        </>
    );
};

interface AvatarProps {
  src: string;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
        {name}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={name} className="size-full rounded-full" />
    </div>
  );
};
