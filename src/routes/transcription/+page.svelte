<script>
    // @ts-ignore
    import Transcripciones from "../../componentes/Transcripciones.svelte";
    import { getContext } from 'svelte';
        // Retrieve user store from context
        const user = getContext('user');
    console.log(user)
</script>
<!-- svelte-ignore a11y-missing-attribute -->
<Transcripciones/>
  

  
