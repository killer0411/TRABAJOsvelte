<script>
  // @ts-nocheck

  import { AssemblyAI } from 'assemblyai';

  let transcript = '';
  let utterances = [];
  let loading = false; 

  const transcribeAudio = async (file) => {
    const client = new AssemblyAI({
      apiKey: '37c50e684c234b3fad425c52f58e58e8'
    });

    const params = {
      audio: file,
      speaker_labels: true,
      language_code:"es"
    };

    loading = true;

    try {
      const response = await client.transcripts.transcribe(params);
      transcript = response.text;
      utterances = response.utterances;
    } catch (error) {
      console.error('Error transcribing audio:', error);
    } finally {
      loading = false;
    }
  };

  const downloadTranscription = () => {
    const transcriptText = transcript;
    const utterancesText = utterances.map(utterance => `Speaker ${utterance.speaker}: ${utterance.text}`).join('\n');
    const fullTranscript = `${transcriptText}\n${utterancesText}`;
    
    const element = document.createElement('a');
    const file = new Blob([fullTranscript], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'transcripcion.txt';
    document.body.appendChild(element);
    element.click();
  };
</script>

<style>
  input[type="file"] {
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .loading-message {
    font-style: italic;
    color: #666;
  }

  .container {
    margin-top: 80px; /* Ajusta el margen superior según sea necesario */
  }

  .transcription {
    margin-top: 20px; /* Agrega un espacio adicional sobre la transcripción */
  }
</style>

<div class="container flex items-center justify-center h-screen">
  <div class="bg-white p-6 rounded-md shadow-md max-w-lg">
    <input type="file" accept="audio/*" multiple on:change={(event) => {
      const file = event.target.files[0];
      if (file) {
        transcribeAudio(file);
      }
    }}>
    
    {#if loading}
      <p class="loading-message">Transcripción en proceso...</p>
    {/if}
    
    <p id="transcript" class="text-center mt-8 border border-gray-300 rounded-md p-3 text-sm transcription">
      {transcript}
    </p>
    
    {#each utterances as utterance}
    <p class="text-center border border-gray-300 rounded-md p-3 mt-4 text-sm">
      Speaker {utterance.speaker}: {utterance.text}
    </p>
    {/each}
    
    <button class="btn btn-primary mt-4" on:click={downloadTranscription}>Descargar Transcripción</button>
  </div>
</div>
