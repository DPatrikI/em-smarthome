import { z } from 'zod';
import { tool } from 'ai';
import { container } from '@/lib/cosmosdb';

export const smartHomeTools = {
    toggleLight: tool({
        description: 'Turn the lights on or off',
        parameters: z.object({
            state: z.enum(['on', 'off']).describe('Desired state of the light'),
        }),
        execute: async ({ state }) => {
            console.log('Executing toggleLight');

            try {
                const updatedItem = {
                    id: 'light',
                    on: state === 'on',
                };

                await container.items.upsert(updatedItem);

                console.log('Executed toggleLight');
                return { success: true, state };
            } catch (error) {
                console.error('Error executing toggleLight:', error);
                return { success: false, error };
            }
        },
    }),

    setTemperature: tool({
        description: 'Set the thermostat temperature',
        parameters: z.object({
            temperature: z.number().describe('Desired temperature in Celsius'),
        }),
        execute: async ({ temperature }) => {
            try {
                const updatedItem = {
                    id: 'thermostat',
                    temperature,
                };

                await container.items.upsert(updatedItem);

                return { success: true, temperature };
            } catch (error) {
                console.error('Error executing setTemperature:', error);
                return { success: false, error };
            }
        },
    }),

    controlMusic: tool({
        description: 'Control the music player',
        parameters: z.object({
            action: z.enum(['play', 'pause']).describe('Action to perform'),
            volume: z.number().optional().describe('Volume level (0-100)'),
        }),
        execute: async ({ action, volume }) => {
            try {
                let { resource: existingItem } = await container.item('music', 'music').read();

                if (!existingItem) {
                    existingItem = { id: 'music', isPlaying: false, volume: 50 };
                }

                const updatedItem = {
                    ...existingItem,
                    isPlaying: action === 'play' ? true : action === 'pause' ? false : existingItem.isPlaying,
                    volume: volume !== undefined ? volume : existingItem.volume,
                };

                await container.items.upsert(updatedItem);

                return { success: true, action, volume: updatedItem.volume };
            } catch (error) {
                console.error('Error executing controlMusic:', error);
                return { success: false, error };
            }
        },
    }),
};