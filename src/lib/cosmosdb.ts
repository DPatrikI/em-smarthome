import { Container, CosmosClient } from '@azure/cosmos';

let container: Container;

export function getContainer() {
    if (!container) {
        const endpoint = process.env.COSMOS_DB_ENDPOINT;
        const key = process.env.COSMOS_DB_KEY;
        const databaseId = process.env.COSMOS_DB_DATABASE;
        const containerId = process.env.COSMOS_DB_CONTAINER;

        if (!endpoint || !key || !databaseId || !containerId) {
            throw new Error('Missing required environment variables for Cosmos DB');
        }

        const client = new CosmosClient({ endpoint, key });
        const database = client.database(databaseId);
        container = database.container(containerId);
    }
    return container;
}