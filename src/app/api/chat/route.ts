import { smartHomeTools } from '@/types/openaiFunctions';
import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

export async function POST(request: Request): Promise<Response> {
    if (process.env.NODE_ENV === 'production' || typeof window !== 'undefined') {
        return new Response(JSON.stringify({ error: 'Invalid environment for fetching light data' }), { status: 500 });
    }

    const { messages } = await request.json();

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages: convertToCoreMessages(messages),
        tools: smartHomeTools,
        maxSteps: 5
    });

    return result.toDataStreamResponse();
}