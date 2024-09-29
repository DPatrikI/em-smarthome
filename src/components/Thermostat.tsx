import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Slider } from './ui/slider';

interface ThermostatControlProps {
    temperature: number;
    loading: boolean;
    error: string | null;
    onTemperatureChange: (value: number) => void;
}

export default function ThermostatControl({
    temperature,
    loading,
    error,
    onTemperatureChange,
}: ThermostatControlProps) {
    return (
        <Card className="relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                    <p>Loading...</p>
                </div>
            )}
            <CardHeader>
                <CardTitle>Thermostat</CardTitle>
            </CardHeader>
            <CardContent>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="flex items-center">
                        <Slider
                            min={16}
                            max={30}
                            value={[temperature]}
                            disabled={loading}
                            onValueChange={(value) => onTemperatureChange(value[0])}
                        />
                        <span className="ml-2">{temperature}°C</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}