"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GetUser() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  if (!sessionClaims) {
    throw new Error("No session claims found");
  }

  const organizationId = (sessionClaims.o as { id: string })?.id;

  if (!organizationId) {
    return { isPersonal: true };
  }

  const response = await clerk.users?.getUserList({
    organizationId: [organizationId],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  }));

 return { users, isPersonal: false };
}
