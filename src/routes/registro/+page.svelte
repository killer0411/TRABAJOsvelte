<script>


  /**
   
   * @param {string} value
   * @param {string} name
   * @param {string} cargo
   * @param {number} hours
   */

  let mostrarPassword = false;

  const vercontraseña = () => {
    mostrarPassword = !mostrarPassword;
  };

  // @ts-ignore
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
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
        // @ts-ignore
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (result) {
        
        //window.location.href = "/login";
      } else {
        alert("Algo salió mal");
      }
    } catch (error) {
      alert("Ocurrió un error al intentar iniciar sesión");
    }
  };
</script>

<h1 class="text-5xl font-bold">Registro</h1>

<form class="login" on:submit={ButtonRegistro}>
  <div class="container">
    <div class="botones">
      <h4><label for="usuario">Usuario:</label></h4>
      <input
        type="text"
        placeholder="Usuario"
        class="input input-bordered input-success w-full max-w-xs"
        id="usuario"
      />
    </div>
    <div class="botones-1">
      <select class="select select-success w-full max-w-xs" id="cargo">
        <option disabled selected>Cargo</option>
        <option>Administrador</option>
        <option>Usuario</option>
      </select>
    </div>

    <div class="botones">
      <h4><label for="password" class="bg-base-200">Contraseña:</label></h4>
      <div class="password-container">
        <input
          type={mostrarPassword ? "text" : "password"}
          class="input input-bordered input-success w-full max-w-xs"
          id="password"
        />
        <button on:click={vercontraseña}>
          {mostrarPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>
    </div>

    <div class="registro">
      <button class="btn btn-outline btn-success">Registro</button>
    </div>
  </div>
</form>

<style>
  h1 {
    text-align: center;
  }
  input {
    padding: 7px;
    margin-top: 10px;
  }
  label {
    color: rgb(7, 7, 7);
    width: 30px;
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin: 10px;
  }

  .botones {
    padding: 7px 10px;
    align-items: center;
    text-align: center;
    margin: 25px;
    flex-direction: column;
    display: flex;
  }

  .container {
    border: 2px solid black;
    border-radius: 5px;
    width: 40rem;
    background-color: #f4f8f1;
  }
  input {
    border-radius: 10px;
    height: auto;
  }

  .password-container button {
    width: 30rem;
    border: none;
    border-radius: 1px black;
  }

  .registro {
    padding: 20px 20px;
  }
  option {
    margin: 10px;
    background-color: azure;
  }
</style>
