import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Switch } from './ui/switch';

interface LightControlProps {
    isOn: boolean;
    loading: boolean;
    error: string | null;
    onToggle: () => void;
}

export default function LightControl({ isOn, loading, error, onToggle }: LightControlProps) {
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Lights</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Loading...</p>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Lights</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-red-500">{error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lights</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center">
                    <Switch checked={isOn} onCheckedChange={onToggle} />
                    <span className="ml-2">{isOn ? 'On' : 'Off'}</span>
                </div>
            </CardContent>
        </Card>
    );
}