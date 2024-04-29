<script>
  /**
   * @param {string} name
   * @param {string} value
   * @param {number} hours
   */
  function controlcookies(name, value, hours) {
    const date = new Date(); //<--Objeto para obtener la hora y la fecha de la cookie
    date.setTime(date.getTime() + hours * 60 * 60 * 1000); //<--Transformar horas a segundos para saber la hora de creacion de la cookie
    const expires = "expires=" + date.toUTCString(); //<--Calcular la fecha de expiracion de la cookie
    document.cookie = name + "=" + value + ";" + expires + ";path= registro"; //<--Name+value valor de la cookie y nombre
    //<--expire fecha de expiracion ---> ruta de valides de la cookie
  }
  /**
   * @param {string | any[]} name
   */
  function getCookie(name) {
    //<--funcion para saber si ya existe una cookie existente
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      // @ts-ignore
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
  }
  const oprimirBoton = async () => {
    // @ts-ignore
    const user = document.getElementById("user").value;
    // @ts-ignore
    const password = document.getElementById("password").value;

    const formData = new FormData();
    formData.append("user", user);
    console.log(user);
    formData.append("password", password);
    console.log(password);
    try {
      const response = await fetch("http://192.168.1.27:8000/login/", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        controlcookies("username", user, 1);

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

<h1>Ingresar</h1>
<form class="login" on:submit={oprimirBoton}>
  <div class="container">
    <div class="botones">
      <label for="user">Usuario:</label><br />
      <input type="text" id="user" required />
    </div>

    <div class="botones">
      <label for="password">Contraseña:</label><br />
      <input type={mostrarPassword ? "text" : "password"} id="password" />
      <button type="button" on:click={vercontraseña}>
        {mostrarPassword ? "👁️" : "👁️‍🗨️"}
      </button>
    </div>

    <div class="btn-env">
      <button class="botonera" type="submit">Iniciar Sesión</button>
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
    border: none;
    background-color: #d4fac3;
  }

  h1 {
    margin-top: 100px;
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
    border: 1px solid rgb(203, 203, 203);
    border-radius: 1px;
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
    padding: 10px;
  }
  .botonera {
    border-radius: 10px;
    padding: 7px 20px;
    margin-right: 10px;
    border: none;
  }
</style>
