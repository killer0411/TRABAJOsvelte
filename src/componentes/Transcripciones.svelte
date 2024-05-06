<script>
  // @ts-nocheck
  let transcript = "";
  let utterances = [];
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
      Speaker {utterance.speaker}: {utterance.text}
    </p>
  {/each}

  <div class="text-center mt-4">
    <button class="btn btn-primary" on:click={descargarTranscription}>
      Descargar Transcripción
    </button>
  </div>
</div>
<audio>
  blbaba
</audio>

<style>
 
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
 

</style>
