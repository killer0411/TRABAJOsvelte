<script>
  import Nav from "./Nav.svelte";
  
  const oprimirBoton = async () => {
    // @ts-ignore
    const user = document.getElementById("user").value;
    // @ts-ignore
    const password = document.getElementById("password").value;

    const formData = new FormData();
    formData.append("username", user);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/auth/jwt/login", {
        method: "POST",
        body: formData,
        credentials: "include"
        
      });
      const result = response;
      console.log(result);

      if (result["ok"]) {
       
        window.location.href = "/cargaud";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.log("asd");
      alert("Ocurrió un error al intentar iniciar sesión");
    }
  };

  let mostrarPassword = false;

  const vercontraseña = () => {
    mostrarPassword = !mostrarPassword;
  };
</script>
<Nav/>

<h1 class="text-5xl font-bold">Iniciar sesión</h1>
<form class="login" on:submit={oprimirBoton}>
  <div class="container">
    <div class="botones">
      <label for="user">Usuario:</label><br />
      <input type="text" id="user" required  class="input input-bordered input-success w-full max-w-xs"/>
    </div>

    <div class="botones">
      <label for="password">Contraseña:</label><br />
      <input type={mostrarPassword ? "text" : "password"} id="password" class="input input-bordered input-success w-full max-w-xs"/>
      <button type="button" on:click={vercontraseña}>
        {mostrarPassword ? "👁️" : "👁️‍🗨️"}
      </button>
    </div>

    <div class="btn-env">
      <button class="btn btn-success btn btn-outline btn-success" type="submit">Iniciar Sesión</button>
      <a href="/registro"><button class="btn btn-success btn btn-outline btn-success">Registrase</button></a>
    </div>
  </div>
</form>

<style>
  .login {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 20px;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    
   
  }

  h1 {
    margin-top: 30px;
    text-align: center;
  }
  .botones {
    padding: 10px 20px;
    align-items: center;
    text-align: center;
    margin: 10px;
    flex-direction: column;
    display: flex;
  }
  .container {
    background-color: #f4f8f1;
    border: 2px solid black;
    border-radius: 5px;
    width: 40rem;
  }
  input {
    border-radius: 10px;
    height: auto;
  }

  .btn-env {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 15px 15px;
  
  }
  
</style>
