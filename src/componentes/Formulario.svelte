<script>
  // @ts-nocheck
  import { AssemblyAI } from "assemblyai";

  import { goto } from "$app/navigation";
  import { transcripciones } from "../../src/states/store";

  export let transcript = "";

  export let utterances = [];
  let nombre = "";
  let email = "";
  let seleccionarDocumento = [];
  let files = "";

  let loading = false;

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
      const response = await client.transcripts.transcribe(params);
      transcript = response.text;
      utterances = response.utterances;
      transcripciones.set(response);
      goto("/transcription");
    } catch (error) {
      console.error("Error transcribing audio:", error);
    } finally {
      loading = false;
    }
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
  export const descargarTranscription = () => {
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

<h1 class="texto">Audio a Transcribir</h1>

<form
  on:submit|preventDefault={submitForm}
  enctype="multipart/form-data"
  class="carga"
>

  <input
    type="text"
    id="nombre"
    bind:value={nombre}
    required
  placeholder="Nombre Usuario"
  />

  <input
    type="email"
    id="email"
    bind:value={email}
    required
    placeholder="Email Usuario"
  />

  <div class="label">
    <input
      class="file-input file-input-ghost"
      type="file"
      accept="audio/*"
      multiple
      required
      on:change={(event) => {
        files = event.target.files[0];
      }}
    />
  </div>

  <div class="btn-env">
    <button on:click={transcribeAudio(files)} class="iniciar">Subir</button>
    {#if loading}
      <p class="loading-message">Transcripción en proceso...</p>
    {/if}
  </div>
</form>

<style>
  .texto {
    margin-top: 30px;
    font-family: "Work Sans";
    font-size: 48px;
    line-height: 62px;
    font-weight: 900;
    height: 56px;
    text-align: center;
  }
  input {
    width: 837px;
    height: 63px;
    border-radius: 30px;
    border: 2px solid #dcdcdc;
    margin-top: 10px;
    padding-left: 10px;
    line-height: 62px;
    font-weight: 400;
  }
  .iniciar {
    background-color: #57bb3c;
    color: white;
    border-radius: 30px;
    width: 837px;
    height: 63px;
    margin-top: 25px;
    line-height: 62px;
    font-weight: 400;
  }
  .carga {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 20px;
  }

  .loading-message {
    font-style: italic;
    color: #666;
    text-align: center;
  }
  .btn-env {
    line-height: 62px;
    font-weight: 400;
  }
  p {
    line-height: 62px;
    font-weight: 400;
  }
 
</style>
