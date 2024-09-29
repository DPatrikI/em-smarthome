import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Slider } from './ui/slider';

interface ThermostatControlProps {
  temperature: number;
  onTemperatureChange: (value: number) => void;
}

export default function ThermostatControl({ temperature, onTemperatureChange }: ThermostatControlProps) {
  return (
    <Card className='relative'>
      <CardHeader>
        <CardTitle>Thermostat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Slider
            min={16}
            max={30}
            value={[temperature]}
            onValueChange={(value) => onTemperatureChange(value[0])}
          />
          <span className="ml-2">{temperature}°C</span>
        </div>
      </CardContent>
    </Card>
  );
}