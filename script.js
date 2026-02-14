document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            document.body.classList.add('loaded');
            initTypewriter(); // Start typewriter when loaded/ready
        }, 500);
    }, 2000); // 2 seconds delay for loading effect

    // Music Player
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i>'; // Changed icon to play
        } else {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Changed icon to pause
        }
        isPlaying = !isPlaying;
    });

    // Confetti Button
    const confettiBtn = document.getElementById('confetti-btn');
    confettiBtn.addEventListener('click', () => {
        createConfetti();
    });

    // Particle System (Hearts)
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('particle');
        heart.innerHTML = '❤️'; // Simple emoji heart for now
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        document.getElementById('hero-particles').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    // Typewriter Effect
    const textToType = "My Dearest,\n\nFrom the moment I met you, my life changed in colors I never knew existed. Every laugh we share, every silence we hold, feels like magic. \n\nYou are my sun, my moon, and all my stars.\n\nForever Yours,\nVj";
    const typewriterElement = document.getElementById('typewriter-text');
    let i = 0;

    function initTypewriter() {
        // Simple Intersection Observer to start typing when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && i === 0) {
                    typeWriter();
                }
            });
        });
        observer.observe(document.getElementById('love-letter'));
    }

    function typeWriter() {
        if (i < textToType.length) {
            if (textToType.charAt(i) === '\n') {
                typewriterElement.innerHTML += '<br>';
            } else {
                typewriterElement.innerHTML += textToType.charAt(i);
            }
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Confetti Logic
    function createConfetti() {
        for (let i = 0; i < 10; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // Dynamic Keyframes for Confetti Fall
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Scroll Reveal for Reasons
    const observerOptions = {
        threshold: 0.2
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        scrollObserver.observe(el);
    });

    // Countdown Timer
    const targetDate = new Date().getTime() + (1000 * 60 * 60 * 24 * 5); // 5 days from now dummy date

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateCountdown, 1000);
});

