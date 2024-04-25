
<script>
  export const prerender = true;
  import { AssemblyAI } from 'assemblyai';

  let transcription = "Cargando transcripción...";

  const client = new AssemblyAI({
    apiKey: '37c50e684c234b3fad425c52f58e58e8' 
  });
  const audiourl =
    '';
  const transcribeAudio = async () => {
    try {
      const transcript = await client.transcripts.transcribe({ audio: audiourl });
      transcription = transcript.text || "No se pudo obtener la transcripción.";
    } catch (error) {
      console.error("Error al obtener la transcripción:", error);
      transcription = "Error al obtener la transcripción.";
    }
  };
  transcribeAudio();
</script>
<h1>kkk</h1>
<p>{transcription}</p>

