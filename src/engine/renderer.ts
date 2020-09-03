
export interface IRender {
    render(context: WebGLRenderingContext, elapsedTime): void;
}

export class Renderer {
    private animationFrame: number;
    private running: boolean;

    constructor(private context: WebGLRenderingContext, public render: (elapsedTime) => void) {
    }

    public start(): any {
        this.running = true;
        this.animationFrame = window.requestAnimationFrame((timestamp) => this.renderLoop(timestamp));
    }

    public renderLoop(timestamp) {
        if (this.running) {
            this.render(timestamp);
            window.requestAnimationFrame((time) => this.renderLoop(time));
        }
    }

    public stop() {
        window.cancelAnimationFrame(this.animationFrame);
        this.running = false;
    }
}