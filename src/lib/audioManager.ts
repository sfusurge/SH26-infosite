// src/lib/audioManager.ts

type SoundKey =
    | 'buttonHover'
    | 'buttonClick'
    | 'landingSong'
    | 'ambience'
    | 'infoSong'
    | 'faqSong'
    | 'creditSong';

const SOUND_PATHS: Record<SoundKey, string> = {
    buttonHover: '/sounds/buttonHover.mp3',
    buttonClick: '/sounds/buttonClick.mp3',
    landingSong: '/sounds/landingSong.mp3',
    ambience: '/sounds/environmentAmbience.mp3',
    infoSong: '/sounds/infoSong.mp3',
    faqSong: '/sounds/faqSong.mp3',
    creditSong: '/sounds/creditsSong.mp3'
};

const DEFAULT_VOLUMES: Record<SoundKey, number> = {
    buttonHover: 0.35,
    buttonClick: 0.5,
    landingSong: 0.45,
    ambience: 0.25,
    infoSong: 0.45,
    faqSong: 0.45,
    creditSong: 0.5
};

class AudioManager {
    private isMutedState = false;
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private audioBuffers: Partial<Record<SoundKey, AudioBuffer>> = {};
    private activeBgSources: Map<SoundKey, { source: AudioBufferSourceNode; gainNode: GainNode }> = new Map();
    private carSource: { source: AudioBufferSourceNode; gainNode: GainNode } | null = null;

    private currentRoute = '';
    private initialized = false;
    private lastHoveredEl: Element | null = null;
    private lastHoverTime = 0;
    private muteSubscribers: Array<(muted: boolean) => void> = [];
    private wasPausedByVisibility = false;

    constructor() {
        if (typeof window !== 'undefined') {
            const savedMute = localStorage.getItem('sh26_muted');
            if (savedMute !== null) {
                this.isMutedState = savedMute === 'true';
            } else {
                this.isMutedState = false;
            }
        }
    }

    public get isMuted(): boolean {
        return this.isMutedState;
    }

    public toggleMute(): boolean {
        this.setMuted(!this.isMutedState);
        return this.isMutedState;
    }

    public setMuted(muted: boolean): void {
        this.isMutedState = muted;
        if (typeof window !== 'undefined') {
            localStorage.setItem('sh26_muted', String(muted));
        }

        if (this.masterGain && this.ctx) {
            try {
                this.masterGain.gain.setTargetAtTime(muted ? 0 : 1, this.ctx.currentTime, 0.03);
            } catch {
                this.masterGain.gain.value = muted ? 0 : 1;
            }
        }

        this.muteSubscribers.forEach((cb) => cb(muted));

        if (!muted) {
            this.unlockAudioContext();
        }
    }

    public init(): void {
        if (typeof window === 'undefined' || this.initialized) return;
        this.initialized = true;

        this.initAudioContext();
        this.preloadAllBuffers();
        this.setupEventListeners();
    }

