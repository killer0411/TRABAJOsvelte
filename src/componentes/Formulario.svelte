<script>
  // @ts-nocheck
  import { AssemblyAI } from "assemblyai";
  import { goto } from "$app/navigation";

  import { writable } from 'svelte/store';


  import { getContext, setContext } from "svelte";
  /** @type {import('./$types').LayoutData} */

  // ...and add it to the context for child components to access

  let transcript = "";

  let utterances = [];
  let nombre = "";
  let email = "";
  let seleccionarDocumento = [];
  let files = "";

  let loading = false;
  
  // funcion para la comunicacion de assembly y sveltekit
  const transcribeAudio = async (file) => {
    const client = new AssemblyAI({
      apiKey: "37c50e684c234b3fad425c52f58e58e8",
    });
    const params = {
      audio: file,
      speaker_labels: true,
      language_code: "es",
    };

    loading = true;

    try {
      /* const response = await client.transcripts.transcribe(params);
      transcript = response.text;
      utterances = response.utterances; */
      setContext('user',"camilo" );
      const userr = getContext('user')
      console.log("0userr")
      console.log(userr)
      // Create a store and update it when necessary...
      //goto('/transcription');


      const count = writable({});
      count.set("camilo")
        console.log(count);
        setContext("user","d")
        const suer = getContext("user")
        console.log(suer)

    } catch (error) {
      console.error("Error transcribing audio:", error);
    } finally {
      loading = false;
    }
    

    
    // Create a store and update it when necessary...
  };

  // obtener informacion actualizada del formulario
  const submitForm = async () => {
    const formData = new FormData();
    seleccionarDocumento.forEach((doc) => formData.append("documentos", doc));
    formData.append("nombre", nombre);
    formData.append("email", email);
    //enviar informacion del formulario a una direccion url en este caso fastapi
    try {
      const response = await fetch("http://localhost:8000/uploadfiles/", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      document.getElementById("result").textContent =
        "Upload successful! " + JSON.stringify(result);
    } catch (error) {}
  };
  // logica para la descarga de la transcripcion de la informacion del audio  deescarga un txt
  const descargarTranscription = () => {
    const editedTranscript = document.getElementById("transcript").value;
    const utterancesText = utterances // declaraciones (utteraces).
      .map((utterance) => `Speaker ${utterance.speaker}: ${utterance.text}`)
      .join("\n");
    const fullTranscript = `${editedTranscript}\n${utterancesText}`;

    const element = document.createElement("a");
    const file = new Blob([fullTranscript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcripcion.txt";
    document.body.appendChild(element);
    element.click();
  };
</script>


<h1 class="text-3xl font-bold text-center mt-8">Audio a transcribir</h1>
<div class="container mx-auto ">
  <form
    on:submit|preventDefault={submitForm}
    enctype="multipart/form-data"
    class="max-w-md mx-auto border p-4 rounded-lg"
  >
    <div class="mb-4">
      <label for="nombre" class="block mb-2">Nombre:</label>
      <input
        type="text"
        id="nombre"
        class="input input-bordered input-success w-full max-w-xs"
        bind:value={nombre}
        required
      />
    </div>

    <div class="mb-4">
      <label for="email" class="block mb-2">Email:</label>
      <input
        type="email"
        id="email"
        class="input input-bordered input-success w-full max-w-xs"
        bind:value={email}
        required
      />
    </div>

    <div class="controles mb-4">
      <h3 class="mb-2">
        <label for="documento" class="block mb-2">Documento:</label>
      </h3>
      <input
        type="file"
        accept="audio/*"
        multiple
        required
        class="file-input file-input-bordered file-input-success w-full max-w-xs"
        on:change={(event) => {
          files = event.target.files[0];
        }}
      />
    </div>
    <div class="btn-env">
      <button
        on:click={transcribeAudio(files)}
        class="btn btn-outline btn-success">Enviar</button
      >
      {#if loading}
        <p class="loading-message">Transcripción en proceso...</p>
      {/if}
    </div>
  </form>
</div>

<div class="container mx-auto mt-8">
  <textarea
    name="transcript"
    id="transcript"
    class="border border-gray-300 rounded-md p-3 text-sm"
  >
    {transcript}
  </textarea>

  {#each utterances as utterance}
    <p class="border border-gray-300 rounded-md p-3 mt-4 text-sm">
      <textarea name="transcript" id="transcript">
        Speaker {utterance.speaker}: {utterance.text}</textarea
      >
    </p>
  {/each}

  <div class="text-center mt-4">
    <button class="btn btn-primary" on:click={descargarTranscription}>
      Descargar Transcripción
    </button>
  </div>
</div>

<style>
  input[type="file"] {
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    height: 100%;
  }

  .container {
    margin-top: 80px;
  }
  .loading-message {
    font-style: italic;
    color: #666;
    text-align: center;
  }
  .btn-env {
    text-align: center;
  }
</style>
