document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const bulb = document.querySelector('.bulb');
    const btnText = document.querySelector('.btn-text');
    let audioCtx;
    function playClickSound() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    }
    function toggleLight() {
        document.body.classList.toggle('is-on');
        const isOn = document.body.classList.contains('is-on');
        try {
            playClickSound();
        } catch (e) {
            console.warn("Audio couldn't be played.", e);
        }
        if (isOn) {
            btnText.textContent = 'Turn Off';
        } else {
            btnText.textContent = 'Turn On';
        }
    }
    toggleBtn.addEventListener('click', toggleLight);
    bulb.addEventListener('click', toggleLight);
});