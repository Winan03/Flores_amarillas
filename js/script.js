// ============ CONTROL DE REPRODUCCIÓN CON INICIO EN SEGUNDO 10 ============
function setupMusicPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const playBtn = document.getElementById('playBtn');
    const progress = document.getElementById('progress');
    const currentTimeSpan = document.getElementById('currentTime');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    let isPlaying = false;
    let startTime = 0; // Comenzar en el segundo 10
    
    // Función para formatear tiempo
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Función para establecer el tiempo inicial
    function setInitialTime() {
        if (audio.readyState >= 1) { // HAVE_METADATA
            audio.currentTime = startTime;
            currentTimeSpan.textContent = formatTime(startTime);
        }
    }
    
    // Control de reproducción
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
            isPlaying = false;
        } else {
            // Asegurar que comience en el segundo 10
            if (audio.currentTime < startTime) {
                audio.currentTime = startTime;
            }
            
            audio.play().then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
                isPlaying = true;
            }).catch((error) => {
                console.log('Error al reproducir:', error);
                showMessage('Por favor, verifica que el archivo de audio esté en: assets/sound/cancion_flores_amarillas.mp3');
            });
        }
    });
    
    // Actualizar progreso
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = progressPercent + '%';
            currentTimeSpan.textContent = formatTime(audio.currentTime);
        }
    });
    
    // Cuando se carguen los metadatos
    audio.addEventListener('loadedmetadata', () => {
        setInitialTime();
        document.getElementById('duration').textContent = formatTime(audio.duration);
    });
    
    // Si los metadatos ya están cargados
    if (audio.readyState >= 1) {
        setInitialTime();
    }
    
    // Cuando termine la canción, reiniciar desde el segundo 10
    audio.addEventListener('ended', () => {
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        isPlaying = false;
        audio.currentTime = startTime;
        currentTimeSpan.textContent = formatTime(startTime);
    });
    
    // Reproducir automáticamente después de 3 segundos, comenzando en segundo 10
    setTimeout(() => {
        if (audio.readyState >= 1) {
            audio.currentTime = startTime;
        }
        
        audio.play().then(() => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
            isPlaying = true;
        }).catch(() => {
            console.log('Autoplay bloqueado por el navegador');
            // El botón permanece visible para reproducción manual
        });
    }, 3000);
}

// ============ FUNCIÓN PARA MOSTRAR MENSAJES ============
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(139, 108, 66, 0.9);
        color: #ffd700;
        padding: 15px 20px;
        border-radius: 10px;
        border: 1px solid rgba(255, 215, 0, 0.3);
        z-index: 1000;
        font-size: 14px;
        max-width: 300px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.5s ease-out;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 500);
        }
    }, 5000);
}

// ============ ANIMACIONES DE ENTRADA SECUENCIALES ============
function startSequentialAnimations() {
    // Las animaciones ya están definidas en CSS con delays
    // Solo necesitamos remover la clase que pausa las animaciones si existe
    document.body.classList.remove('not-loaded');
    
    console.log('🌻 Iniciando secuencia de animación de flores...');
}

// ============ EFECTOS ADICIONALES ============
function addInteractiveEffects() {
    // Efecto de movimiento suave en las flores al mover el mouse
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        // Aplicar efecto paralaje sutil a las flores
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach((flower, index) => {
            const intensity = (index + 1) * 0.5;
            const translateX = mouseX * intensity;
            const translateY = mouseY * intensity;
            
            flower.style.transform += ` translate(${translateX}px, ${translateY}px)`;
        });
        
        // Efecto en las estrellas fugaces
        const shootingStars = document.querySelectorAll('.shooting-star');
        shootingStars.forEach((star, index) => {
            const intensity = (index % 3 + 1) * 0.2;
            const translateX = mouseX * intensity;
            const translateY = mouseY * intensity;
            
            star.style.transform += ` translate(${translateX}px, ${translateY}px)`;
        });
    });
}

// ============ INICIALIZACIÓN PRINCIPAL ============
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌻 Inicializando página "Flores Para Ti"...');
    
    // Configurar el reproductor de música
    setupMusicPlayer();
    
    // Iniciar las animaciones secuenciales
    startSequentialAnimations();
    
    // Agregar efectos interactivos
    setTimeout(() => {
        addInteractiveEffects();
    }, 1000);
    
    // Efecto de carga completada
    setTimeout(() => {
        console.log('✨ Página completamente cargada y animada!');
    }, 4000);
});

// ============ MANEJO DE VISIBILIDAD DE PÁGINA ============
// Pausar/reanudar música cuando se cambia de pestaña
document.addEventListener('visibilitychange', () => {
    const audio = document.getElementById('backgroundMusic');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (document.hidden) {
        if (!audio.paused) {
            audio.pause();
            // Guardamos el estado de que estaba reproduciéndose
            audio.dataset.wasPlaying = 'true';
        }
    } else {
        if (audio.dataset.wasPlaying === 'true') {
            audio.play().then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
            });
            delete audio.dataset.wasPlaying;
        }
    }
});

// ============ MANEJO DE ERRORES DE AUDIO ============
window.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'AUDIO') {
        showMessage('Error al cargar el archivo de audio. Verifica la ruta: assets/sound/cancion_flores_amarillas.mp3');
    }
});

// ============ FUNCIONES DE DEPURACIÓN ============
window.debugFlowers = {
    pauseAnimations: () => {
        document.body.classList.add('not-loaded');
        console.log('Animaciones pausadas');
    },
    
    resumeAnimations: () => {
        document.body.classList.remove('not-loaded');
        console.log('Animaciones reanudadas');
    },
    
    restartMusic: () => {
        const audio = document.getElementById('backgroundMusic');
        audio.currentTime = 10;
        audio.play();
        console.log('Música reiniciada desde segundo 10');
    }
};