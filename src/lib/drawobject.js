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
    drawMethods.drawGrid = function (gl) {
        var vertices = []

        var numberOfLines = 17;

        //2 represents the full lenth of the verticies coordinates
        var gridIntervalWidth = 2 / numberOfLines;
        var firstPoint = gridIntervalWidth - 1;

        //clampped at -1 .. 1
        for (var x = 1; x <= numberOfLines; x++) {
            vertices.push((gridIntervalWidth * x) - 1);
            vertices.push(firstPoint);
            vertices.push(0);

            vertices.push((gridIntervalWidth * x) - 1);
            vertices.push(-(firstPoint));
            vertices.push(0);
        }


        for (var x = 1; x <= numberOfLines; x++) {
            vertices.push(firstPoint);
            vertices.push((gridIntervalWidth * x) - 1);
            vertices.push(0);

            vertices.push(-(firstPoint));
            vertices.push((gridIntervalWidth * x) - 1);
            vertices.push(0);
		}


        debugger;

        //// Create an empty buffer object
        //var vertex_buffer = gl.createBuffer();

        //// Bind appropriate array buffer to it
        //gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

        //// Pass the vertex data to the buffer
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        //// Unbind the buffer
        //gl.bindBuffer(gl.ARRAY_BUFFER, null);

        /*=================== Shaders ====================*/

        // Vertex shader source code
        var vertCode =
            'attribute vec3 coordinates;' +
            'void main(void) {' +
            ' gl_Position = vec4(coordinates, 1.0);' +
            '}';

        // Create a vertex shader object
        //var vertShader = gl.createShader(gl.VERTEX_SHADER);

        //// Attach vertex shader source code
        //gl.shaderSource(vertShader, vertCode);

        //// Compile the vertex shader
        //gl.compileShader(vertShader);

        // Fragment shader source code
        var fragCode =
            'void main(void) {' +
            'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
            '}';

        // Create fragment shader object
        //var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

        //// Attach fragment shader source code
        //gl.shaderSource(fragShader, fragCode);

        //// Compile the fragmentt shader
        //gl.compileShader(fragShader);

        //// Create a shader program object to store
        //// the combined shader program
        //var shaderProgram = gl.createProgram();

        //// Attach a vertex shader
        //gl.attachShader(shaderProgram, vertShader);

        //// Attach a fragment shader
        //gl.attachShader(shaderProgram, fragShader);

        //// Link both the programs
        //gl.linkProgram(shaderProgram);

        //// Use the combined shader program object
        //gl.useProgram(shaderProgram);

        ///*======= Associating shaders to buffer objects ======*/

        //// Bind vertex buffer object
        //gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

        //// Get the attribute location
        //var coord = gl.getAttribLocation(shaderProgram, "coordinates");

        //// Point an attribute to the currently bound VBO
        //gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

        //// Enable the attribute
        //gl.enableVertexAttribArray(coord);

        ///*============ Drawing the triangle =============*/

        //// Clear the canvas
        //gl.clearColor(0.5, 0.5, 0.5, 0.9);

        //// Enable the depth test
        //gl.enable(gl.DEPTH_TEST);

        //// Clear the color and depth buffer
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //// Set the view port
        //gl.viewport(0, 0, canvas.width, canvas.height);

        //gl.drawArrays(gl.LINES, 0, numberOfLines * 4);
	}

    drawMethods.drawObject = function (gl, programInfo, model, deltaTime) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const fieldOfView = 45 * Math.PI / 180;   // in radians
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 10000.0;
        const projectionMatrix = mat4.create();

        mat4.perspective(projectionMatrix,
            fieldOfView,
            aspect,
            zNear,
            zFar
        );

        const modelViewMatrix = mat4.create();

        mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [-0.0, 0.0, -20.0]);  // amount to translate
        mat4.rotate(modelViewMatrix,  // destination matrix
            modelViewMatrix,  // matrix to rotate
            rotation,     // amount to rotate in radians
            [0, 0, 1]);       // axis to rotate around (Z)
        mat4.rotate(modelViewMatrix,  // destination matrix
            modelViewMatrix,  // matrix to rotate
            rotation * .7,// amount to rotate in radians
            [0, 1, 0]);       // axis to rotate around (X)

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
        {
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
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        {
            const vertexCount = model.indexBuffer.numItems;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
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