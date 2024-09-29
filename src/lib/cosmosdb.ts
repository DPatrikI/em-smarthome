import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_DB_ENDPOINT!;
const key = process.env.COSMOS_DB_KEY!;
const databaseId = process.env.COSMOS_DB_DATABASE!;
const containerId = process.env.COSMOS_DB_CONTAINER!;

const client = new CosmosClient({ endpoint, key });

export const database = client.database(databaseId);
export const container = database.container(containerId);