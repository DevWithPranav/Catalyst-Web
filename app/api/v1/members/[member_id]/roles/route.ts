import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";
import { DB_ID, COLLECTIONS } from "@/lib/constants/collections";
import { handleError, badRequest, successResponse } from "@/lib/utils/api-response";
import { isStringArray } from "@/lib/utils/validation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  try {
    const { member_id } = await params;

    const links = await database.listDocuments(DB_ID, COLLECTIONS.USER_LINK_ROLES, [
      Query.equal("user_id", member_id),
    ]);

    const roleIds = links.documents
      .map((doc) => doc.role_id?.$id || doc.role_id)
      .filter(Boolean) as string[];

    if (roleIds.length === 0) {
      return NextResponse.json([]);
    }

    const roles = await database.listDocuments(DB_ID, COLLECTIONS.ROLES, [
      Query.equal("$id", roleIds),
    ]);

    return NextResponse.json(roles.documents);
  } catch (error) {
    return handleError("Fetch user roles", error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  try {
    const { member_id } = await params;
    const body = await request.json();
    const { roles } = body;

    if (!roles || !Array.isArray(roles) || !isStringArray(roles)) {
      return badRequest("'roles' must be an array of role ID strings");
    }

    if (roles.length === 0) {
      return badRequest("'roles' array cannot be empty");
    }

    const currentLinks = await database.listDocuments(DB_ID, COLLECTIONS.USER_LINK_ROLES, [
      Query.equal("user_id", member_id),
    ]);

    const currentRoleIds = currentLinks.documents.map(
      (doc) => doc.role_id?.$id || doc.role_id
    );
    const rolesToAdd = roles.filter((id: string) => !currentRoleIds.includes(id));

    if (rolesToAdd.length === 0) {
      return successResponse({ message: "User already has these roles" });
    }

    await Promise.all(
      rolesToAdd.map((role_id: string) =>
        database.createDocument(DB_ID, COLLECTIONS.USER_LINK_ROLES, ID.unique(), {
          user_id: member_id,
          role_id,
        })
      )
    );

    return successResponse(
      {
        message: "Roles assigned successfully",
        added_count: rolesToAdd.length,
        roles_added: rolesToAdd,
      },
      201
    );
  } catch (error) {
    return handleError("Assign roles", error);
  }
}
