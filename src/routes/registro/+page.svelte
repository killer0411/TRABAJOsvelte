<script>
    /**
     * @param {number} hours
     * @param {string} value
     * @param {string} name
     * @param {string} cargo
     */
    function cookiesRegister(hours, value, name, cargo) {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie =
            name + "=" + value + cargo + ";" + expires + ";path=/";
    }

    let mostrarPassword = false;

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

        const formData = new FormData();
        formData.append("user", user);
        console.log (user)
        formData.append("cargo", cargo);
        console.log (cargo)
        formData.append("password", password);
        console.log (password)

        try {
            const response = await fetch("http://192.168.1.27:8000/login//", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            console.log(result);

            if (result.success) {
                cookiesRegister(1, user, cargo, "username" + "usercargo");

                window.location.href = "/";
            } else {
                alert("Algo salio mal  ");
            }
        } catch (error) {
            console.log("asd");
            alert("Ocurrió un error al intentar iniciar sesión");
        }
    };
</script>



<form class="login" on:submit={ButtonRegistro}>
    <div class="container">
        <div class="botones">
            <h4><label for="usuario">Usuario:</label></h4>
            <input type="text" id="usuario" required />
        </div>
        <div class="botones-1">
            <h4><label for="cargo">Cargo:</label></h4>
            <select id="cargo" required>
                <option value="Selecciona un cargo">Selecciona un cargo</option>
                <option value="administrador" >Administrador</option>
                <option value="usuario">Usuario</option>
            </select>
        </div>

        <div class="botones">
            <h4><label for="password">Contraseña:</label></h4>
            <div class="password-container">
                <input
                    type={mostrarPassword ? "text" : "password"}
                    id="password"
                />
                <button on:click={vercontraseña}>
                    {mostrarPassword ? "👁️" : "👁️‍🗨️"}
                </button>
            </div>
        </div>

        <div class="registro">
            <button class="btn-env" type="submit">Hacer registro</button>
        </div>
    </div>
</form>

<style>
    label {
        background-color: white;
        color: black;
        border-radius: 25px;
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
    .botones-1 {
        border-radius: 50px;
    }
    .container {
        border: 2px solid black;
        border-radius: 5px;
        width: 40rem;
        background-color: #c6f3ce;
    }
    input {
        border-radius: 10px;
        height: auto;
    }

    .password-container button {
        width: 30rem;
        border: none;
    }
    button {
        background-color: #c6f3ce;
    }
    .btn-env {
        background-color: black;
        color: white;
        width: 100px;
    }
    .registro {
        padding: 20px 20px;
    }
    option {
        margin: 10px;
        background-color: azure;
    }
</style>
