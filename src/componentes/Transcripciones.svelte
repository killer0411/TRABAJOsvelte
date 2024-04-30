<script>
  // @ts-nocheck

  import { AssemblyAI } from 'assemblyai';

  let transcript = '';
  let utterances = [];

  const transcribeAudio = async (file) => {
    const client = new AssemblyAI({
      apiKey: '37c50e684c234b3fad425c52f58e58e8'
    });

    const params = {
      audio: file,
      speaker_labels: true,
      language_code:"es"


    };

    try {
      const response = await client.transcripts.transcribe(params);
      transcript = response.text;
      utterances = response.utterances;
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  };
</script>

<input type="file" accept="audio/*" multiple on:change={(event) => {
  const file = event.target.files[0];
  if (file) {
    transcribeAudio(file);
  }
}}>

<p>
  {transcript}
</p>

{#each utterances as utterance}
  <p>
    Speaker <span style="font-size: 20px;"> {utterance.speaker}</span>: {utterance.text}
  </p>
{/each}
