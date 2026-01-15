import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ role_id: string }> }
) {
  try {
    const { role_id } = await params;

    const role = await database.getDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      "role",
      role_id
    );

    return NextResponse.json(role);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Role not found", details: error.message },
      { status: 404 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ role_id: string }> }
) {
  try {
    const { role_id } = await params;
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { message: "No update data provided" },
        { status: 400 }
      );
    }

    const updatedRole = await database.updateDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      "role",
      role_id,
      body
    );

    return NextResponse.json(updatedRole);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update role", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ role_id: string }> }
) {
  try {
    const { role_id } = await params;

    await database.deleteDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      "role",
      role_id
    );

    return NextResponse.json({
      message: "Role deleted successfully",
      id: role_id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete role", details: error.message },
      { status: 500 }
    );
  }
}
