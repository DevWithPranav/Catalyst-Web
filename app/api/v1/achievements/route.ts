import { NextResponse } from "next/server";
import { database } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";
import { DB_ID, COLLECTIONS } from "@/lib/constants/collections";
import { handleError, badRequest } from "@/lib/utils/api-response";
import { uploadFile } from "@/lib/utils/storage";
import { parsePagination, paginationQueries } from "@/lib/utils/pagination";
import { validateFields, formatValidationErrors } from "@/lib/utils/validation";

export async function GET(request: Request) {
    try {
        const pagination = parsePagination(request);
        const url = new URL(request.url);

        const queries = [
            ...paginationQueries(pagination),
            Query.orderDesc("$createdAt"),
        ];

        const search = url.searchParams.get("search");
        if (search) {
            queries.push(Query.search("title", search));
        }

        const featured = url.searchParams.get("featured");
        if (featured === "true") {
            queries.push(Query.equal("is_featured", true));
        }

        const from = url.searchParams.get("from");
        if (from) {
            queries.push(Query.greaterThanEqual("date", from));
        }

        const to = url.searchParams.get("to");
        if (to) {
            queries.push(Query.lessThanEqual("date", to));
        }

        const org = url.searchParams.get("org");
        if (org) {
            queries.push(Query.equal("org", org));
        }

        const achievements = await database.listDocuments(DB_ID, COLLECTIONS.ACHIEVEMENTS, queries);

        return NextResponse.json({
            documents: achievements.documents,
            total: achievements.total,
            page: Math.floor(pagination.offset / pagination.limit) + 1,
            limit: pagination.limit,
        });
    } catch (error) {
        return handleError("Fetch achievements", error);
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const subtitle = formData.get("subtitle") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const is_featured = formData.get("is_featured") === "true";
        const org = formData.get("org") as string;

        if (!title || title.trim().length === 0) {
            return badRequest("Achievement title is required");
        }

        const errors = validateFields([
            { field: "title", value: title, required: true, maxLength: 255 },
            { field: "slug", value: slug, type: "slug", maxLength: 255 },
            { field: "subtitle", value: subtitle, maxLength: 255 },
            { field: "description", value: description, maxLength: 2000 },
            { field: "date", value: date, type: "date" },
        ]);
        if (errors.length > 0) {
            return badRequest(formatValidationErrors(errors));
        }

        const payload: Record<string, unknown> = {
            title: title.trim(),
            slug: slug ? slug.trim() : null,
            subtitle: subtitle ? subtitle.trim() : null,
            description: description ? description.trim() : null,
            date: date || null,
            is_featured,
            org: org || null,
        };

        const coverFile = formData.get("cover_image");
        if (coverFile && coverFile instanceof File && coverFile.size > 0) {
            payload.cover_image = await uploadFile(coverFile);
        }

        const relatedFile = formData.get("related_image");
        if (relatedFile && relatedFile instanceof File && relatedFile.size > 0) {
            payload.related_image = await uploadFile(relatedFile);
        }

        const newAchievement = await database.createDocument(
            DB_ID,
            COLLECTIONS.ACHIEVEMENTS,
            ID.unique(),
            payload
        );

        return NextResponse.json(
            { message: "Achievement created successfully", achievement: newAchievement },
            { status: 201 }
        );
    } catch (error) {
        return handleError("Create achievement", error);
    }
}
