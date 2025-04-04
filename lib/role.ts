"use server";
import { clerkClient } from "@clerk/nextjs/server";

interface UpdateMetadataParams {
  userId: string;
  metadata: {
    roi: number
    current_value: number
    account_status: boolean
    account_trader: string
    kyc_status:boolean
    total_investment: number
  };
}

export async function updateUserMetadata({ userId, metadata }: UpdateMetadataParams): Promise<void> {
  const client = await clerkClient();

  // Check that the user trying to update metadata is an admin
//   if (!(await checkRole("admin"))) {
//     throw new Error("Not Authorized");
//   }

  try {
    // Update the user's publicMetadata
    const res = await client.users.updateUser(userId, {
      publicMetadata: metadata,
    });
    console.log({ message: "Metadata updated successfully", metadata: res.publicMetadata });
  } catch (err) {
    throw new Error(`Failed to update metadata: ${err instanceof Error ? err.message : String(err)}`);
  }
}