import { NextResponse } from "next/server";
import { database, storage } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";

const getFileUrl = (fileId: string) => {
  const projectId = process.env.NEXT_APPWRITE_PROJECT_ID;
  const endpoint = process.env.NEXT_APPWRITE_ENDPOINT;
  return `${endpoint}/storage/buckets/${process.env.NEXT_APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${projectId}&mode=admin`;
};

export async function GET(request: Request) {
  try {
    const events = await database.listDocuments(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    return NextResponse.json(events.documents);
  } catch (error: any) {
    console.error("GET Events Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const payload: any = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      subtitle: formData.get("subtitle"),
      description: formData.get("description"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      status: formData.get("status"),
      register_link: formData.get("register_link"),
      is_featured: formData.get("is_featured") === "true",
    };

    const orgsRaw = formData.get("orgs") as string;
    const orgs = orgsRaw ? JSON.parse(orgsRaw) : [];

    const coverFile = formData.get("cover_image");
    const logFile = formData.get("log");
    const relatedFiles = formData.getAll("related_images");

    if (coverFile && coverFile instanceof File && coverFile.size > 0) {
      const uploaded = await storage.createFile(
        process.env.NEXT_APPWRITE_BUCKET_ID!,
        ID.unique(),
        coverFile
      );
      payload.cover_image = getFileUrl(uploaded.$id);
    }

    if (logFile && logFile instanceof File && logFile.size > 0) {
      const uploaded = await storage.createFile(
        process.env.NEXT_APPWRITE_BUCKET_ID!,
        ID.unique(),
        logFile
      );
      payload.log = getFileUrl(uploaded.$id);
    }

    if (relatedFiles.length > 0) {
      const relatedUrls = await Promise.all(
        relatedFiles.map(async (file) => {
          if (file instanceof File && file.size > 0) {
            const uploaded = await storage.createFile(
              process.env.NEXT_APPWRITE_BUCKET_ID!,
              ID.unique(),
              file
            );
            return getFileUrl(uploaded.$id);
          }
          return null;
        })
      );

      payload.related_images = relatedUrls.filter((url) => url !== null);
    }

    const newEvent = await database.createDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID!,
      ID.unique(),
      payload
    );

    if (orgs.length > 0) {
      await Promise.all(
        orgs.map((org_id: string) =>
          database.createDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_EVENT_LINK_ORG_COLLECTION_ID!,
            ID.unique(),
            {
              event_id: newEvent.$id,
              org_id: org_id,
            }
          )
        )
      );
    }

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: newEvent,
        linked_orgs_count: orgs.length,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Event Error:", error);
    return NextResponse.json(
      { error: "Failed to create event", details: error.message },
      { status: 500 }
    );
  }
}
