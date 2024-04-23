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
        document.cookie =
            name + "=" + value + ";" + expires + ";path= registro"; //<--Name+value valor de la cookie y nombre
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
        console.log(user)
        formData.append("password", password);
        console.log(password)
        try {
            const response = await fetch("http://192.168.1.27:8000/login//", {
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

<h1>REALIZAR LOGIN</h1>
<form class="login" on:submit={oprimirBoton}>
    <div class="container">
        <div class="botones">
            <label for="user">Usuario:</label><br />
            <input type="text" id="user" required />
        </div>

        <div class="botones">
            <label for="password">Contraseña:</label>
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

        <div class="btn-env">
            <button class="botonera" type="submit">Iniciar Sesión</button>

            <a href="/registro">
                <button class="botonera" type="submit">Realizar Registro</button
                >
            </a>
        </div>
    </div>
</form>

<style>
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        margin: 20px;
    }
    h1 {
        text-align: center;
        font-family: "Courier New", Courier, monospace;
    }
    .botones {
        padding: 20px 20px;
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
        background-color: #c6f3ce;
        color: black;
        width: auto;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 10px 10px;
    }
    .botonera {
        background-color: white;
        border-radius: 10px;
        padding: 7px 7px;
    }
</style>
