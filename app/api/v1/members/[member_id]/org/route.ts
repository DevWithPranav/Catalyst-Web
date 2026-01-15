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
      'user_link_org',
      [Query.equal("user_id", member_id)]
    );

    const orgIds = links.documents
      .map((doc: any) => doc.org_id.$id || doc.org_id)
      .filter((id) => id);

    if (orgIds.length === 0) {
      return NextResponse.json([]);
    }

    const orgs = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      'organization',
      [Query.equal("$id", orgIds)]
    );

    return NextResponse.json(orgs.documents);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch user organizations", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  try {
    const { member_id } = await params;
    const { orgs } = await request.json();

    if (!Array.isArray(orgs)) {
      return NextResponse.json(
        { message: "Invalid format. 'orgs' must be an array of IDs." },
        { status: 400 }
      );
    }

    const currentLinks = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      'user_link_org',
      [Query.equal("user_id", member_id)]
    );

    const linksToDelete = currentLinks.documents.filter(
      (doc: any) => !orgs.includes(doc.org_id.$id || doc.org_id)
    );

    const currentOrgIds = currentLinks.documents.map(
      (doc: any) => doc.org_id.$id || doc.org_id
    );
    const idsToAdd = orgs.filter((id) => !currentOrgIds.includes(id));

    await Promise.all([
      ...linksToDelete.map((doc) =>
        database.deleteDocument(
          process.env.NEXT_APPWRITE_DATABASE_ID!,
          'user_link_org',
          doc.$id
        )
      ),

      ...idsToAdd.map((org_id) =>
        database.createDocument(
          process.env.NEXT_APPWRITE_DATABASE_ID!,
          'user_link_org',
          ID.unique(),
          {
            user_id: member_id,
            org_id: org_id,
          }
        )
      ),
    ]);

    return NextResponse.json({
      message: "Organizations synced successfully",
      added: idsToAdd.length,
      removed: linksToDelete.length,
      current_total: orgs.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update organizations", details: error.message },
      { status: 500 }
    );
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

    if (!org_id) {
      return NextResponse.json(
        { message: "Please provide 'org_id' to remove." },
        { status: 400 }
      );
    }

    const targetLink = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      'user_link_org',
      [Query.equal("user_id", member_id), Query.equal("org_id", org_id)]
    );

    if (targetLink.total === 0) {
      return NextResponse.json(
        { message: "User is not linked to this organization." },
        { status: 404 }
      );
    }

    await database.deleteDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      'user_link_org',
      targetLink.documents[0].$id
    );

    return NextResponse.json({
      message: "User removed from organization successfully",
      org_id: org_id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to remove organization", details: error.message },
      { status: 500 }
    );
  }
}
