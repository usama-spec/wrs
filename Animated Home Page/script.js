gsap.registerPlugin(ScrollTrigger);
document.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    tl.from('.nav', {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
        .to('.hero__title.reveal', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power4.out"
        }, "-=0.8")
        .to('.hero__subtitle.reveal', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out"
        }, "-=1")
        .to('.hero__btns.reveal', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out"
        }, "-=0.8")
        .to('.hero__scroll.reveal', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out"
        }, "-=0.5");
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    const reveals = document.querySelectorAll('.features .reveal, .gallery .reveal, .section-title.reveal');
    reveals.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });
    gsap.to('.hero__background', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 100,
        scale: 1.2
    });
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)"
            });
        });
    });
});