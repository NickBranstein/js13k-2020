import * as mat4 from '../lib/mat4';

export class Camera {
	public globalProjectionMatrix;

	constructor(ctx: WebGLRenderingContext) {
		this.globalProjectionMatrix = mat4.mat4.create();

		const fieldOfView = 45 * Math.PI / 180;   // in radians
		const aspect = ctx.canvas.width / ctx.canvas.height;
		const zNear = 0.1;
		const zFar = 10000.0;

		mat4.mat4.perspective(this.globalProjectionMatrix,
			fieldOfView,
			aspect,
			zNear,
			zFar
		);

		mat4.mat4.translate(this.globalProjectionMatrix,     // destination matrix
			this.globalProjectionMatrix,     // matrix to translate
			[0.2, 0.0, -3.0]);
	}
}