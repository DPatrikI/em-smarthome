import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Switch } from './ui/switch';

interface LightControlProps {
    isOn: boolean;
    onToggle: () => void;
}

export default function LightControl({ isOn, onToggle }: LightControlProps) {
    return (
        <Card className='relative'>
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