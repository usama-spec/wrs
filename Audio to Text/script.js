const startBtn = document.getElementById('start-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const finalText = document.getElementById('final-text');
const interimText = document.getElementById('interim-text');
const status = document.getElementById('status');
const visualizer = document.getElementById('visualizer');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    status.textContent = 'Browser not supported';
    startBtn.disabled = true;
    startBtn.style.opacity = '0.5';
    startBtn.style.cursor = 'not-allowed';
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    let isRecording = false;
    let fullTranscript = '';
    recognition.onstart = () => {
        isRecording = true;
        startBtn.classList.add('recording');
        visualizer.classList.add('active');
        status.textContent = 'Listening...';
        if (finalText.textContent === 'Tap the microphone to start transcribing...') {
            finalText.textContent = '';
        }
    };
    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                fullTranscript += event.results[i][0].transcript + ' ';
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        finalText.textContent = fullTranscript;
        interimText.textContent = interimTranscript;
        finalText.parentElement.scrollTop = finalText.parentElement.scrollHeight;
    };
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        status.textContent = `Error: ${event.error}`;
        stopRecording();
    };
    recognition.onend = () => {
        if (isRecording) {
            recognition.start();
        } else {
            status.textContent = 'Ready';
        }
    };
    const stopRecording = () => {
        isRecording = false;
        recognition.stop();
        startBtn.classList.remove('recording');
        visualizer.classList.remove('active');
        interimText.textContent = '';
    };
    startBtn.addEventListener('click', () => {
        if (isRecording) {
            stopRecording();
        } else {
            recognition.start();
        }
    });
    copyBtn.addEventListener('click', () => {
        const textToCopy = finalText.textContent;
        if (textToCopy && textToCopy !== 'Tap the microphone to start transcribing...') {
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalStatus = status.textContent;
                status.textContent = 'Copied!';
                setTimeout(() => {
                    status.textContent = originalStatus;
                }, 2000);
            });
        }
    });
    clearBtn.addEventListener('click', () => {
        fullTranscript = '';
        finalText.textContent = 'Tap the microphone to start transcribing...';
        interimText.textContent = '';
        if (isRecording) stopRecording();
    });
}