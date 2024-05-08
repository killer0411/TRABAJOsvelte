<script>
// @ts-nocheck
  const fechaInputs = document.querySelectorAll('.fecha');

  fechaInputs.forEach(input => {
    const fechaActual = new Date().toISOString().split('T')[0];
    input.value = fechaActual;
  });
</script>

<div class="container mx-auto mt-8 flex justify-center">
  <table class="table table-zebra">
   
    <thead class="titulo">
      <tr class="l">
        <th></th>
        <th>Usuario</th>
        <th>Fecha</th>
        <th>Archivos Cargados</th>
      </tr>
    </thead >
    <tbody>
      
      <tr>
        <th></th>
        <td>Jhon Sanchez</td>
        <td><input type="date" class="fecha" /></td>
        <a href="/transcription">
          <td>audio</td>
           </a>
      </tr>
      
      <tr>
        <th></th>
        <td>Hart Hagerty</td>
        <td><input type="date" class="fecha" /></td>
        <a href="/transcription">
          <td>audio</td>
           </a>
      </tr>
      
      <tr>
        <th></th>
        <td>Brice Swyre</td>
        <td><input type="date" class="fecha" /></td>
        <a href="/transcription">
        <td>audio</td>
         </a>
      </tr>
    </tbody>
  </table>
</div>


<style>
a{
  color: #57bb3c;
}
.titulo{
  line-height: 62px;
  font-weight: 400;
  border: 1px solid black;
}
table{
  border: 1px solid black;
  width: 100%;
  margin-left: 10px;
  text-align: center;
}
.l{
  border: 1px solid black;
  padding: 0;
}
td{
  line-height: 40px;
  font-weight: 200px;
  
}
</style>
