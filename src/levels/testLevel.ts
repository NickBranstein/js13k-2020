import { ILevel } from "./level";
import * as loader from '../lib/objloader';
import * as models from '../assets/models';
import * as shader from '../lib/shader';
import * as vs from '../lib/vertexshader';
import * as fs from '../lib/fragmentshader';
import * as draw from '../lib/drawobject';

export class TestLevel implements ILevel {
    programInfo: any;
    example: any;
    lastTimestamp: any;

    constructor(ctx: WebGLRenderingContext) {
        this.lastTimestamp = 0;
        this.example = new loader.objLoader.Mesh(models.server);
        loader.objLoader.initMeshBuffers(ctx, this.example);

        //shader progamInfo for test model
        this.programInfo = shader.shaderMethods.InitShader(ctx, vs.vsSource, fs.fsSource);
    }

    start(): void {

    }

    end: () => void;


    render(context: WebGLRenderingContext, timestamp: any): void {
        timestamp *= 0.001
        const deltaTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;
        draw.drawMethods.drawObject(context, this.programInfo, this.example, deltaTime);
        
    }

}