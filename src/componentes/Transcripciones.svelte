<script>
  // @ts-nocheck
  import { transcripciones } from "../states/store";
  let response;
  transcripciones.subscribe((n) => {
    response = n;
  });

  export const descargarTranscription = () => {
    const editedTranscript = document.getElementById("transcript").value;
    const utterancesText = response.utterances
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



<div class="container mx-auto mt-8">
  {#if response}
    <textarea
      name="transcript"
      id="transcript"
      class="border border-gray-300 rounded-md p-3 text-sm text-slate-950"
    >
      {response.text}
    </textarea>
    {#each response.utterances as utterance}
      <p class="border border-gray-300 rounded-md p-3 mt-4 text-slate-950">
        <textarea name="transcript" id="transcript" class="text-slate-950">
          Speaker {utterance.speaker}: {utterance.text}
        </textarea>
      </p>
    {/each}
    <div class="text-center mt-4">
      <button class="btn btn-primary" on:click={descargarTranscription}>
        Descargar Transcripción
      </button>
    </div>
  {/if}

  {#if !response}
    <p class="font-normal">No se proceso ningun audio...</p>
  {/if}

</div>

<style>
  textarea {
    width: 100%;
    height: 100%;
  }




</style>
