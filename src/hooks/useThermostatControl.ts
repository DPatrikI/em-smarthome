import { useState, useEffect } from 'react';

interface ThermostatState {
    temperature: number;
}

export function useThermostatControl() {
    const [thermostatState, setThermostatState] = useState<ThermostatState>({ temperature: 21 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchThermostatData() {
            try {
                const response = await fetch('/api/thermostat');
                if (!response.ok) {
                    throw new Error('Failed to fetch thermostat data');
                }
                const data = await response.json();
                setThermostatState({ temperature: data.temperature });
            } catch (error) {
                console.error(error);
                setError('Failed to load thermostat data');
            } finally {
                setLoading(false);
            }
        }

        fetchThermostatData();
    }, []);

    const setTemperature = async (newTemperature: number) => {
        setThermostatState({ temperature: newTemperature });

        try {
            const response = await fetch('/api/thermostat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ temperature: newTemperature }),
            });

            if (!response.ok) {
                throw new Error('Failed to update thermostat state');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to update thermostat');
        }
    };

    return {
        thermostatState,
        loading,
        error,
        setTemperature,
    };
}