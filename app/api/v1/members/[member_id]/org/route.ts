import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";
import { DB_ID, COLLECTIONS } from "@/lib/constants/collections";
import { handleError, badRequest, notFound, successResponse } from "@/lib/utils/api-response";
import { isStringArray, isNonEmptyString } from "@/lib/utils/validation";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  try {
    const { member_id } = await params;

    const links = await database.listDocuments(DB_ID, COLLECTIONS.USER_LINK_ORG, [
      Query.equal("user_id", member_id),
    ]);

    const orgIds = links.documents
      .map((doc) => doc.org_id?.$id || doc.org_id)
      .filter(Boolean) as string[];

    if (orgIds.length === 0) {
      return NextResponse.json([]);
    }

    const orgs = await database.listDocuments(DB_ID, COLLECTIONS.ORGANIZATIONS, [
      Query.equal("$id", orgIds),
    ]);

    return NextResponse.json(orgs.documents);
  } catch (error) {
    return handleError("Fetch user organizations", error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  try {
    const { member_id } = await params;
    const { orgs } = await request.json();

    if (!Array.isArray(orgs) || !isStringArray(orgs)) {
      return badRequest("'orgs' must be an array of organization ID strings");
    }

    const currentLinks = await database.listDocuments(DB_ID, COLLECTIONS.USER_LINK_ORG, [
      Query.equal("user_id", member_id),
    ]);

    const linksToDelete = currentLinks.documents.filter(
      (doc) => !orgs.includes(doc.org_id?.$id || doc.org_id)
    );
    const currentOrgIds = currentLinks.documents.map(
      (doc) => doc.org_id?.$id || doc.org_id
    );
    const idsToAdd = orgs.filter((id: string) => !currentOrgIds.includes(id));

    await Promise.all([
      ...linksToDelete.map((doc) =>
        database.deleteDocument(DB_ID, COLLECTIONS.USER_LINK_ORG, doc.$id)
      ),
      ...idsToAdd.map((org_id: string) =>
        database.createDocument(DB_ID, COLLECTIONS.USER_LINK_ORG, ID.unique(), {
          user_id: member_id,
          org_id,
        })
      ),
    ]);

    return successResponse({
      message: "Organizations synced successfully",
      added: idsToAdd.length,
      removed: linksToDelete.length,
      current_total: orgs.length,
    });
  } catch (error) {
    return handleError("Update organizations", error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  try {
    const { member_id } = await params;
    const body = await request.json();
    const { org_id } = body;

    if (!isNonEmptyString(org_id)) {
      return badRequest("'org_id' must be a non-empty string");
    }

    const targetLink = await database.listDocuments(DB_ID, COLLECTIONS.USER_LINK_ORG, [
      Query.equal("user_id", member_id),
      Query.equal("org_id", org_id),
    ]);

    if (targetLink.total === 0) {
      return notFound("User is not linked to this organization");
    }

    await database.deleteDocument(
      DB_ID,
      COLLECTIONS.USER_LINK_ORG,
      targetLink.documents[0].$id
    );

    return successResponse({
      message: "User removed from organization successfully",
      org_id,
    });
  } catch (error) {
    return handleError("Remove organization", error);
  }
}
