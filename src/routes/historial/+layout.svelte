<script>
  // @ts-nocheck
  import Nav from "../../componentes/Nav.svelte";
  import "../../estilos/global.css";
  import Loginprueba from "../../componentes/algo/loginprueba.svelte";
  import Historial from "../../componentes/Historial.svelte";
  import Footer from "../../componentes/Footer.svelte";
</script>

<Nav />
<Loginprueba />

<main>
  <slot></slot>
</main>

<br/>

<Historial />


<Footer/>
