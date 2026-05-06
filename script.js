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
    }, 400); 
});

// PAUSAR AL SALIR (WhatsApp/Maps)
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

        show('waooo-titulo', 400);
        setTimeout(() => { 
            const nota = document.querySelector('.nota-regalo');
            if(nota) nota.classList.add('visible-pieza'); 
        }, 1000); 
        show('waooo-frame', 1600);
        show('waooo-texto', 2200);
        show('waooo-scroll', 2800);

        setTimeout(() => { 
            const notaP = document.querySelector('.nota-piscina');
            if(notaP) notaP.classList.add('visible-pieza'); 
        }, 4200);

        show('convocatoria-titulo', 3000);
        show('convocatoria-fecha', 3500);
        show('convocatoria-marcador', 4000);
        show('convocatoria-texto-largo', 4500);
        show('convocatoria-scroll', 5000);

        show('location-izq', 5500);
        show('location-der', 6000);
    }, 800);
}

function updateClock() {
    const target = new Date('May 23, 2026 10:00:00').getTime();
    const now = new Date().getTime();
    const diff = target - now;
    if (diff > 0) {
        const d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5), 
              m = Math.floor(diff % 36e5 / 6e4), s = Math.floor(diff % 6e4 / 1e3);
        const countdownEl = document.getElementById('countdown');
        if(countdownEl) countdownEl.innerHTML = `${d}D : ${h}H : ${m}M : ${s < 10 ? '0'+s : s}S`;
    }
}
setInterval(updateClock, 1000);
updateClock();