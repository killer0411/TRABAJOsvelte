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
        credentials: "include",
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

<Nav />

<h1 class="texto">Iniciar sesión</h1>
<form class="login" on:submit={oprimirBoton}>
  <input type="text" id="user" required placeholder="Usuario" />
  <input
    type={mostrarPassword ? "text" : "password"}
    id="password"
    placeholder="Contraseña"
  />
  <button type="button" on:click={vercontraseña}>
    {mostrarPassword ? "👁️" : "👁️‍🗨️"}
  </button>

  <button class="iniciar" type="submit">INICIAR SESIÓN</button>
  
</form>
<p>¿No estás registrado? <a href="/registro">Crear una cuenta</a></p>

<style>
  .texto {
    margin-top: 30px;
    font-family: "Work Sans";
    font-size: 48px;
    line-height: 62px;
    font-weight: 900;
    height: 56px;
    text-align: center;
  }
  .login {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 20px;
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
  button {
    margin: 10px;
  }
  p{
    margin-top: 10px;
    text-align: left;
    color: black;
    line-height: 62px;
    font-weight: 400;
    margin-left: 260px;
  }
  a{
  color: #57bb3c;

  }
</style>
