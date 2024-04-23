<script>
  let abierto = false;

  function MenuH() {
    abierto = !abierto;
  }
</script>

<button class="hamburguesa" on:click={MenuH}>
  <span></span>
  <span></span>
  <span></span>
</button>

{#if abierto}
  <div class="menu">
    <a href="/historial">Historial de Transcripciones </a>
    <a href="/historial">Reportes</a>
  </div>
{/if}

<style>
  .hamburguesa {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 20px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    position: fixed;
    top: 20px;
    right: 20px;
  }

  .hamburguesa span {
    display: block;
    width: 30px;
    height: 4px;
    background: black;
    border-radius: 4px;
    transition: transform 0.3s ease-in-out;
  }

  .menu {
    position: fixed;
    top: 20px;
    right: 80px;
    background: white;
    border: 1px solid black;
    padding: 20px;
    z-index: 1000;
  }

  .menu a {
    display: block;
    padding: 5px 0;
    color: black;
    text-decoration: none;
  }
</style>
