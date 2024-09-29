'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function ChatInterface() {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);

    const handleSend = async () => {
        if (!userInput.trim()) return;
    
        const newMessage = { role: 'user', content: userInput };
        const updatedConversation = [...messages, newMessage];
    
        setMessages(updatedConversation);
        setUserInput('');
      };

    return (
        <div className="mt-6">
            <div className="border rounded p-4 h-64 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className="mb-2">
                        <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <div className="flex mt-4">
                <Input
                    className="flex-grow mr-2"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Send a message!"
                />
                <Button onClick={handleSend}>Send</Button>
            </div>
        </div>
    );
}