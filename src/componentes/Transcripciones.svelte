<script>
  import { onMount } from 'svelte';
  
  let transcript = '';
  
  onMount(async () => {
    const response = await fetch('http://localhost:8000/transcribe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ audio_url: 'https://github.com/AssemblyAI-Examples/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3' }) // Reemplaza 'url_del_audio' con la URL de tu audio
    });
    
    const data = await response.json();
    if (data.transcript) {
      transcript = data.transcript;
    } else {
      console.error(data.error);
    }
  });
</script>

<p>{transcript}</p>
