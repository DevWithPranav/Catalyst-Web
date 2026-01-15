import { NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { database, storage } from "@/lib/appwrite/server";
import { ID } from "node-appwrite";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  try {
    const { member_id } = await params;

    const [
      member_data,
      member_roles_links,
      member_social_links,
      member_org_links,
    ] = await Promise.all([
      database.getDocument(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_MEMBER_COLLECTION_ID!,
        member_id
      ),

      database.listDocuments(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ROLES_COLLECTION_ID!,
        [Query.equal("user_id", member_id)]
      ),

      database.listDocuments(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_SOCIAL_COLLECTION_ID!,
        [Query.equal("user_id", member_id)]
      ),

      database.listDocuments(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ORG_COLLECTION_ID!,
        [Query.equal("user_id", member_id)]
      ),
    ]);

    const roleIds = member_roles_links.documents
      .map((link: any) => link.role_id.$id || link.role_id)
      .filter((id) => id);

    let finalRoleNames: string[] = [];

    if (roleIds.length > 0) {
      const rolesData = await database.listDocuments(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_ROLE_COLLECTION_ID!,
        [Query.equal("$id", roleIds)]
      );
      finalRoleNames = rolesData.documents.map((r: any) => r.name);
    }

    const socialData = member_social_links.documents[0];
    const formattedSocials = socialData
      ? {
          instagram: socialData.instagram,
          github: socialData.github,
        }
      : null;

    const orgIds = member_org_links.documents
      .map((link: any) => link.org_id.$id || link.org_id)
      .filter((id) => id);

    let finalOrgs: any[] = [];

    if (orgIds.length > 0) {
      const orgsData = await database.listDocuments(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_ORGANIZATION_COLLECTION_ID!,
        [Query.equal("$id", orgIds)]
      );

      finalOrgs = orgsData.documents.map((o: any) => ({
        name: o.name,
        website: o.website,
        logo: o.logo,
      }));
    }

    const response = {
      ...member_data,
      roles: finalRoleNames,
      socials: formattedSocials,
      organizations: finalOrgs,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
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

    await database.deleteDocument(
      process.env.NEXT_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_MEMBER_COLLECTION_ID!,
      member_id
    );

    return NextResponse.json({
      message: "Member deleted successfully",
      id: member_id,
    });
  } catch (error: any) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete member", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ member_id: string }> }
) {
  try {
    const { member_id } = await params;
    const formData = await request.formData();

    const rolesRaw = formData.get("roles") as string;
    const orgsRaw = formData.get("orgs") as string;
    const socialsRaw = formData.get("socials") as string;
    const photoFile = formData.get("photo");

    const roles = rolesRaw ? JSON.parse(rolesRaw) : null;
    const orgs = orgsRaw ? JSON.parse(orgsRaw) : null;
    const socials = socialsRaw ? JSON.parse(socialsRaw) : null;

    const memberDetails: any = {};
    const specialKeys = ["roles", "orgs", "socials", "photo"];

    formData.forEach((value, key) => {
      if (!specialKeys.includes(key) && typeof value === "string") {
        memberDetails[key] = value;
      }
    });

    if (photoFile) {
      if (photoFile instanceof File && photoFile.size > 0) {
        console.log("Processing new photo upload...");

        try {
          const currentMember = await database.getDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_MEMBER_COLLECTION_ID!,
            member_id
          );

          if (currentMember.photo) {
            const fileIdMatch =
              currentMember.photo.match(/files\/([^/]+)\/view/);

            if (fileIdMatch && fileIdMatch[1]) {
              const oldFileId = fileIdMatch[1];
              console.log("Deleting old photo:", oldFileId);

              try {
                await storage.deleteFile(
                  process.env.NEXT_APPWRITE_BUCKET_ID!,
                  oldFileId
                );
              } catch (deleteErr) {
                console.warn(
                  "Could not delete old file (might not exist):",
                  deleteErr
                );
              }
            }
          }
        } catch (err) {
          console.error("Error checking old photo:", err);
        }

        console.log("Uploading new file:", photoFile.name);
        const uploadedFile = await storage.createFile(
          process.env.NEXT_APPWRITE_BUCKET_ID!,
          ID.unique(),
          photoFile
        );

        const projectId = process.env.NEXT_APPWRITE_PROJECT_ID;
        const endpoint = process.env.NEXT_APPWRITE_ENDPOINT;

        memberDetails.photo = `${endpoint}/storage/buckets/${process.env.NEXT_APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${projectId}&mode=admin`;
      } else if (typeof photoFile === "string") {
        if (photoFile.startsWith("http")) {
          memberDetails.photo = photoFile;
        } else if (photoFile === "null" || photoFile === "") {
          memberDetails.photo = null;
        }
      }
    }

    if (Object.keys(memberDetails).length > 0) {
      await database.updateDocument(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_MEMBER_COLLECTION_ID!,
        member_id,
        memberDetails
      );
    }

    if (roles && Array.isArray(roles)) {
      const currentRoleLinks = await database.listDocuments(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ROLES_COLLECTION_ID!,
        [Query.equal("user_id", member_id)]
      );
      const linksToDelete = currentRoleLinks.documents.filter(
        (doc: any) => !roles.includes(doc.role_id.$id || doc.role_id)
      );
      const currentRoleIds = currentRoleLinks.documents.map(
        (doc: any) => doc.role_id.$id || doc.role_id
      );
      const rolesToAdd = roles.filter(
        (id: string) => !currentRoleIds.includes(id)
      );
      await Promise.all([
        ...linksToDelete.map((doc) =>
          database.deleteDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ROLES_COLLECTION_ID!,
            doc.$id
          )
        ),
        ...rolesToAdd.map((role_id) =>
          database.createDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ROLES_COLLECTION_ID!,
            ID.unique(),
            { user_id: member_id, role_id: role_id }
          )
        ),
      ]);
    }

    if (orgs && Array.isArray(orgs)) {
      const currentOrgLinks = await database.listDocuments(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ORG_COLLECTION_ID!,
        [Query.equal("user_id", member_id)]
      );
      const linksToDelete = currentOrgLinks.documents.filter(
        (doc: any) => !orgs.includes(doc.org_id.$id || doc.org_id)
      );
      const currentOrgIds = currentOrgLinks.documents.map(
        (doc: any) => doc.org_id.$id || doc.org_id
      );
      const orgsToAdd = orgs.filter(
        (id: string) => !currentOrgIds.includes(id)
      );
      await Promise.all([
        ...linksToDelete.map((doc) =>
          database.deleteDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ORG_COLLECTION_ID!,
            doc.$id
          )
        ),
        ...orgsToAdd.map((org_id) =>
          database.createDocument(
            process.env.NEXT_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_ORG_COLLECTION_ID!,
            ID.unique(),
            { user_id: member_id, org_id: org_id }
          )
        ),
      ]);
    }

    if (socials) {
      const existingSocials = await database.listDocuments(
        process.env.NEXT_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_SOCIAL_COLLECTION_ID!,
        [Query.equal("user_id", member_id)]
      );
      if (existingSocials.total > 0) {
        await database.updateDocument(
          process.env.NEXT_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_SOCIAL_COLLECTION_ID!,
          existingSocials.documents[0].$id,
          socials
        );
      } else {
        await database.createDocument(
          process.env.NEXT_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_USER_LINK_SOCIAL_COLLECTION_ID!,
          ID.unique(),
          { user_id: member_id, ...socials }
        );
      }
    }

    return NextResponse.json({
      message: "Member updated successfully",
      updated_fields: [
        ...Object.keys(memberDetails),
        ...specialKeys.filter((k) => formData.has(k)),
      ],
    });
  } catch (error: any) {
    console.error("PATCH Error:", error);
    return NextResponse.json(
      { error: "Failed to update member", details: error.message },
      { status: 500 }
    );
  }
}
