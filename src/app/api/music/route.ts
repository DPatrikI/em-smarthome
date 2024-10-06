import { getContainer } from '@/lib/cosmosdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    if (!process.env.COSMOS_DB_ENDPOINT || typeof window !== 'undefined') {
        return NextResponse.json({ error: 'Invalid environment for fetching music data' }, { status: 500 });
    }

    try {
        const container = getContainer();

        const { resources } = await container.items
            .query("SELECT * FROM c WHERE c.id = 'music'")
            .fetchAll();

        const musicData = resources[0];

        return NextResponse.json(musicData);
    } catch (error) {
        console.error('Error fetching music data:', error);
        return NextResponse.json({ error: 'Failed to fetch music data' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!process.env.COSMOS_DB_ENDPOINT || typeof window !== 'undefined') {
        return NextResponse.json({ error: 'Invalid environment for updating music data' }, { status: 500 });
    }

    try {
        const { isPlaying, volume } = await request.json();
        const container = getContainer();

        const { resource } = await container.items.upsert({ id: 'music', isPlaying, volume });

        return NextResponse.json(resource);
    } catch (error) {
        console.error('Error updating music data:', error);
        return NextResponse.json({ error: 'Failed to update music data' }, { status: 500 });
    }
}