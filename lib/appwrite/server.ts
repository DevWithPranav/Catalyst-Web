//use this client only on server components or rest api files 

import {Client,Databases,Users} from 'node-appwrite'

const client = new Client()
.setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT as string)
.setProject(process.env.NEXT_APPWRITE_PROJECT_ID as string)
.setKey(process.env.NEXT_APPWRITE_API_KEY as string)

export const database = new Databases(client)
export const users = new Users(client)