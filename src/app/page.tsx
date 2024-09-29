'use client';

import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Smart Home Assistant</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <ChatInterface />
      </div>
    </div>
  );
}
