let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
setInterval(() => {
  let  currentTime = new Date();
    hrs.textContent = currentTime.getHours().toString().padStart(2, "0");
    min.textContent = currentTime.getMinutes().toString().padStart(2, "0");
    sec.textContent = currentTime.getSeconds().toString().padStart(2, "0");
}, 1000);