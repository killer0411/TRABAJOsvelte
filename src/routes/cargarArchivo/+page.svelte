<script>
  // @ts-nocheck
  import { AssemblyAI } from "assemblyai";

  import { goto } from "$app/navigation";
  import { transcripciones } from "../../states/store";

  export let transcript = "";

  export let utterances = [];

  let files = [];

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
      goto("/transcripcion");
    } catch (error) {
      console.error("Error transcribing audio:", error);
    } finally {
      loading = false;
    }
  };

  // obtener informacion actualizada del formulario
  const submitForm = async () => {
    console.log("e")
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file)) ;


    try {
      loading = true;
      const response = await fetch("http://localhost:8000/uploadfiles/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      document.getElementById("result").textContent =
        "Upload successful! " + JSON.stringify(result);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    } finally {
      loading = false;
    }
  };
</script>

<h1 class="text-4xl text-center mt-10">Seleciona tu archivo:</h1>

<form
  on:submit|preventDefault={submitForm}
  enctype="multipart/form-data"
  class="carga"
>
  <div class="label">
    <input
      class="file-input file-input-ghost"
      type="file"
      accept="audio/*"
      required
      multiple
      on:change={(event) => {
        files =  Array.from(event.target.files);
      }}
    />
  </div>

  <div class="btn-env">
    <!-- <button on:click={transcribeAudio(files)} class="iniciar">Iniciar transcipcion</button> -->
    <button class="iniciar">Iniciar transcipcion</button>
    {#if loading}
      <div class="flex justify-center">
        <p class="loading-message">Transcripción en proceso</p>
        <span class="loading loading-ring loading-sm"></span>
      </div>
    {/if}
  </div>
</form>

<style>
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
