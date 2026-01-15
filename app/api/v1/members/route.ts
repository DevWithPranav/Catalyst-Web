import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";
import { ID } from "node-appwrite";

export async function GET(request: Request) {
  try {
    const member_data = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_MEMBER_COLLECTION_ID!
    );
    return NextResponse.json(member_data.documents);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { status: 400, message: "provide valid data" },
        { status: 400 }
      );
    }

    const { roles, orgs, ...memberDetails } = body;

    const new_member = await database.createDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_MEMBER_COLLECTION_ID!,
      ID.unique(),
      memberDetails
    );

    const new_member_id = new_member.$id;
    const promises = [];

    if (roles && Array.isArray(roles)) {
      roles.forEach((role_id: string) => {
        promises.push(
          database.createDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            "user_link_roles",
            ID.unique(),
            {
              user_id: new_member_id,
              role_id: role_id,
            }
          )
        );
      });
    }

    if (orgs && Array.isArray(orgs)) {
      orgs.forEach((org_id: string) => {
        promises.push(
          database.createDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            "user_link_org",
            ID.unique(),
            {
              user_id: new_member_id,
              org_id: org_id,
            }
          )
        );
      });
    }

    await Promise.all(promises);

    return NextResponse.json({
      ...new_member,
      message: "Member and relationships created successfully",
      linked_roles_count: roles?.length || 0,
      linked_orgs_count: orgs?.length || 0,
    });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
