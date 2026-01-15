import { NextResponse } from "next/server";
import { database, storage } from "@/lib/appwrite/server";
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
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    
    const rolesRaw = formData.get("roles") as string;
    const orgsRaw = formData.get("orgs") as string;
    
    let roles: string[] = [];
    let orgs: string[] = [];
    
    try {
        if (rolesRaw) roles = JSON.parse(rolesRaw);
        if (orgsRaw) orgs = JSON.parse(orgsRaw);
    } catch (e) {
        console.warn("Failed to parse roles/orgs JSON", e);
    }

    const file = formData.get("photo");
    let photoUrl: string | null = null; 

    if (file && file instanceof File && file.size > 0) {
        console.log("Uploading file:", file.name);

        const uploadedFile = await storage.createFile(
            process.env.NEXT_APPWRITE_BUCKET_ID!,
            ID.unique(),
            file
        );

        const projectId = process.env.NEXT_APPWRITE_PROJECT_ID; 
        const endpoint = process.env.NEXT_APPWRITE_ENDPOINT;
        
        photoUrl = `${endpoint}/storage/buckets/${process.env.NEXT_APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${projectId}`;
    } else {
        const rawString = formData.get("photo") as string;
        if (rawString && rawString.startsWith("http")) {
            photoUrl = rawString;
        }
    }

    const new_member = await database.createDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_MEMBER_COLLECTION_ID!,
      ID.unique(),
      {
          name,
          email,
          phone,
          photo: photoUrl, 
          join_date: new Date().toISOString()
      }
    );

    // ... (Link creation logic stays the same) ...
    const new_member_id = new_member.$id;
    const promises: Promise<any>[] = [];

    if (roles.length > 0) {
      roles.forEach((role_id) => {
        promises.push(
          database.createDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            "user_link_roles",
            ID.unique(),
            { user_id: new_member_id, role_id: role_id }
          )
        );
      });
    }

    if (orgs.length > 0) {
      orgs.forEach((org_id) => {
        promises.push(
          database.createDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            "user_link_org",
            ID.unique(),
            { user_id: new_member_id, org_id: org_id }
          )
        );
      });
    }

    await Promise.all(promises);

    return NextResponse.json({
      ...new_member,
      message: "Member created successfully",
      photo_url: photoUrl,
    });

  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}