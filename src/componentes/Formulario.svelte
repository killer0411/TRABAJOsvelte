<script>
  // @ts-nocheck
  import { AssemblyAI } from 'assemblyai';

  let transcript = '';
  let utterances = [];

  let nombre = "";
  let email = "";
  let seleccionarDocumento = [];

  const transcribeAudio = async (file) => {
      const client = new AssemblyAI({
          apiKey: '37c50e684c234b3fad425c52f58e58e8'
      });
      const params = {
          audio: file,
          speaker_labels: true,
          language_code: "es"
      };

      try {
          const response = await client.transcripts.transcribe(params);
          transcript = response.text;
          utterances = response.utterances;
      } catch (error) {
          console.error('Error transcribing audio:', error);
      }
  };


  const submitForm = async () => {
      const formData = new FormData();
      seleccionarDocumento.forEach((doc) => formData.append("documentos", doc));
      console.log(seleccionarDocumento);
      formData.append("nombre", nombre);
      formData.append("email", email);
      console.log(formData);
      try {
          const response = await fetch("http://localhost:8000/upload/ ", {
              method: "POST",
              body: formData,
          });
          const result = await response.json();
          document.getElementById("result").textContent =
              "Upload successful! " + JSON.stringify(result);
      } catch (error) {}
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


  .container {
    margin-top: 80px; 
  }

  
</style>

<h1 class="text-5xl font-bold text-center mb-8">Audio a transcribir</h1>
<div class="container mx-auto">
  <form on:submit|preventDefault={submitForm} enctype="multipart/form-data" class="max-w-md mx-auto border p-4 rounded-lg">
      <div class="mb-4">
          <label for="nombre" class="block mb-2">Nombre:</label>
          <input type="text" id="nombre" class="input input-bordered input-success w-full max-w-xs" bind:value={nombre} required/>
      </div>

      <div class="mb-4">
          <label for="email" class="block mb-2">Email:</label>
          <input type="email" id="email" class="input input-bordered input-success w-full max-w-xs" bind:value={email} required />
      </div>

      <div class="controles mb-4">
          <h3 class="mb-2"><label for="documento" class="block mb-2">Documento:</label></h3>
          <input type="file" accept="audio/*" multiple required class="file-input file-input-bordered file-input-success w-full max-w-xs" on:change={(event) => {
              const file = event.target.files[0];
              if (file) {
                  transcribeAudio(file);
              }
          }}>
      </div>
      <div class="btn-env text-center">
          <button class="btn btn-outline btn-success">Enviar</button>
      </div>
  </form>
</div>


<div class="container mx-auto mt-8">
  <p id="transcript" class="text-center border border-gray-300 rounded-md p-3 text-sm">
    {transcript}
  </p>
  
  {#each utterances as utterance}
  <p class="text-center border border-gray-300 rounded-md p-3 mt-4 text-sm">
    Speaker {utterance.speaker}: {utterance.text}
  </p>
  {/each}

  <div class="text-center mt-4">
    <button class="btn btn-primary" on:click={downloadTranscription}>Descargar Transcripción</button>
  </div>
</div>
