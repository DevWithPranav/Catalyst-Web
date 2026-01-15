import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";



export async function GET(
  request: Request,
  { params }: { params: Promise<{ org_id: string }> }
) {
  try {
    const { org_id } = await params;

    const org = await database.getDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      'organization',
      org_id
    );

    return NextResponse.json(org);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Organization not found", details: error.message },
      { status: 404 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ org_id: string }> }
) {
  try {
    const { org_id } = await params;
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { message: "No update data provided" },
        { status: 400 }
      );
    }

    const updatedOrg = await database.updateDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      'organization',
      org_id,
      body
    );

    return NextResponse.json(updatedOrg);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update organization", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ org_id: string }> }
) {
  try {
    const { org_id } = await params;

    await database.deleteDocument(process.env.NEXT_APPWRITE_DATABASE_ID!, 'organization', org_id);

    return NextResponse.json({
      message: "Organization deleted successfully",
      id: org_id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete organization", details: error.message },
      { status: 500 }
    );
  }
}
