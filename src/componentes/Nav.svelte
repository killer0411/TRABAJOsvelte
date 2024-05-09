<script>
  // @ts-nocheck

  async function logout() {
    console.log("");
  }
</script>

<nav class="bg-white flex justify-between items-center p-4">
  <a href="/">
    <img src="./src/static/logo.png" alt="/" class="w-64 h-20 ml-3" />
  </a>
  <div class="flex items-center space-x-4">
    <a
      href="/cargarArchivo"
      class="font-normal text-base leading-10 hover:text-lg hover:underline transition-all duration-500"
      >Subir archivo</a
    >
    <a
      href="/historial/"
      class="font-normal text-base leading-10 p-2 hover:text-lg hover:underline transition-all duration-200"
      >Historial de Transcripción</a
    >

    <a
      href="/registro/"
      class="font-normal text-base leading-10 p-2 hover:text-lg hover:underline transition-all duration-200"
      >Gestion de usuarios</a
    >

    <a
      href="/"
      on:click={logout}
      class="bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 hover:text-lg transition-all duration-300 p-2"
      >Cerrar sesión</a
    >
  </div>
</nav>
