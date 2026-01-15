import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ member_id: string; role_id: string }> }
) {
  try {
    const { member_id, role_id } = await params;

    const targetLink = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ROLES_COLLECTION_ID!,
      [Query.equal("user_id", member_id), Query.equal("role_id", role_id)]
    );

    if (targetLink.total === 0) {
      return NextResponse.json(
        { message: "User does not have this role." },
        { status: 404 }
      );
    }

    await database.deleteDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ROLES_COLLECTION_ID!,
      targetLink.documents[0].$id
    );

    return NextResponse.json({
      message: "Role removed successfully",
      role_id: role_id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to remove role", details: error.message },
      { status: 500 }
    );
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

    if (!new_role_id) {
      return NextResponse.json(
        { message: "Please provide 'new_role_id'." },
        { status: 400 }
      );
    }

    const targetLink = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ROLES_COLLECTION_ID!,
      [Query.equal("user_id", member_id), Query.equal("role_id", role_id)]
    );

    if (targetLink.total === 0) {
      return NextResponse.json(
        { message: "User does not have the role you are trying to update." },
        { status: 404 }
      );
    }

    const linkDocId = targetLink.documents[0].$id;

    await database.updateDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ROLES_COLLECTION_ID!,
      linkDocId,
      {
        role_id: new_role_id,
      }
    );

    return NextResponse.json({
      message: "Role updated successfully",
      old_role_id: role_id,
      new_role_id: new_role_id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update role", details: error.message },
      { status: 500 }
    );
  }
}
