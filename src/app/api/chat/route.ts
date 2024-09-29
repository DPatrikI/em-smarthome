import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

export async function POST(request: Request) {
    const { messages } = await request.json();

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages: convertToCoreMessages(messages)
    });

    return result.toDataStreamResponse();
}