import { AssemblyAI } from 'assemblyai';
import audiencia1 from '$lib/static/audiencia1.mp3';

export async function load() {
    const client = new AssemblyAI({
        apiKey: '37c50e684c234b3fad425c52f58e58e8'
    });

    try {
        const transcript = await client.transcripts.transcribe({ audio: audiencia1 });

        if (transcript.status === 'error') {
            console.error(transcript.error);
        } else {
            console.log(transcript.text);
        }
    } catch (error) {
        console.error('Error al transcribir el audio:', error);
    }

    
    return {
        data: "camilo"
    };
}
