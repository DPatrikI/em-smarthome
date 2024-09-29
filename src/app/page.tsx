'use client';

import ChatInterface from "@/components/ChatInterface";
import LightControl from "@/components/LightControl";
import MusicPlayerControl from "@/components/MusicPlayerControl";
import ThermostatControl from "@/components/Thermostat";

import { useLightControl } from '@/hooks/useLightControl';
import { useThermostatControl } from '@/hooks/useThermostatControl';
import { useMusicPlayerControl } from '@/hooks/useMusicPlayerControl';

export default function Home() {
  const {
    lightState,
    loading: lightLoading,
    error: lightError,
    setLoading: setLightLoading,
    toggleLight
  } = useLightControl();

  const {
    thermostatState,
    loading: thermostatLoading,
    error: thermostatError,
    setLoading: setThermostatLoading,
    setTemperature,
  } = useThermostatControl();

  const {
    musicState,
    loading: musicLoading,
    error: musicError,
    setLoading: setMusicLoading,
    togglePlayPause,
    setVolume,
  } = useMusicPlayerControl();

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
          temperature={thermostatState.temperature}
          loading={thermostatLoading}
          error={thermostatError}
          onTemperatureChange={setTemperature}
        />
        <MusicPlayerControl
          state={musicState}
          loading={musicLoading}
          error={musicError}
          onPlayPause={togglePlayPause}
          onVolumeChange={setVolume}
        />
      </div>
      <ChatInterface
        setLightOn={(isOn: boolean) => {
          toggleLight();
        }}
        setLightLoading={(loading: boolean) => {
          setLightLoading(loading);
        }}
        setTemperature={setTemperature}
        setThermostatLoading={(loading: boolean) => {
          setThermostatLoading(loading);
        }}
        setMusicState={(state: { isPlaying: boolean; volume: number }) => {
          setVolume(state.volume);
          if (state.isPlaying !== musicState.isPlaying) {
            togglePlayPause();
          }
        }}
        setMusicLoading={(loading: boolean) => {
          setMusicLoading(loading);
        }}
      />
    </div>
  );
}
