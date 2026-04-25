import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";
import { DB_ID, COLLECTIONS } from "@/lib/constants/collections";
import { handleError, badRequest, notFound, successResponse } from "@/lib/utils/api-response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ org_id: string }> }
) {
  try {
    const { org_id } = await params;

    const org = await database.getDocument(DB_ID, COLLECTIONS.ORGANIZATIONS, org_id);

    return NextResponse.json(org);
  } catch (error) {
    return notFound("Organization not found");
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ org_id: string }> }
) {
  try {
    const { org_id } = await params;
    const body = await request.json();

    const allowedFields = ["name"];
    const updateData: Record<string, string> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return badRequest("No valid update data provided. Allowed fields: name");
    }

    if (updateData.name !== undefined) {
      if (typeof updateData.name !== "string" || updateData.name.trim().length === 0) {
        return badRequest("Organization name must be a non-empty string");
      }
      if (updateData.name.length > 255) {
        return badRequest("Organization name must be at most 255 characters");
      }
      updateData.name = updateData.name.trim();
    }

    const updatedOrg = await database.updateDocument(
      DB_ID,
      COLLECTIONS.ORGANIZATIONS,
      org_id,
      updateData
    );

    return NextResponse.json(updatedOrg);
  } catch (error) {
    return handleError("Update organization", error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ org_id: string }> }
) {
  try {
    const { org_id } = await params;

    await database.deleteDocument(DB_ID, COLLECTIONS.ORGANIZATIONS, org_id);

    return successResponse({
      message: "Organization deleted successfully",
      id: org_id,
    });
  } catch (error) {
    return handleError("Delete organization", error);
  }
}
