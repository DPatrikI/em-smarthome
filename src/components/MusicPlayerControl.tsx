import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface MusicState {
    isPlaying: boolean;
    volume: number;
}

interface MusicPlayerControlProps {
    state: MusicState;
    loading: boolean;
    error: string | null;
    onPlayPause: () => void;
    onVolumeChange: (value: number) => void;
}

export default function MusicPlayerControl({
    state,
    loading,
    error,
    onPlayPause,
    onVolumeChange,
}: MusicPlayerControlProps) {
    return (
        <Card className="relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                    <p>Loading...</p>
                </div>
            )}
            <CardHeader>
                <CardTitle>Music Player</CardTitle>
            </CardHeader>
            <CardContent>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <Button disabled={loading} onClick={onPlayPause} className="mb-2">
                            {state.isPlaying ? 'Pause' : 'Play'}
                        </Button>
                        <div className="flex items-center">
                            <Slider
                                min={0}
                                max={100}
                                value={[state.volume]}
                                disabled={loading}
                                onValueChange={(value) => onVolumeChange(value[0])}
                            />
                            <span className="ml-2">{state.volume}%</span>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}