// src/lib/audioManager.ts

type SoundKey =
    | 'buttonHover'
    | 'buttonClick'
    | 'landingSong'
    | 'ambience'
    | 'infoSong'
    | 'faqSong'
    | 'creditSong';

const SOUND_PATHS: Record<SoundKey, string[]> = {
    buttonHover: ['/sounds/buttonHover.mp3'],
    buttonClick: ['/sounds/buttonClick.mp3'],
    landingSong: ['/sounds/landingSong.mp3'],
    ambience: ['/sounds/environmentAmbience.mp3'],
    infoSong: ['/sounds/infoSong.mp3'],
    faqSong: ['/sounds/faqSong.mp3'],
    creditSong: ['/sounds/creditsSong.mp3']
};

class AudioManager {
    private isMutedState = false;
    private audioCache: Partial<Record<SoundKey, HTMLAudioElement>> = {};
    private currentRoute = '';
    private activeBgTracks: HTMLAudioElement[] = [];
    private carAudio: HTMLAudioElement | null = null;
    private carFadeInterval: number | null = null;
    private initialized = false;
    private lastHoveredEl: Element | null = null;
    private listenersAdded = false;
    private listeners: Array<() => void> = [];
    private muteSubscribers: Array<(muted: boolean) => void> = [];

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

        // Apply mute state to all active tracks
        this.activeBgTracks.forEach((track) => {
            track.muted = muted;
        });

        if (this.carAudio) {
            this.carAudio.muted = muted;
        }

        // Notify subscribers
        this.muteSubscribers.forEach((cb) => cb(muted));

        if (!muted) {
            // Attempt to resume bg music for current route if unmuted
            this.updateRouteMusic(this.currentRoute);
        }
    }

    public init(): void {
        if (typeof window === 'undefined' || this.initialized) return;
        this.initialized = true;

        // Preload sounds
        Object.keys(SOUND_PATHS).forEach((key) => {
            this.getAudioElement(key as SoundKey);
        });

        // Set up global user interaction unlocker & event delegation
        this.setupEventListeners();
    }

    private getAudioElement(key: SoundKey): HTMLAudioElement {
        if (this.audioCache[key]) {
            return this.audioCache[key]!;
        }

        const paths = SOUND_PATHS[key];
        const audio = new Audio();
        audio.preload = 'auto';

        let pathIdx = 0;
        const tryLoadPath = () => {
            if (pathIdx < paths.length) {
                audio.src = paths[pathIdx];
                pathIdx++;
            }
        };

        audio.addEventListener('error', () => {
            if (pathIdx < paths.length) {
                tryLoadPath();
            }
        });

        tryLoadPath();
        this.audioCache[key] = audio;
        return audio;
    }

    private setupEventListeners(): void {
        if (this.listenersAdded || typeof window === 'undefined') return;
        this.listenersAdded = true;

        // Autoplay unlock
        const unlockAudio = () => {
            if (this.activeBgTracks.length > 0) {
                this.activeBgTracks.forEach((track) => {
                    track.muted = this.isMutedState;
                    track.play().catch(() => {});
                });
            }
            window.removeEventListener('pointerdown', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('click', unlockAudio);
        };

        window.addEventListener('pointerdown', unlockAudio);
        window.addEventListener('keydown', unlockAudio);
        window.addEventListener('touchstart', unlockAudio);
        window.addEventListener('click', unlockAudio);

        // Hover sound delegation
        const handleMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest('button, a, [role="button"], .btn');
            if (target && target !== this.lastHoveredEl) {
                this.lastHoveredEl = target;
                this.playHover();
            } else if (!target) {
                this.lastHoveredEl = null;
            }
        };

        // Click sound delegation
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest('button, a, [role="button"], .btn');
            if (target) {
                this.playClick();
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('click', handleClick);

        this.listeners.push(() => {
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('pointerdown', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
        });
    }

    public playHover(): void {
        if (this.isMutedState || typeof window === 'undefined') return;
        try {
            const sound = this.getAudioElement('buttonHover');
            const clone = sound.cloneNode() as HTMLAudioElement;
            clone.volume = 0.6;
            clone.play().catch(() => {});
        } catch {}
    }

    public playClick(): void {
        if (this.isMutedState || typeof window === 'undefined') return;
        try {
            const sound = this.getAudioElement('buttonClick');
            const clone = sound.cloneNode() as HTMLAudioElement;
            clone.volume = 0.8;
            clone.play().catch(() => {});
        } catch {}
    }

    public updateRouteMusic(route: string): void {
        if (typeof window === 'undefined') return;
        this.currentRoute = route;

        // Stop all background tracks
        this.stopBgTracks();

        const tracksToPlay: HTMLAudioElement[] = [];

        if (route === '/' || route === '') {
            // Landing Page Song + Ambience (LOOPS)
            const landing = this.getAudioElement('landingSong');
            landing.loop = true;
            landing.volume = 0.5;
            tracksToPlay.push(landing);

            const ambience = this.getAudioElement('ambience');
            ambience.loop = true;
            ambience.volume = 1.0;
            tracksToPlay.push(ambience);
        } else if (route.startsWith('/info')) {
            // Info site song (LOOPS)
            const info = this.getAudioElement('infoSong');
            info.loop = true;
            info.volume = 0.5;
            tracksToPlay.push(info);
        } else if (route.startsWith('/faq')) {
            // FAQ song (LOOPS)
            const faq = this.getAudioElement('faqSong');
            faq.loop = true;
            faq.volume = 0.5;
            tracksToPlay.push(faq);
        } else if (route.startsWith('/credits')) {
            // Credits song (LOOPS)
            const credits = this.getAudioElement('creditSong');
            credits.loop = true;
            credits.volume = 0.6;
            tracksToPlay.push(credits);
        }

        this.activeBgTracks = tracksToPlay;

        tracksToPlay.forEach((track) => {
            track.muted = this.isMutedState;
            track.play().catch(() => {
                // Will play after user interaction unlock if blocked
            });
        });
    }

    private stopBgTracks(): void {
        this.activeBgTracks.forEach((track) => {
            track.pause();
            track.currentTime = 0;
        });
        this.activeBgTracks = [];
    }


    public startCarSound(_duration = 18000): void {}

    public stopCarSound(): void {}

    public subscribeMuteState(cb: (muted: boolean) => void): () => void {
        cb(this.isMutedState);
        this.muteSubscribers.push(cb);
        return () => {
            this.muteSubscribers = this.muteSubscribers.filter((s) => s !== cb);
        };
    }
}

export const audioManager = new AudioManager();
