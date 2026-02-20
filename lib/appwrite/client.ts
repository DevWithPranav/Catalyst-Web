// Browser-side Appwrite client (client components only)
import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export default client;
