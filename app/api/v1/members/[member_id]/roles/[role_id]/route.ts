import { database } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { DB_ID, COLLECTIONS } from "@/lib/constants/collections";
import { handleError, badRequest, notFound, successResponse } from "@/lib/utils/api-response";
import { isNonEmptyString } from "@/lib/utils/validation";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ member_id: string; role_id: string }> }
) {
  try {
    const { member_id, role_id } = await params;

    const targetLink = await database.listDocuments(DB_ID, COLLECTIONS.USER_LINK_ROLES, [
      Query.equal("user_id", member_id),
      Query.equal("role_id", role_id),
    ]);

    if (targetLink.total === 0) {
      return notFound("User does not have this role");
    }

    await database.deleteDocument(
      DB_ID,
      COLLECTIONS.USER_LINK_ROLES,
      targetLink.documents[0].$id
    );

    return successResponse({ message: "Role removed successfully", role_id });
  } catch (error) {
    return handleError("Remove role", error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ member_id: string; role_id: string }> }
) {
  try {
    const { member_id, role_id } = await params;
    const body = await request.json();
    const { new_role_id } = body;

    if (!isNonEmptyString(new_role_id)) {
      return badRequest("'new_role_id' must be a non-empty string");
    }

    const targetLink = await database.listDocuments(DB_ID, COLLECTIONS.USER_LINK_ROLES, [
      Query.equal("user_id", member_id),
      Query.equal("role_id", role_id),
    ]);

    if (targetLink.total === 0) {
      return notFound("User does not have the role you are trying to update");
    }

    await database.updateDocument(
      DB_ID,
      COLLECTIONS.USER_LINK_ROLES,
      targetLink.documents[0].$id,
      { role_id: new_role_id }
    );

    return successResponse({
      message: "Role updated successfully",
      old_role_id: role_id,
      new_role_id,
    });
  } catch (error) {
    return handleError("Update role", error);
  }
}
