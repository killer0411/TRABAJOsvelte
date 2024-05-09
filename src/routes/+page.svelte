<script>

    import NavPublic from "../componentes/NavPublic.svelte";

</script>

<NavPublic/>


<div class="flex items-center">
  <div class="flex flex-col p-9 space-y-3">
    <h1 class="text-5xl">Capturando cada palabra con claridad...</h1>

    <a
      href="/cargarArchivo"
      class="button text-white w-1/3 p-4 text-center rounded-lg font-bold hover:text-lg transition-all duration-300"
      >Transcribir ahora</a
    >
  </div>

  <div class="image-container">
    <img src="./src/static/initialpage.png" alt="imagen" />
  </div>
</div>

<style>
  .button {
    background-color: #57bb3c;
  }
  .image-container {
    width: 629px;
    height: 500px;
  }
</style>
