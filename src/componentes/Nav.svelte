<script>
// @ts-nocheck


async function logout() {
     console.log("")
    }
</script>

<nav class="bg-white flex justify-between items-center p-4">
    <a href="/cargaud">
        <img src="./src/static/logo.png" alt="/" class="w-64 h-20">
    </a>
    <div class="flex items-center space-x-4">
        <a href="/cargaud" class="font-normal text-base leading-10 p-2">Cargar audio</a>
        <a href="/historial/" class="font-normal text-base leading-10 p-2">Historial</a>
        <a href="/transcription" class="font-normal text-base leading-10 p-2">Transcripción</a>
        <a href="/login">
            <button class="w-40 h-12 rounded-lg border border-green-500 text-green-500">Login</button>
        </a>
        <!--   <a href="/" on:click={logout} class="bg-red-600 text-white  py-2 rounded-lg font-bold hover:bg-red-700 hover:text-lg transition-all duration-300 p-2">Cerrar sesión</a>-->
    </div>
</nav>

