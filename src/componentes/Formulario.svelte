<script>
  // @ts-nocheck

  let nombre = "";
  let email = "";
  let seleccionarDocumento = [];

  function handleFileInput(event) {
    seleccionarDocumento = Array.from(event.target.files);
  }

  const submitForm = async () => {
    const formData = new FormData();
    seleccionarDocumento.forEach((doc) => formData.append("documentos", doc));
    console.log(seleccionarDocumento);
    formData.append("nombre", nombre);
    formData.append("email", email);
    console.log(formData);
    try {
      const response = await fetch("http://192.168.1.27:8000/upload/", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      document.getElementById("result").textContent =
        "Upload successful! " + JSON.stringify(result);
    } catch (error) {
      document.getElementById("result").textContent =
        "Failed to upload files. Error: " + error.message;
    }
  };
</script>

<form on:submit|preventDefault={submitForm} enctype="multipart/form-data">
  <div>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" bind:value={nombre} />
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} />
  </div>

  <div class="controles">
    <h3><label for="documento">Documento:</label></h3>
    <div class="cargar">
      <input type="file" id="documento" on:change={handleFileInput} multiple />
    </div>
  </div>
  <div class="btn-env">
    <button type="submit">Enviar</button>
  </div>
</form>

<style>
  div {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    padding-top: 10px;
  }

  input[type="text"],
  input[type="email"] {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    background-color: #131313;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
  }

  button:hover {
    background-color: #013311;
  }

  form {
    max-width: 400px;
    margin: auto;
    display: 0;
    flex-direction: column;
    align-items: center;
  }
  .controles {
    text-align: center;
    align-items: center;
    background-color: rgb(246, 255, 241);
  }
  .btn-env {
    text-align: center;
  }
  .cargar {
    text-align: center;
  }
</style>
