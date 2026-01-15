import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";


export async function GET(request: Request) {
  try {
    const orgs = await database.listDocuments(process.env.NEXT_APPWRITE_DATABASE_ID!, 'organization', [
      Query.orderDesc("$createdAt"),
    ]);

    return NextResponse.json(orgs.documents);
  } catch (error: any) {
    console.error("GET Orgs Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch organizations", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Organization name is required" },
        { status: 400 }
      );
    }

    const newOrg = await database.createDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      'organization',
      ID.unique(),
      {
        name: name,
      }
    );

    return NextResponse.json(newOrg, { status: 201 });
  } catch (error: any) {
    console.error("POST Org Error:", error);
    return NextResponse.json(
      { error: "Failed to create organization", details: error.message },
      { status: 500 }
    );
  }
}
