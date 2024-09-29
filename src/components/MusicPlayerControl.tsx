import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface MusicState {
  isPlaying: boolean;
  volume: number;
}

interface MusicPlayerControlProps {
  state: MusicState;
  onPlayPause: () => void;
  onVolumeChange: (value: number) => void;
}

export default function MusicPlayerControl({ state, onPlayPause, onVolumeChange }: MusicPlayerControlProps) {
  return (
    <Card className='relative'>
      <CardHeader>
        <CardTitle>Music Player</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onPlayPause} className="mb-2">
          {state.isPlaying ? 'Pause' : 'Play'}
        </Button>
        <div className="flex items-center">
          <Slider
            min={0}
            max={100}
            value={[state.volume]}
            onValueChange={(value) => onVolumeChange(value[0])}
          />
          <span className="ml-2">{state.volume}%</span>
        </div>
      </CardContent>
    </Card>
  );
}