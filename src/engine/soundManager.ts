export enum Sounds {
    PowerUp = 0,
    Error = 1
}

export class SoundManager {
    private p: HTMLAudioElement;
    private cp: any;
    private bgMusic: HTMLAudioElement;
    private song: any;
    private sounds: Array<string> = [];
    public muted: boolean;

    constructor() {
        this.p = new Audio();
        this.cp = new CPlayer();

        // construct background music
        this.setupBg();

        // to setup another sound
        this.p.volume = 1.0;
        this.sounds[Sounds.PowerUp] = this.setupSound(this.PowerUpSound());
        this.sounds[Sounds.Error] = this.setupSound(this.ErrorSound());

        this.muted = false;
    }
    public playSound(sound: Sounds): void {
        this.p.src = this.sounds[sound];
        this.p.play();
    }

    public playBg(): void {
        this.bgMusic.play();
    }

    public stopBg(): void {
        this.bgMusic.pause();
    }

    public muteAll(): void {
        this.bgMusic.muted = true;
        this.p.muted = true;
        this.muted = true;
    }

    public unMuteAll(): void {
        this.bgMusic.muted = false;
        this.p.muted = false;
        this.muted = false;
    }

    private setupSound(sound: any): string {
        let done = 0;
        this.cp.init(sound);
        while (done = this.cp.generate()) {
            if (done >= 1)
                break;
            // wait zzz...
        }
        return URL.createObjectURL(new Blob([this.cp.createWave()], { type: "audio/wav" }));
    }

