function speak(){
    const text = document.getElementById("text").value;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang ="ur-PAK";
    utterance.rate =1;
    utterance.pitch =1;
    speechSynthesis.speak(utterance);
}