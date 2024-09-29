import { container } from '@/lib/cosmosdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
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
    try {
        const { isPlaying, volume } = await request.json();

        const { resource } = await container.items.upsert({ id: 'music', isPlaying, volume });

        return NextResponse.json(resource);
    } catch (error) {
        console.error('Error updating thermostat data:', error);
        return NextResponse.json({ error: 'Failed to update thermostat data' }, { status: 500 });
    }
}