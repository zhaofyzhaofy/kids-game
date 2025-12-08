// 游戏音效管理
class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.init();
    }

    init() {
        // 创建吃食物音效
        this.createSound('eat', this.generateEatSound());
        
        // 创建按钮点击音效
        this.createSound('click', this.generateClickSound());
        
        // 检查用户偏好
        this.checkSoundPreference();
    }

    createSound(name, audioBuffer) {
        this.sounds[name] = audioBuffer;
    }

    playSound(name) {
        if (!this.enabled || !this.sounds[name]) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createBufferSource();
        source.buffer = this.sounds[name];
        source.connect(audioContext.destination);
        source.start(0);
    }

    generateEatSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const duration = 0.3;
        const sampleRate = audioContext.sampleRate;
        const frameCount = sampleRate * duration;
        
        const audioBuffer = audioContext.createBuffer(1, frameCount, sampleRate);
        const channelData = audioBuffer.getChannelData(0);
        
        // 生成欢快的"叮"声
        for (let i = 0; i < frameCount; i++) {
            const t = i / sampleRate;
            // 基础频率 + 谐波
            const freq1 = 523.25; // C5
            const freq2 = 659.25; // E5
            const freq3 = 783.99; // G5
            
            channelData[i] = 0.5 * (
                Math.sin(2 * Math.PI * freq1 * t) * Math.exp(-4 * t) +
                Math.sin(2 * Math.PI * freq2 * t) * Math.exp(-5 * t) * 0.7 +
                Math.sin(2 * Math.PI * freq3 * t) * Math.exp(-6 * t) * 0.5
            );
        }
        
        return audioBuffer;
    }

    generateClickSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const duration = 0.1;
        const sampleRate = audioContext.sampleRate;
        const frameCount = sampleRate * duration;
        
        const audioBuffer = audioContext.createBuffer(1, frameCount, sampleRate);
        const channelData = audioBuffer.getChannelData(0);
        
        // 生成清脆的点击声
        for (let i = 0; i < frameCount; i++) {
            const t = i / sampleRate;
            channelData[i] = Math.random() * 0.3 * Math.exp(-20 * t);
        }
        
        return audioBuffer;
    }

    toggleSound() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', this.enabled.toString());
        
        if (this.enabled) {
            this.playSound('click');
        }
        
        return this.enabled;
    }

    checkSoundPreference() {
        const savedPreference = localStorage.getItem('soundEnabled');
        if (savedPreference !== null) {
            this.enabled = savedPreference === 'true';
        }
    }
}

// 全局音效管理器
const soundManager = new SoundManager();

// 为按钮添加音效
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            soundManager.playSound('click');
        });
        
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            soundManager.playSound('click');
        });
    });
});