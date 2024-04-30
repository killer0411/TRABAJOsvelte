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


</script>
<h1 class="text-5xl font-bold">Audio a transcribir</h1>
<div class="container">
<form on:submit|preventDefault={submitForm} enctype="multipart/form-data">
<div>
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" class="input input-bordered input-success w-full max-w-xs" bind:value={nombre} required/>
</div>

<div>
  <label for="email">Email:</label>
  <input type="email" id="email" class="input input-bordered input-success w-full max-w-xs" bind:value={email} required />
</div>

<div class="controles">
  <h3><label for="documento">Documento:</label></h3>
  <input type="file" accept="audio/*" multiple required class="file-input file-input-bordered file-input-success w-full max-w-xs" on:change={(event) => {
    const file = event.target.files[0];
    if (file) {
      transcribeAudio(file);
    }
  }}>
</div>
<div class="btn-env">
  <button class="btn btn-outline btn-success">Enviar</button>
</div>
</form>
</div>

<p>
{transcript}
</p>

{#each utterances as utterance}
<p>
  Speaker {utterance.speaker}: {utterance.text}
</p>
{/each}





<style>
  input{
    padding-top: 6px;
  }
  
  h1{
    text-align: center;
  }
  div {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    background-color: rgb(231, 231, 228);
  }

  input[type="text"],
  input[type="email"] {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
   
    
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
  }



  form {
    max-width: 400px;
    margin: auto;
    display: 0;
    flex-direction: column;
    align-items: center;
  }
  .controles {
    text-align: center;
    align-items: center;

  }
  .btn-env {
    text-align: center;
  }
 
</style>
