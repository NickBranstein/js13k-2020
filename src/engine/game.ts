import { Renderer } from './renderer';
import { ILevel } from '../levels/level';
import { TestLevel } from '../levels/testLevel';

export class Game {
    private renderer: Renderer;
    public currentLevel : ILevel;
    public levels : Array<ILevel>;

    constructor(private context: WebGLRenderingContext, private width: number, private height: number) {
        this.context.canvas.addEventListener('click', (event: MouseEvent) => {this.click(event)});
        this.renderer = new Renderer(context, (timestamp) => {this.renderWorld(timestamp);}); // wrap in a method ot preserve the reference to the class
        // setup all the levels
        this.levels = [new TestLevel(context)];

        // Start Level
        //this.currentLevel = this.levels[0];
        //this.currentLevel.start();
    }
    
    public start(){
        this.renderer.start();
    }
    
    public stop() {
        this.renderer.stop();
    }
    
    private renderWorld(timestamp): void{
        this.levels[0].render(this.context, timestamp);
    };

    private click(event: MouseEvent) : void {
        
    }
}