const video = document.getElementById('intro-video');
const playBtn = document.getElementById('play-btn');
const startScreen = document.getElementById('start-screen');
const music = document.getElementById('bg-music');
const invitation = document.getElementById('invitation');
const muteBtn = document.getElementById('mute-btn');
const muteIcon = document.getElementById('mute-icon');

let finalizado = false;

playBtn.addEventListener('click', () => {
    startScreen.classList.add('slide-up');
    music.load(); 
    music.play().catch(e => console.log("Audio esperando"));
    if(muteBtn) muteBtn.classList.add('visible');

    setTimeout(() => {
        video.style.display = 'block';
        video.style.opacity = '1';
        setTimeout(() => {
            video.classList.add('visible');
            video.play().catch(e => saltarAInvitacion());
        }, 100); 
        setTimeout(() => { if (!finalizado) saltarAInvitacion(); }, 8000);
    }, 600);
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) { music.pause(); } 
    else { if (!music.muted && finalizado) music.play(); }
});

if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        music.muted = !music.muted;
        muteIcon.innerText = music.muted ? '🔇' : '🔊';
    });
}

video.addEventListener('timeupdate', () => {
    if (video.currentTime >= 5.2 && !finalizado) saltarAInvitacion();
});

function saltarAInvitacion() {
    if (finalizado) return;
    finalizado = true;
    video.style.opacity = '0';
    setTimeout(() => {
        video.style.display = 'none';
        video.muted = true;
        invitation.classList.add('visible-invitation');
        document.body.style.overflowY = 'auto';

        const show = (id, delay) => {
            const el = document.getElementById(id);
            if(el) setTimeout(() => el.classList.add('visible-pieza'), delay);
        };

        // Sección 1
        show('waooo-titulo', 400);
        show('waooo-frame', 1200);
        show('waooo-texto', 1800);
        show('waooo-scroll', 2400);

        // Sección 2
        show('convocatoria-titulo', 3000);
        show('convocatoria-fecha', 3500);
        show('convocatoria-marcador', 4000);
        show('convocatoria-texto-largo', 4500);
        show('convocatoria-scroll', 5000);

        // Sección 3
        show('location-izq', 5500);
        show('location-der', 6000);
    }, 800);
}

function updateClock() {
    const target = new Date('May 30, 2026 10:00:00').getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = "¡EMPEZÓ EL PARTIDO! ⚽";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = 
        `${d.toString().padStart(2, '0')}D:${h.toString().padStart(2, '0')}H:${m.toString().padStart(2, '0')}M:${s.toString().padStart(2, '0')}S`;
}
setInterval(updateClock, 1000);
updateClock();