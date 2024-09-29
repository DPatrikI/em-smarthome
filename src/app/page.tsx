'use client';

import ChatInterface from "@/components/ChatInterface";
import LightControl from "@/components/LightControl";
import MusicPlayerControl from "@/components/MusicPlayerControl";
import ThermostatControl from "@/components/Thermostat";
import { useState } from "react";

import { useLightControl } from '@/hooks/useLightControl';

export default function Home() {
  const {
    lightState,
    loading: lightLoading,
    error: lightError,
    toggleLight,
  } = useLightControl();

  const [temperature, setTemperature] = useState(22);
  const [musicState, setMusicState] = useState({
    isPlaying: false,
    volume: 50,
  });

  const handleTemperatureChange = (value: number) => {
    setTemperature(value);
  };

  const handlePlayPause = () => {
    setMusicState((previousState) => ({
      ...previousState,
      isPlaying: !previousState.isPlaying,
    }));
  };

  const handleVolumeChange = (value: number) => {
    setMusicState((previousState) => ({
      ...previousState,
      volume: value,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Smart Home Assistant</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <LightControl
          isOn={lightState.isOn}
          loading={lightLoading}
          error={lightError}
          onToggle={toggleLight}
        />
        <ThermostatControl
          temperature={temperature}
          onTemperatureChange={handleTemperatureChange}
        />
        <MusicPlayerControl
          state={musicState}
          onPlayPause={handlePlayPause}
          onVolumeChange={handleVolumeChange}
        />
      </div>
      <ChatInterface />
    </div>
  );
}
