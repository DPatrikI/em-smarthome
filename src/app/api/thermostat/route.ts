import { getContainer } from '@/lib/cosmosdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    if (!process.env.COSMOS_DB_ENDPOINT || typeof window !== 'undefined') {
        return NextResponse.json({ error: 'Invalid environment for fetching thermostat data' }, { status: 500 });
    }

    try {
        const container = getContainer();

        const { resources } = await container.items
            .query("SELECT * FROM c WHERE c.id = 'thermostat'")
            .fetchAll();

        const thermostatData = resources[0];

        return NextResponse.json(thermostatData);
    } catch (error) {
        console.error('Error fetching thermostat data:', error);
        return NextResponse.json({ error: 'Failed to fetch thermostat data' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!process.env.COSMOS_DB_ENDPOINT || typeof window !== 'undefined') {
        return NextResponse.json({ error: 'Invalid environment for updating thermostat data' }, { status: 500 });
    }

    try {
        const container = getContainer();
        
        const { temperature } = await request.json();

        const { resource } = await container.items.upsert({ id: 'thermostat', temperature });

        return NextResponse.json(resource);
    } catch (error) {
        console.error('Error updating thermostat data:', error);
        return NextResponse.json({ error: 'Failed to update thermostat data' }, { status: 500 });
    }
}