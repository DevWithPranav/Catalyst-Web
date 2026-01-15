import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";

export async function GET(request: Request) {
  try {
    const roles = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_ROLE_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    return NextResponse.json(roles.documents);
  } catch (error: any) {
    console.error("GET Roles Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch roles", details: error.message },
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
        { message: "Role name is required" },
        { status: 400 }
      );
    }

    const newRole = await database.createDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_ROLE_COLLECTION_ID!,
      ID.unique(),
      {
        name: name,
      }
    );

    return NextResponse.json(newRole, { status: 201 });
  } catch (error: any) {
    console.error("POST Roles Error:", error);
    return NextResponse.json(
      { error: "Failed to create role", details: error.message },
      { status: 500 }
    );
  }
}