    // put this mess down here so it is out of the way
    private setupBg(): void {
        this.song = {
            songData: [
                { // Instrument 0
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        0, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        29, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        194, // LFO_AMT
                        4, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        3, // FX_FILTER
                        25, // FX_FREQ
                        191, // FX_RESONANCE
                        115, // FX_DIST
                        244, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        84, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    // Columns
                    c: [
                        {
                            n: [116, 120, 116, 125, 123, , 123, 118, 118, 120, 118, 116, 116, 116, , 116, 118, 122, 123, 118, 118, , , 125, 122, 120, 122, , 122, 122, , 118],
                            f: [21, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 48]
                        },
                        {
                            n: [128, 132, 128, 137, 135, , 135, 130, 130, 132, 130, 128, 128, 128, , 128, 130, 134, 135, 130, 130, , , 137, 134, 132, 134, , 134, 134, , 130],
                            f: [, , , , , , , , , , , , , , , , , , , , , , , , , , , 11, 13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 31]
                        }
                    ]
                },
                { // Instrument 1
                    i: [
                        0, // OSC1_WAVEFORM
                        255, // OSC1_VOL
                        117, // OSC1_SEMI
                        1, // OSC1_XENV
                        0, // OSC2_WAVEFORM
                        255, // OSC2_VOL
                        110, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        1, // OSC2_XENV
                        0, // NOISE_VOL
                        4, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        35, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        0, // LFO_AMT
                        0, // LFO_FREQ
                        0, // LFO_FX_FREQ
                        2, // FX_FILTER
                        14, // FX_FREQ
                        1, // FX_RESONANCE
                        1, // FX_DIST
                        39, // FX_DRIVE
                        76, // FX_PAN_AMT
                        5, // FX_PAN_FREQ
                        0, // FX_DELAY_AMT
                        0 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [, 1, 1, 1, 1, 1, 1, 2, 2, , 1, 1, 1, 1, 1, 1, 2, 2, , 1, 1, 1, 1, 1, 1, 2, 2],
                    // Columns
                    c: [
                        {
                            n: [147, , , , , , 147, , , , 147, , , , , , 147, , , , , , 147, , , , 147, , , , 147],
                            f: []
                        },
                        {
                            n: [147],
                            f: []
                        }
                    ]
                },
                { // Instrument 2
                    i: [
                        0, // OSC1_WAVEFORM
                        0, // OSC1_VOL
                        140, // OSC1_SEMI
                        0, // OSC1_XENV
                        0, // OSC2_WAVEFORM
                        0, // OSC2_VOL
                        140, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        60, // NOISE_VOL
                        4, // ENV_ATTACK
                        10, // ENV_SUSTAIN
                        68, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        187, // LFO_AMT
                        5, // LFO_FREQ
                        0, // LFO_FX_FREQ
                        1, // FX_FILTER
                        239, // FX_FREQ
                        135, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        108, // FX_PAN_AMT
                        5, // FX_PAN_FREQ
                        16, // FX_DELAY_AMT
                        4 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [, 1, 1, 2, 3, 2, 3, 4, 4, , 1, 1, 2, 3, 2, 3, 4, 4, , 1, 1, 2, 3, 2, 3, 4, 4],
                    // Columns
                    c: [
                        {
                            n: [, , , , 147, , , , , , , , 148, , , , , , , , 147, , , , , , , , 147],
                            f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                        },
                        {
                            n: [, , , , 147, , , 147, , , , , 148, , , , , , , , 147, , , 147, , , 147, , , , 147],
                            f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                        },
                        {
                            n: [, , , , 147, , , 147, , , , , 148, , , , , , , , 147, , , 147, , , 147, , , 147, 147, 147],
                            f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                        },
                        {
                            n: [147],
                            f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 68]
                        }
                    ]
                },
                { // Instrument 3
                    i: [
                        2, // OSC1_WAVEFORM
                        192, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        2, // OSC2_WAVEFORM
                        192, // OSC2_VOL
                        140, // OSC2_SEMI
                        18, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        107, // ENV_ATTACK
                        115, // ENV_SUSTAIN
                        138, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        136, // LFO_AMT
                        5, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        8, // FX_FREQ
                        92, // FX_RESONANCE
                        21, // FX_DIST
                        56, // FX_DRIVE
                        148, // FX_PAN_AMT
                        5, // FX_PAN_FREQ
                        85, // FX_DELAY_AMT
                        8 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1],
                    // Columns
                    c: [
                        {
                            n: [116, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 123],
                            f: []
                        },
                        {
                            n: [120, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 127],
                            f: []
                        }
                    ]
                },
                { // Instrument 4
                    i: [
                        0, // OSC1_WAVEFORM
                        255, // OSC1_VOL
                        152, // OSC1_SEMI
                        0, // OSC1_XENV
                        0, // OSC2_WAVEFORM
                        255, // OSC2_VOL
                        152, // OSC2_SEMI
                        12, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        2, // ENV_ATTACK
                        0, // ENV_SUSTAIN
                        60, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        0, // LFO_AMT
                        0, // LFO_FREQ
                        0, // LFO_FX_FREQ
                        2, // FX_FILTER
                        255, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        47, // FX_PAN_AMT
                        3, // FX_PAN_FREQ
                        157, // FX_DELAY_AMT
                        2 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [, , , 1, 2, 1, 3, 1, 2, , , , 1, 4, 1, 5, 1, 2, , , , 1, 2, 1, 3, 1, 2],
                    // Columns
                    c: [
                        {
                            n: [120, , , , 125, , , , 123, , , , 125, , 123, , 122, , 123, , 120, , 120],
                            f: []
                        },
                        {
                            n: [120, , , , 125, , , , 123, , , , 125, , 123, , 122, , 123, , 132, , 132],
                            f: []
                        },
                        {
                            n: [120, , , , 125, , , , 123, , , , 125, , 123, , 122, , 123, , 122, , 122],
                            f: []
                        },
                        {
                            n: [144, , , , 137, , , , 135, , , , 137, , 135, , 134, , 135, , 144, , 144],
                            f: []
                        },
                        {
                            n: [132, , , , 137, , , , 135, , , , 137, , 135, , 134, , 135, , 134, , 134],
                            f: []
                        }
                    ]
                },
                { // Instrument 5
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 6
                    i: [
                        0, // OSC1_WAVEFORM
                        0, // OSC1_VOL
                        140, // OSC1_SEMI
                        0, // OSC1_XENV
                        0, // OSC2_WAVEFORM
                        0, // OSC2_VOL
                        140, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        255, // NOISE_VOL
                        158, // ENV_ATTACK
                        158, // ENV_SUSTAIN
                        158, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        51, // LFO_AMT
                        2, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        58, // FX_FREQ
                        239, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        88, // FX_PAN_AMT
                        1, // FX_PAN_FREQ
                        157, // FX_DELAY_AMT
                        2 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 7
                    i: [
                        0, // OSC1_WAVEFORM
                        255, // OSC1_VOL
                        106, // OSC1_SEMI
                        1, // OSC1_XENV
                        0, // OSC2_WAVEFORM
                        255, // OSC2_VOL
                        106, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        1, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        7, // ENV_SUSTAIN
                        164, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        0, // LFO_AMT
                        0, // LFO_FREQ
                        0, // LFO_FX_FREQ
                        2, // FX_FILTER
                        255, // FX_FREQ
                        0, // FX_RESONANCE
                        2, // FX_DIST
                        16, // FX_DRIVE
                        83, // FX_PAN_AMT
                        5, // FX_PAN_FREQ
                        53, // FX_DELAY_AMT
                        1 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [, , , , , , , , , 1, , , , , , , , , 1, , , , , , , , , 1],
                    // Columns
                    c: [
                        {
                            n: [147],
                            f: []
                        }
                    ]
                }
            ],
            rowLen: 5513,   // In sample lengths
            patternLen: 32,  // Rows per pattern
            endPattern: 29  // End pattern
        };

        this.bgMusic = new Audio(this.setupSound(this.song));
        this.bgMusic.volume = 0.3;
        this.bgMusic.loop = true;
    }

    private PowerUpSound(): any {
        return {
            songData: [
                { // Instrument 0
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        0, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        29, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        91, // LFO_AMT
                        4, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        3, // FX_FILTER
                        50, // FX_FREQ
                        184, // FX_RESONANCE
                        119, // FX_DIST
                        69, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        84, // FX_DELAY_AMT
                        2 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [1],
                    // Columns
                    c: [
                        {
                            n: [152, 156, 159, 164],
                            f: []
                        }
                    ]
                },
                { // Instrument 1
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 2
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 3
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 4
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 5
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 6
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 7
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                }
            ],
            rowLen: 1470,   // In sample lengths
            patternLen: 32,  // Rows per pattern
            endPattern: 2  // End pattern
        };
    }

    private ErrorSound(): any {
        return {
            songData: [
                { // Instrument 0
                    i: [
                        0, // OSC1_WAVEFORM
                        255, // OSC1_VOL
                        152, // OSC1_SEMI
                        0, // OSC1_XENV
                        0, // OSC2_WAVEFORM
                        255, // OSC2_VOL
                        156, // OSC2_SEMI
                        255, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        0, // ENV_ATTACK
                        0, // ENV_SUSTAIN
                        63, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        2, // LFO_WAVEFORM
                        0, // LFO_AMT
                        0, // LFO_FREQ
                        0, // LFO_FX_FREQ
                        2, // FX_FILTER
                        255, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        47, // FX_PAN_AMT
                        3, // FX_PAN_FREQ
                        25, // FX_DELAY_AMT
                        2 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [1],
                    // Columns
                    c: [
                        {
                            n: [108],
                            f: []
                        }
                    ]
                },
                { // Instrument 1
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 2
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 3
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 4
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 5
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 6
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                },
                { // Instrument 7
                    i: [
                        2, // OSC1_WAVEFORM
                        100, // OSC1_VOL
                        128, // OSC1_SEMI
                        0, // OSC1_XENV
                        3, // OSC2_WAVEFORM
                        201, // OSC2_VOL
                        128, // OSC2_SEMI
                        0, // OSC2_DETUNE
                        0, // OSC2_XENV
                        0, // NOISE_VOL
                        5, // ENV_ATTACK
                        6, // ENV_SUSTAIN
                        58, // ENV_RELEASE
                        0, // ARP_CHORD
                        0, // ARP_SPEED
                        0, // LFO_WAVEFORM
                        195, // LFO_AMT
                        6, // LFO_FREQ
                        1, // LFO_FX_FREQ
                        2, // FX_FILTER
                        135, // FX_FREQ
                        0, // FX_RESONANCE
                        0, // FX_DIST
                        32, // FX_DRIVE
                        147, // FX_PAN_AMT
                        6, // FX_PAN_FREQ
                        121, // FX_DELAY_AMT
                        6 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [],
                    // Columns
                    c: [
                    ]
                }
            ],
            rowLen: 5513,   // In sample lengths
            patternLen: 32,  // Rows per pattern
            endPattern: 2  // End pattern
        };
    }
}

var CPlayer = function() {

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    // Oscillators
    var osc_sin = function (value) {
        return Math.sin(value * 6.283184);
    };

    var osc_saw = function (value) {
        return 2 * (value % 1) - 1;
    };

    var osc_square = function (value) {
        return (value % 1) < 0.5 ? 1 : -1;
    };

    var osc_tri = function (value) {
        var v2 = (value % 1) * 4;
        if(v2 < 2) return v2 - 1;
        return 3 - v2;
    };

    var getnotefreq = function (n) {
        // 174.61.. / 44100 = 0.003959503758 (F3)
        return 0.003959503758 * Math.pow(2, (n - 128) / 12);
    };

    var createNote = function (instr, n, rowLen) {
        var osc1 = mOscillators[instr.i[0]],
            o1vol = instr.i[1],
            o1xenv = instr.i[3],
            osc2 = mOscillators[instr.i[4]],
            o2vol = instr.i[5],
            o2xenv = instr.i[8],
            noiseVol = instr.i[9],
            attack = instr.i[10] * instr.i[10] * 4,
            sustain = instr.i[11] * instr.i[11] * 4,
            release = instr.i[12] * instr.i[12] * 4,
            releaseInv = 1 / release,
            arp = instr.i[13],
            arpInterval = rowLen * Math.pow(2, 2 - instr.i[14]);

        var noteBuf = new Int32Array(attack + sustain + release);

        // Re-trig oscillators
        var c1 = 0, c2 = 0;

        // Local variables.
        var j, j2, e, t, rsample, o1t, o2t;

        // Generate one note (attack + sustain + release)
        for (j = 0, j2 = 0; j < attack + sustain + release; j++, j2++) {
            if (j2 >= 0) {
                // Switch arpeggio note.
                arp = (arp >> 8) | ((arp & 255) << 4);
                j2 -= arpInterval;

                // Calculate note frequencies for the oscillators
                o1t = getnotefreq(n + (arp & 15) + instr.i[2] - 128);
                o2t = getnotefreq(n + (arp & 15) + instr.i[6] - 128) * (1 + 0.0008 * instr.i[7]);
            }

            // Envelope
            e = 1;
            if (j < attack) {
                e = j / attack;
            } else if (j >= attack + sustain) {
                e -= (j - attack - sustain) * releaseInv;
            }

            // Oscillator 1
            t = o1t;
            if (o1xenv) {
                t *= e * e;
            }
            c1 += t;
            rsample = osc1(c1) * o1vol;

            // Oscillator 2
            t = o2t;
            if (o2xenv) {
                t *= e * e;
            }
            c2 += t;
            rsample += osc2(c2) * o2vol;

            // Noise oscillator
            if (noiseVol) {
                rsample += (2 * Math.random() - 1) * noiseVol;
            }

            // Add to (mono) channel buffer
            noteBuf[j] = (80 * rsample * e) | 0;
        }

        return noteBuf;
    };


    //--------------------------------------------------------------------------
    // Private members
    //--------------------------------------------------------------------------

    // Array of oscillator functions
    var mOscillators = [
        osc_sin,
        osc_square,
        osc_saw,
        osc_tri
    ];

    // Private variables set up by init()
    var mSong, mLastRow, mCurrentCol, mNumWords, mMixBuf;


    //--------------------------------------------------------------------------
    // Initialization
    //--------------------------------------------------------------------------

    this.init = function (song) {
        // Define the song
        mSong = song;

        // Init iteration state variables
        mLastRow = song.endPattern - 2;
        mCurrentCol = 0;

        // Prepare song info
        mNumWords =  song.rowLen * song.patternLen * (mLastRow + 1) * 2;

        // Create work buffer (initially cleared)
        mMixBuf = new Int32Array(mNumWords);
    };


    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    // Generate audio data for a single track
    this.generate = function () {
        // Local variables
        var i, j, b, p, row, col, n, cp,
            k, t, lfor, e, x, rsample, rowStartSample, f, da;

        // Put performance critical items in local variables
        var chnBuf = new Int32Array(mNumWords),
            instr = mSong.songData[mCurrentCol],
            rowLen = mSong.rowLen,
            patternLen = mSong.patternLen;

        // Clear effect state
        var low = 0, band = 0, high;
        var lsample, filterActive = false;

        // Clear note cache.
        var noteCache = [];

         // Patterns
         for (p = 0; p <= mLastRow; ++p) {
            cp = instr.p[p];

            // Pattern rows
            for (row = 0; row < patternLen; ++row) {
                // Execute effect command.
                var cmdNo = cp ? instr.c[cp - 1].f[row] : 0;
                if (cmdNo) {
                    instr.i[cmdNo - 1] = instr.c[cp - 1].f[row + patternLen] || 0;

                    // Clear the note cache since the instrument has changed.
                    if (cmdNo < 15) {
                        noteCache = [];
                    }
                }

                // Put performance critical instrument properties in local variables
                var oscLFO = mOscillators[instr.i[15]],
                    lfoAmt = instr.i[16] / 512,
                    lfoFreq = Math.pow(2, instr.i[17] - 9) / rowLen,
                    fxLFO = instr.i[18],
                    fxFilter = instr.i[19],
                    fxFreq = instr.i[20] * 43.23529 * 3.141592 / 44100,
                    q = 1 - instr.i[21] / 255,
                    dist = instr.i[22] * 1e-5,
                    drive = instr.i[23] / 32,
                    panAmt = instr.i[24] / 512,
                    panFreq = 6.283184 * Math.pow(2, instr.i[25] - 9) / rowLen,
                    dlyAmt = instr.i[26] / 255,
                    dly = instr.i[27] * rowLen;

                // Calculate start sample number for this row in the pattern
                rowStartSample = (p * patternLen + row) * rowLen;

                // Generate notes for this pattern row
                for (col = 0; col < 4; ++col) {
                    n = cp ? instr.c[cp - 1].n[row + col * patternLen] : 0;
                    if (n) {
                        if (!noteCache[n]) {
                            noteCache[n] = createNote(instr, n, rowLen);
                        }

                        // Copy note from the note cache
                        var noteBuf = noteCache[n];
                        for (j = 0, i = rowStartSample * 2; j < noteBuf.length; j++, i += 2) {
                          chnBuf[i] += noteBuf[j];
                        }
                    }
                }

                // Perform effects for this pattern row
                for (j = 0; j < rowLen; j++) {
                    // Dry mono-sample
                    k = (rowStartSample + j) * 2;
                    rsample = chnBuf[k];

                    // We only do effects if we have some sound input
                    if (rsample || filterActive) {
                        // State variable filter
                        f = fxFreq;
                        if (fxLFO) {
                            f *= oscLFO(lfoFreq * k) * lfoAmt + 0.5;
                        }
                        f = 1.5 * Math.sin(f);
                        low += f * band;
                        high = q * (rsample - band) - low;
                        band += f * high;
                        rsample = fxFilter == 3 ? band : fxFilter == 1 ? high : low;

                        // Distortion
                        if (dist) {
                            rsample *= dist;
                            rsample = rsample < 1 ? rsample > -1 ? osc_sin(rsample*.25) : -1 : 1;
                            rsample /= dist;
                        }

                        // Drive
                        rsample *= drive;

                        // Is the filter active (i.e. still audiable)?
                        filterActive = rsample * rsample > 1e-5;

                        // Panning
                        t = Math.sin(panFreq * k) * panAmt + 0.5;
                        lsample = rsample * (1 - t);
                        rsample *= t;
                    } else {
                        lsample = 0;
                    }

                    // Delay is always done, since it does not need sound input
                    if (k >= dly) {
                        // Left channel = left + right[-p] * t
                        lsample += chnBuf[k-dly+1] * dlyAmt;

                        // Right channel = right + left[-p] * t
                        rsample += chnBuf[k-dly] * dlyAmt;
                    }

                    // Store in stereo channel buffer (needed for the delay effect)
                    chnBuf[k] = lsample | 0;
                    chnBuf[k+1] = rsample | 0;

                    // ...and add to stereo mix buffer
                    mMixBuf[k] += lsample | 0;
                    mMixBuf[k+1] += rsample | 0;
                }
            }
        }

        // Next iteration. Return progress (1.0 == done!).
        mCurrentCol++;
        return mCurrentCol / 8;
    };

    // Create a WAVE formatted Uint8Array from the generated audio data
    this.createWave = function() {
        // Create WAVE header
        var l1 = mNumWords * 2 - 8;
        var l2 = l1 - 36;
        var headerLen = 44;
        var wave = new Uint8Array(headerLen + mNumWords * 2);
        wave.set(
            [82,73,70,70,
             l1 & 255,(l1 >> 8) & 255,(l1 >> 16) & 255,(l1 >> 24) & 255,
             87,65,86,69,102,109,116,32,16,0,0,0,1,0,2,0,
             68,172,0,0,16,177,2,0,4,0,16,0,100,97,116,97,
             l2 & 255,(l2 >> 8) & 255,(l2 >> 16) & 255,(l2 >> 24) & 255]
        );

        // Append actual wave data
        for (var i = 0, idx = headerLen; i < mNumWords; ++i) {
            // Note: We clamp here
            var y = mMixBuf[i];
            y = y < -32767 ? -32767 : (y > 32767 ? 32767 : y);
            wave[idx++] = y & 255;
            wave[idx++] = (y >> 8) & 255;
        }

        // Return the WAVE formatted typed array
        return wave;
    };

    // Get n samples of wave data at time t [s]. Wave data in range [-2,2].
    this.getData = function(t, n) {
        var i = 2 * Math.floor(t * 44100);
        var d = new Array(n);
        for (var j = 0; j < 2*n; j += 1) {
            var k = i + j;
            d[j] = t > 0 && k < mMixBuf.length ? mMixBuf[k] / 32768 : 0;
        }
        return d;
    };
};