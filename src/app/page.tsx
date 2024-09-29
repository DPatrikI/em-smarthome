'use client';

import ChatInterface from "@/components/ChatInterface";
import LightControl from "@/components/LightControl";
import { useState } from "react";

export default function Home() {
  const [lightOn, setLightOn] = useState(false);

  const handleLightToggle = () => {
    setLightOn((previous) => !previous);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Smart Home Assistant</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <LightControl
          isOn={lightOn}
          onToggle={handleLightToggle}
        />
        <ChatInterface />
      </div>
    </div>
  );
}