    private initAudioContext(): void {
        if (typeof window === 'undefined') return;
        try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = this.isMutedState ? 0 : 1;
                this.masterGain.connect(this.ctx.destination);
            }
        } catch (err) {
            console.warn('Web Audio API initialization failed:', err);
        }
    }

    private unlockAudioContext(): void {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    }

    private async preloadAllBuffers(): Promise<void> {
        if (!this.ctx) return;
        const keys = Object.keys(SOUND_PATHS) as SoundKey[];
        await Promise.all(keys.map((key) => this.loadBuffer(key)));
    }

    private async loadBuffer(key: SoundKey): Promise<AudioBuffer | null> {
        if (this.audioBuffers[key]) {
            return this.audioBuffers[key]!;
        }
        if (!this.ctx) return null;

        try {
            const response = await fetch(SOUND_PATHS[key]);
            const arrayBuffer = await response.arrayBuffer();
            const decoded = await this.ctx.decodeAudioData(arrayBuffer);
            this.audioBuffers[key] = decoded;
            return decoded;
        } catch (err) {
            console.warn(`Failed to decode audio for ${key}:`, err);
            return null;
        }
    }

    private playSfx(key: SoundKey, customVolume?: number): void {
        if (this.isMutedState || typeof window === 'undefined' || (typeof document !== 'undefined' && document.hidden)) return;
        this.unlockAudioContext();
        if (!this.ctx || !this.masterGain) return;

        const buffer = this.audioBuffers[key];
        const vol = customVolume ?? DEFAULT_VOLUMES[key];
        if (!buffer) {
            this.loadBuffer(key).then((buf) => {
                if (buf) this.playBufferSfx(buf, vol);
            });
            return;
        }
        this.playBufferSfx(buffer, vol);
    }

    private playBufferSfx(buffer: AudioBuffer, volume: number): void {
        if (!this.ctx || !this.masterGain) return;
        try {
            const source = this.ctx.createBufferSource();
            source.buffer = buffer;
            const gain = this.ctx.createGain();
            gain.gain.value = volume;
            source.connect(gain);
            gain.connect(this.masterGain);
            source.start(0);
        } catch {}
    }

    public playHover(): void {
        const now = Date.now();
        if (now - this.lastHoverTime < 50) return;
        this.lastHoverTime = now;
        this.playSfx('buttonHover');
    }

    public playClick(): void {
        this.playSfx('buttonClick');
    }

    public startCarSound(durationMs = 18000): void {
        if (typeof window === 'undefined' || this.isMutedState) return;
        this.unlockAudioContext();
    }

    public stopCarSound(): void {
        if (this.carSource) {
            try {
                this.carSource.source.stop();
            } catch {}
            this.carSource = null;
        }
    }

    public updateRouteMusic(route: string): void {
        if (typeof window === 'undefined') return;
        if (this.currentRoute === route && this.activeBgSources.size > 0) {
            return;
        }
        this.currentRoute = route;

        const targetKeys: SoundKey[] = [];
        if (route === '/' || route === '') {
            targetKeys.push('landingSong', 'ambience');
        } else if (route.startsWith('/info')) {
            targetKeys.push('infoSong');
        } else if (route.startsWith('/faq')) {
            targetKeys.push('faqSong');
        } else if (route.startsWith('/credits')) {
            targetKeys.push('creditSong');
        }

        this.syncActiveBgTracks(targetKeys);
    }

    private syncActiveBgTracks(targetKeys: SoundKey[]): void {
        for (const [key, item] of this.activeBgSources.entries()) {
            if (!targetKeys.includes(key)) {
                try {
                    item.source.stop();
                } catch {}
                this.activeBgSources.delete(key);
            }
        }

        for (const key of targetKeys) {
            if (!this.activeBgSources.has(key)) {
                this.startBgTrack(key);
            }
        }
    }

    private startBgTrack(key: SoundKey): void {
        if (!this.ctx || !this.masterGain) return;
        const buffer = this.audioBuffers[key];
        if (!buffer) {
            this.loadBuffer(key).then((buf) => {
                if (buf && this.currentRouteTrackKeys().includes(key)) {
                    this.createBgSource(key, buf);
                }
            });
            return;
        }
        this.createBgSource(key, buffer);
    }

    private currentRouteTrackKeys(): SoundKey[] {
        const route = this.currentRoute;
        if (route === '/' || route === '') return ['landingSong', 'ambience'];
        if (route.startsWith('/info')) return ['infoSong'];
        if (route.startsWith('/faq')) return ['faqSong'];
        if (route.startsWith('/credits')) return ['creditSong'];
        return [];
    }

    private createBgSource(key: SoundKey, buffer: AudioBuffer): void {
        if (!this.ctx || !this.masterGain || this.activeBgSources.has(key)) return;
        try {
            const source = this.ctx.createBufferSource();
            source.buffer = buffer;
            source.loop = true;

            const gainNode = this.ctx.createGain();
            gainNode.gain.value = DEFAULT_VOLUMES[key];

            source.connect(gainNode);
            gainNode.connect(this.masterGain);

            source.start(0);
            this.activeBgSources.set(key, { source, gainNode });
        } catch {}
    }

    private setupEventListeners(): void {
        if (typeof window === 'undefined') return;

        const unlock = () => {
            this.unlockAudioContext();
        };

        const interactionEvents = ['pointerdown', 'mousedown', 'touchstart', 'touchend', 'click', 'keydown'];
        interactionEvents.forEach((evt) => {
            window.addEventListener(evt, unlock, { capture: true, passive: true });
        });

        const handleMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest('button, a, [role="button"], .btn');
            if (target && target !== this.lastHoveredEl) {
                this.lastHoveredEl = target;
                this.playHover();
            } else if (!target) {
                this.lastHoveredEl = null;
            }
        };

        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest('button, a, [role="button"], .btn');
            if (target) {
                this.playClick();
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('click', handleClick);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAllAudio();
            } else {
                this.resumeAllAudio();
            }
        });
    }

    public pauseAllAudio(): void {
        this.wasPausedByVisibility = true;
        if (this.ctx && this.ctx.state === 'running') {
            this.ctx.suspend().catch(() => {});
        }
    }

    public resumeAllAudio(): void {
        if (this.wasPausedByVisibility && !this.isMutedState && (typeof document === 'undefined' || !document.hidden)) {
            this.wasPausedByVisibility = false;
            this.unlockAudioContext();
        }
    }

    public subscribeMuteState(cb: (muted: boolean) => void): () => void {
        cb(this.isMutedState);
        this.muteSubscribers.push(cb);
        return () => {
            this.muteSubscribers = this.muteSubscribers.filter((s) => s !== cb);
        };
    }
}

export const audioManager = new AudioManager();

