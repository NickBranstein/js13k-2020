(function (root, factory) {
	if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory(global);
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], function () {
			return factory(root);
		});
	} else {
		// Browser globals
		factory(root);
	}
}(this, function (root) {
	"use strict";
	var drawMethods = {};
	var rotation = 0.0;
	drawMethods.drawGrid = function (mesh) {
		var vertices = []

		var numberOfLines = 17;

		//2 represents the full lenth of the verticies coordinates
		var gridIntervalWidth = 2 / numberOfLines;
		var firstPoint = gridIntervalWidth - 1;

		//clampped at -1 .. 1
		for (var x = 1; x < numberOfLines; x++) {
			vertices.push((gridIntervalWidth * x) - 1);
			vertices.push(firstPoint);
			vertices.push(0);

			vertices.push((gridIntervalWidth * x) - 1);
			vertices.push(-(firstPoint));
			vertices.push(0);
		}


		for (var x = 1; x < numberOfLines; x++) {
			vertices.push(firstPoint);
			vertices.push((gridIntervalWidth * x) - 1);
			vertices.push(0);

			vertices.push(-(firstPoint));
			vertices.push((gridIntervalWidth * x) - 1);
			vertices.push(0);
		}

		mesh.vertices = vertices;
	}

	drawMethods.drawObject = function (gl, programInfo, model, deltaTime, drawMethod, globalProjectionMatrix) {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		//const fieldOfView = 45 * Math.PI / 180;   // in radians
		//const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		//const zNear = 0.1;
		//const zFar = 10000.0;
		////const projectionMatrix = mat4.create();

		//mat4.perspective(globalProjectionMatrix,
		//	fieldOfView,
		//	aspect,
		//	zNear,
		//	zFar
		//);
		debugger;

		const modelViewMatrix = mat4.create();

		//mat4.translate(modelViewMatrix,     // destination matrix
		//    modelViewMatrix,     // matrix to translate
		//    [-0.0, 0.0, -20.0]);  // amount to translate
		//mat4.rotate(modelViewMatrix,  // destination matrix
		//    modelViewMatrix,  // matrix to rotate
		//    rotation,     // amount to rotate in radians
		//    [0, 0, 1]);       // axis to rotate around (Z)
		//mat4.rotate(modelViewMatrix,  // destination matrix
		//    modelViewMatrix,  // matrix to rotate
		//    rotation * .7,// amount to rotate in radians
		//    [0, 1, 0]);       // axis to rotate around (X)

		//verts
		{
			const numComponents = model.vertexBuffer.itemSize;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer);
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexPosition,
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(
				programInfo.attribLocations.vertexPosition);
		}

		//normals
		if (model.normalBuffer.numItems != 0) {
			const numComponents = model.normalBuffer.itemSize;
			const type = gl.FLOAT;
			const normalize = false;
			const stride = 0;
			const offset = 0;
			gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
			gl.vertexAttribPointer(
				programInfo.attribLocations.normal,
				numComponents,
				type,
				normalize,
				stride,
				offset);
			gl.enableVertexAttribArray(
				programInfo.attribLocations.normal);
		}

		//bind faces
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);

		gl.useProgram(programInfo.program);

		gl.uniformMatrix4fv(
			programInfo.uniformLocations.projectionMatrix,
			false,
			globalProjectionMatrix);
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.modelViewMatrix,
			false,
			modelViewMatrix);

		{
			let vertexCount = 0;
			const type = gl.UNSIGNED_SHORT;
			const offset = 0;
			if (drawMethod == gl.LINES) {
				vertexCount = model.vertexBuffer.numItems;
				gl.drawArrays(gl.LINES, 0, vertexCount);
			}
			else {
				vertexCount = model.indexBuffer.numItems;
				gl.drawElements(drawMethod, vertexCount, type, offset);
			}
		}

		rotation += deltaTime;
	}

	if (root) {
		root.drawMethods = drawMethods;
	}
	return {
		drawMethods: drawMethods
	};
}));