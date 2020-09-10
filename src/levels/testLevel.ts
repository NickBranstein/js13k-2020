import { ILevel } from "./level";
import * as loader from '../lib/objloader';
import * as models from '../assets/models';
import * as shader from '../lib/shader';
import * as vs from '../lib/vertexshader';
import * as fs from '../lib/fragmentshader';
import * as draw from '../lib/drawobject';
import * as mat4 from '../lib/mat4';
import { Camera } from '../engine/camera';


export class TestLevel implements ILevel {
	programInfo: any;
	mesh: any;
	lastTimestamp: any;
	camera: Camera;

	/*=================== Shaders ====================*/
	gridVertCode = `attribute vec4 Vert;
	     uniform mat4 uModelViewMatrix;
	     uniform mat4 uProjectionMatrix;
	     void main(void) {
	     gl_Position = uProjectionMatrix * uModelViewMatrix * Vert;
	 }`;

	gridFragCode =
		'void main(void) {' +
		'	gl_FragColor = vec4(1.0, 0.0, 0.0, 0.1);' +
		'}';

	constructor(ctx: WebGLRenderingContext) {

		this.camera = new Camera(ctx);

		this.lastTimestamp = 0;
		this.mesh = new loader.objLoader.Mesh("");


		// Fragment shader source code
		this.programInfo = shader.shaderMethods.InitShader(ctx, this.gridVertCode, this.gridFragCode);
		draw.drawMethods.drawGrid(this.mesh);

		//loader.objLoader.initMeshBuffers(ctx, this.example);
		loader.objLoader.initMeshBuffers(ctx, this.mesh);
		//shader progamInfo for test model


	}

	start(): void {

	}

	end: () => void;

	render(context: WebGLRenderingContext, timestamp: any): void {
		timestamp *= 0.001
		const deltaTime = timestamp - this.lastTimestamp;
		this.lastTimestamp = timestamp;
		draw.drawMethods.drawObject(context, this.programInfo, this.mesh, deltaTime, context.LINES, this.camera.globalProjectionMatrix);
	}

}