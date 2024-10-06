import { getContainer } from '@/lib/cosmosdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    if (process.env.NODE_ENV === 'production' || typeof window !== 'undefined') {
        return NextResponse.json({ error: 'Invalid environment for fetching light data' }, { status: 500 });
    }

    try {
        const container = getContainer();

        const { resources } = await container.items
            .query("SELECT * FROM c WHERE c.id = 'light'")
            .fetchAll();

        const lightData = resources[0];

        return NextResponse.json(lightData);
    } catch (error) {
        console.error('Error fetching light data:', error);
        return NextResponse.json({ error: 'Failed to fetch light data' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (process.env.NODE_ENV === 'production' || typeof window !== 'undefined') {
        return NextResponse.json({ error: 'Invalid environment for updating light data' }, { status: 500 });
    }

    try {
        const container = getContainer();
        const { isOn } = await request.json();

        const { resource } = await container.items.upsert({ id: 'light', isOn });

        return NextResponse.json(resource);
    } catch (error) {
        console.error('Error updating light data:', error);
        return NextResponse.json({ error: 'Failed to update light data' }, { status: 500 });
    }
}