// ===== AUDIO SYSTEM =====
const AudioSystem = {
    sounds: {},
    context: null,
    initialized: false,
    
    init() {
        if (this.initialized) return;
        
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            
            // Create sounds
            this.sounds.click = this.createClickSound();
            this.sounds.correct = this.createCorrectSound();
            this.sounds.wrong = this.createWrongSound();
            this.sounds.tick = this.createTickSound();
            this.sounds.checkmate = this.createCheckmateSound();
            this.sounds.move = this.createMoveSound();
            this.sounds.capture = this.createCaptureSound();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    },
    
    createClickSound() {
        return {
            play: () => {
                if (!window.audioEnabled || !this.context) return;
                try {
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(this.context.destination);
                    oscillator.type = 'sine';
                    oscillator.frequency.value = 800;
                    gainNode.gain.value = 0.1;
                    oscillator.start();
                    oscillator.stop(this.context.currentTime + 0.1);
                } catch (e) {}
            }
        };
    },
    
    createCorrectSound() {
        return {
            play: () => {
                if (!window.audioEnabled || !this.context) return;
                try {
                    const now = this.context.currentTime;
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(this.context.destination);
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(523.25, now);
                    oscillator.frequency.setValueAtTime(659.25, now + 0.1);
                    oscillator.frequency.setValueAtTime(783.99, now + 0.2);
                    gainNode.gain.setValueAtTime(0.1, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                    oscillator.start();
                    oscillator.stop(now + 0.3);
                } catch (e) {}
            }
        };
    },
    
    createWrongSound() {
        return {
            play: () => {
                if (!window.audioEnabled || !this.context) return;
                try {
                    const now = this.context.currentTime;
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(this.context.destination);
                    oscillator.type = 'sawtooth';
                    oscillator.frequency.setValueAtTime(200, now);
                    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);
                    gainNode.gain.setValueAtTime(0.1, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                    oscillator.start();
                    oscillator.stop(now + 0.3);
                } catch (e) {}
            }
        };
    },
    
    createTickSound() {
        return {
            play: () => {
                if (!window.audioEnabled || !this.context) return;
                try {
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(this.context.destination);
                    oscillator.type = 'sine';
                    oscillator.frequency.value = 1000;
                    gainNode.gain.value = 0.05;
                    oscillator.start();
                    oscillator.stop(this.context.currentTime + 0.05);
                } catch (e) {}
            }
        };
    },
    
    createCheckmateSound() {
        return {
            play: () => {
                if (!window.audioEnabled || !this.context) return;
                try {
                    const now = this.context.currentTime;
                    const oscillator1 = this.context.createOscillator();
                    const oscillator2 = this.context.createOscillator();
                    const gainNode = this.context.createGain();
                    oscillator1.connect(gainNode);
                    oscillator2.connect(gainNode);
                    gainNode.connect(this.context.destination);
                    oscillator1.type = 'sine';
                    oscillator2.type = 'sine';
                    oscillator1.frequency.setValueAtTime(440, now);
                    oscillator1.frequency.setValueAtTime(554.37, now + 0.1);
                    oscillator1.frequency.setValueAtTime(659.25, now + 0.2);
                    oscillator2.frequency.setValueAtTime(554.37, now);
                    oscillator2.frequency.setValueAtTime(659.25, now + 0.1);
                    oscillator2.frequency.setValueAtTime(880, now + 0.2);
                    gainNode.gain.setValueAtTime(0.1, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                    oscillator1.start();
                    oscillator2.start();
                    oscillator1.stop(now + 0.5);
                    oscillator2.stop(now + 0.5);
                } catch (e) {}
            }
        };
    },
    
    createMoveSound() {
        return {
            play: () => {
                if (!window.audioEnabled || !this.context) return;
                try {
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(this.context.destination);
                    oscillator.type = 'sine';
                    oscillator.frequency.value = 600;
                    gainNode.gain.value = 0.1;
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.15);
                    oscillator.start();
                    oscillator.stop(this.context.currentTime + 0.15);
                } catch (e) {}
            }
        };
    },
    
    createCaptureSound() {
        return {
            play: () => {
                if (!window.audioEnabled || !this.context) return;
                try {
                    const oscillator = this.context.createOscillator();
                    const gainNode = this.context.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(this.context.destination);
                    oscillator.type = 'triangle';
                    oscillator.frequency.setValueAtTime(400, this.context.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(200, this.context.currentTime + 0.2);
                    gainNode.gain.value = 0.15;
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);
                    oscillator.start();
                    oscillator.stop(this.context.currentTime + 0.2);
                } catch (e) {}
            }
        };
    },
    
    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].play();
        }
    },
    
    // Resume audio context (needed for Chrome autoplay policy)
    resume() {
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    }
};

// Enable audio after user interaction
window.audioEnabled = false;

// First click anywhere enables audio
document.addEventListener('click', function enableAudio() {
    window.audioEnabled = true;
    AudioSystem.init();
    AudioSystem.resume();
    document.removeEventListener('click', enableAudio);
}, { once: true });

// Also enable on touch for mobile
document.addEventListener('touchstart', function enableAudio() {
    window.audioEnabled = true;
    AudioSystem.init();
    AudioSystem.resume();
    document.removeEventListener('touchstart', enableAudio);
}, { once: true });