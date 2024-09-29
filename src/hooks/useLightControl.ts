import { useState, useEffect } from 'react';

interface LightState {
    isOn: boolean;
}

export function useLightControl() {
    const [lightState, setLightState] = useState<LightState>({ isOn: false });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLightData() {
            try {
                const response = await fetch('/api/light');
                if (!response.ok) {
                    throw new Error('Failed to fetch light data');
                }
                const data = await response.json();
                setLightState({ isOn: data.isOn });
            } catch (error) {
                console.error(error);
                setError('Failed to load light data');
            } finally {
                setLoading(false);
            }
        }

        fetchLightData();
    }, []);

    const toggleLight = async () => {
        setLightState((prevState) => ({ isOn: !prevState.isOn }));

        try {
            const response = await fetch('/api/light', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isOn: !lightState.isOn }),
            });

            if (!response.ok) {
                throw new Error('Failed to update light state');
            }
        } catch (error) {
            console.error(error);
            setLightState((prevState) => ({ isOn: !prevState.isOn }));
            setError('Failed to update light state');
        }
    };

    return {
        lightState,
        loading,
        error,
        toggleLight,
    };
}