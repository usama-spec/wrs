const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');
const status = document.getElementById('status');

// Check for browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Your browser does not support Speech Recognition. Try using Chrome.");
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = true;

  let listening = false;

  startBtn.addEventListener('click', () => {
    if (!listening) {
      recognition.start();
      status.textContent = "Listening...";
      startBtn.textContent = "Stop Listening";
      listening = true;
    } else {
      recognition.stop();
      status.textContent = "Stopped.";
      startBtn.textContent = "Start Listening";
      listening = false;
    }
  });

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    output.value = transcript;
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    status.textContent = `Error: ${event.error}`;
  };
}
