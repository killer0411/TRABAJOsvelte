<script>
   // @ts-ignore
  import { goto } from "$app/navigation";
  import Nav from "../../componentes/Nav.svelte";
  
  let mostrarPassword = false;
  let usuariologueado = false;

  const vercontraseña = () => {
    mostrarPassword = !mostrarPassword;
  };

  
  const ButtonRegistro = async () => {
    // @ts-ignore
    const user = document.getElementById("usuario").value;
    // @ts-ignore
    const cargo = document.getElementById("cargo").value;
    // @ts-ignore
    const password = document.getElementById("password").value;

    let data = {
      email: user,
      password: password,
      is_active: true,
      is_superuser: false,
      is_verified: false,
    };

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        
        },
       
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (result) {
        goto("/login");
      } else {
        alert("Algo salió mal");
      }
    } catch (error) {
      alert("Ocurrió un error al intentar iniciar sesión");
    }
  };
</script>
<Nav/>
<div class="container">
  
</div>

<h1 class="texto">Registrarse</h1>

<form class="login" on:submit={ButtonRegistro}>
  <input type="text" placeholder="Usuario" id="usuario" />

  <div class="botones-1">
    <select id="cargo" class="select-style">
      <option disabled selected>Cargo</option>
      <option>Administrador</option>
      <option>Usuario</option>
    </select>
  </div>
  <input
    type={mostrarPassword ? "text" : "password"}
    id="password"
    placeholder="Contraseña"
  /><br />
  <button on:click={vercontraseña}>
    {mostrarPassword ? "👁️" : "👁️‍🗨️"}
  </button>

  <div class="registro">
    <button class="iniciar">REGISTRO</button>
  </div>
</form>
<p>Ya estoy registrado. <a href="/login">Iniciar sesión</a></p>

<style>
  .texto {
    margin-top: 30px;
    font-family: "Work Sans";
    font-size: 48px;
    line-height: 62px;
    font-weight: 900;
    height: 50px;
    text-align: center;
  }
  input {
    width: 837px;
    height: 63px;
    border-radius: 30px;
    border: 2px solid #dcdcdc;
    margin-top: 20px;
    padding-left: 10px;
    line-height: 62px;
    font-weight: 400;
  }
  .select-style {
    width: 837px;
    height: 63px;
    border-radius: 30px;
    border: 2px solid #dcdcdc;
    margin-top: 20px;
    padding-left: 10px;
    line-height: 62px;
    font-weight: 400;
    margin-right: 8px;
  }

  .login {
    align-items: center;
    text-align: center;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .logo {
    margin-top: 39px;
    margin-left: 79px;
    width: 250px;
    height: 77px;
  }
  button {
    margin-top: 10px;
  }
  .iniciar {
    background-color: #57bb3c;
    color: white;
    border-radius: 30px;
    width: 837px;
    height: 63px;
    margin-top: 25px;
    line-height: 62px;
    font-weight: 400;
  }
  p {
    margin-top: 10px;
    text-align: left;
    color: black;
    line-height: 62px;
    font-weight: 400;
    margin-left: 260px;
  }
  a {
    color: #57bb3c;
  }
</style>
