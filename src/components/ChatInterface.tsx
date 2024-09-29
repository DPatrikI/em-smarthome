'use client';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { useChat } from 'ai/react';
import { ToolInvocation } from 'ai';
import { useEffect, useState } from 'react';

interface ChatInterfaceProps {
    setLightOn: (state: boolean) => void;
    setLightLoading: (loading: boolean) => void;
    setTemperature: (temp: number) => void;
    setThermostatLoading: (loading: boolean) => void;
    setMusicState: (state: { isPlaying: boolean; volume: number }) => void;
    setMusicLoading: (loading: boolean) => void;
}

export default function ChatInterface(props: ChatInterfaceProps) {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const [runningTools, setRunningTools] = useState<ToolInvocation[]>([]);

    const handleToolInvocation = async (toolInvocation: ToolInvocation) => {
        if (!runningTools.some((t) => t.toolCallId === toolInvocation.toolCallId)) {
            if (toolInvocation.state === 'result') return;

            setRunningTools([...runningTools, toolInvocation]);

            switch (toolInvocation.toolName) {
                case 'toggleLight':
                    props.setLightLoading(true);
                    break;
                case 'setTemperature':
                    props.setThermostatLoading(true);
                    break;
                case 'controlMusic':
                    props.setMusicLoading(true);
                    break;
                default:
                    console.error('Unknown tool invocation:', toolInvocation.toolName);
            }
            return;
        }

        if (toolInvocation.state !== 'result') return;

        switch (toolInvocation.toolName) {
            case 'toggleLight':
                props.setLightLoading(false);
                props.setLightOn(toolInvocation.result.state === 'on');
                break;
            case 'setTemperature':
                props.setThermostatLoading(false);
                props.setTemperature(toolInvocation.result.temperature);
                break;
            case 'controlMusic':
                props.setMusicLoading(false);
                props.setMusicState({
                    isPlaying: toolInvocation.result.action === 'play',
                    volume: toolInvocation.result.volume
                });
                break;
            default:
                console.error('Unknown function call:', toolInvocation.toolName);
        }

        setRunningTools(runningTools.filter((t) => t.toolCallId !== toolInvocation.toolCallId));
    };

    useEffect(() => {
        if (messages.length > 1) {
            for (let index = messages.length - 2; index < messages.length; index++) {
                const message = messages[index];
                if (message.role === 'assistant') {
                    if (!message.toolInvocations || message.toolInvocations.length === 0) return;
                    message.toolInvocations.forEach((toolInvocation) => handleToolInvocation(toolInvocation));
                }
            }
        }
    }, [messages]);

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