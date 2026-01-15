import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  try {
    const { member_id } = await params;

    const links = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      "user_link_roles",
      [Query.equal("user_id", member_id)]
    );

    const roleIds = links.documents
      .map((doc: any) => doc.role_id.$id || doc.role_id)
      .filter((id) => id);

    if (roleIds.length === 0) {
      return NextResponse.json([]);
    }

    const roles = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      "role",
      [Query.equal("$id", roleIds)]
    );

    return NextResponse.json(roles.documents);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch user roles", details: error.message },
      { status: 500 }
    );
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

    if (!roles || !Array.isArray(roles)) {
      return NextResponse.json(
        { message: "Please provide 'roles' as an array of IDs." },
        { status: 400 }
      );
    }

    const currentLinks = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      "user_link_roles",
      [Query.equal("user_id", member_id)]
    );

    const currentRoleIds = currentLinks.documents.map(
      (doc: any) => doc.role_id.$id || doc.role_id
    );

    const rolesToAdd = roles.filter((id) => !currentRoleIds.includes(id));

    if (rolesToAdd.length === 0) {
      return NextResponse.json({ message: "User already has these roles." });
    }

    await Promise.all(
      rolesToAdd.map((role_id) =>
        database.createDocument(
          process.env.NEXT_APPWRITE_DATABASE_ID!,
          "user_link_roles",
          ID.unique(),
          {
            user_id: member_id,
            role_id: role_id,
          }
        )
      )
    );

    return NextResponse.json({
      message: "Roles assigned successfully",
      added_count: rolesToAdd.length,
      roles_added: rolesToAdd,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to assign roles", details: error.message },
      { status: 500 }
    );
  }
}
