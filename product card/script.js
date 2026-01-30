const card = document.querySelector(".tilt");

        card.addEventListener("mousemove", e => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;

            const rx = ((y - r.height / 2) / r.height) * 12;
            const ry = ((x - r.width / 2) / r.width) * 12;

            card.style.transform = `rotateX(${-rx}deg) rotateY(${ry}deg) scale(1.05)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0) rotateY(0) scale(1)";
        });