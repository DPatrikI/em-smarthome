/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        COSMOS_DB_ENDPOINT: process.env.COSMOS_DB_ENDPOINT,
        COSMOS_DB_KEY: process.env.COSMOS_DB_KEY,
        COSMOS_DB_DATABASE: process.env.COSMOS_DB_DATABASE,
        COSMOS_DB_CONTAINER: process.env.COSMOS_DB_CONTAINER,
    },
};

export default nextConfig;