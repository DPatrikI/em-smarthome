'use client';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { useChat } from 'ai/react';

export default function ChatInterface() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    return (
        <div className="mt-6">
            <div className="border rounded p-4 h-64 overflow-y-auto">
                {messages.map((message, index) => (
                    message.content.trim() && (
                        <div key={index} className="mb-2">
                            <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong> {message.content}
                        </div>
                    )
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex mt-4">
                <Input
                    className="flex-grow mr-2"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Chat!"
                />
                <Button onClick={handleSubmit}>Send</Button>
            </form>
        </div>
    );
}