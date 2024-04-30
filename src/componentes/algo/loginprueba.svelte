
<script>
    import { setCookie } from 'cookies-next';
 

    let username = '';
    let password = '';
    let manejo= '';


    async function handleLogin() {
       
        try {
            const response = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(username)
            console.log(password)

            if (response.ok) {
                const data = await response.json();
                
                setCookie('userToken', "data.token");
               
                window.location.href = '/cargaaud';
            } else {
                console.error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }   

    };

    

</script>

<h1>Iniciar sesión</h1>
<input type="text" bind:value={username} placeholder="Nombre de usuario">
<input type="password" bind:value={password} placeholder="Contraseña">
<button on:click={handleLogin}>Iniciar sesión</button>
