import { useState, useEffect } from 'react';

interface MusicState {
    isPlaying: boolean;
    volume: number;
}

export function useMusicPlayerControl() {
    const [musicState, setMusicState] = useState<MusicState>({ isPlaying: false, volume: 50 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        async function fetchMusicData() {
            try {
                const response = await fetch('/api/music');
                if (!response.ok) {
                    throw new Error('Failed to fetch music data');
                }
                const data = await response.json();
                setMusicState({ isPlaying: data.isPlaying, volume: data.volume });
            } catch (error) {
                console.error(error);
                setError('Failed to load music data');
            } finally {
                setLoading(false);
            }
        }

        fetchMusicData();
    }, []);

    const togglePlayPause = async () => {
        const newIsPlaying = !musicState.isPlaying;
        const updatedState = { ...musicState, isPlaying: newIsPlaying };
        setMusicState(updatedState);

        if (typeof window === 'undefined') return;

        try {
            const response = await fetch('/api/music', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedState),
            });

            if (!response.ok) {
                throw new Error('Failed to update music state');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to update music player');
        }
    };

    const setVolume = async (newVolume: number) => {
        const updatedState = { ...musicState, volume: newVolume };
        setMusicState(updatedState);

        if (typeof window === 'undefined') return;

        try {
            const response = await fetch('/api/music', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedState),
            });

            if (!response.ok) {
                throw new Error('Failed to update volume');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to update volume');
        }
    };

    return {
        musicState,
        loading,
        error,
        togglePlayPause,
        setLoading,
        setVolume,
    };
}