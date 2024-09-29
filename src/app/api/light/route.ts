import { container } from '@/lib/cosmosdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
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
    try {
        const { isOn } = await request.json();

        const { resource } = await container.items.upsert({ id: 'light', on: isOn });

        return NextResponse.json(resource);
    } catch (error) {
        console.error('Error updating light data:', error);
        return NextResponse.json({ error: 'Failed to update light data' }, { status: 500 });
    }
}