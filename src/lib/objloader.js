(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory(global);
	} else if (typeof define === 'function' && define.amd) {
		define([], function () {
			return factory(root);
		});
	} else {
		factory(root);
	}
}(this, function (root) {
	"use strict";
	var objLoader = {};

	objLoader.initMeshBuffers = function (gl, mesh) {
		mesh.normalBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertexNormals, 3);
		mesh.vertexBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertices, 3);
		mesh.indexBuffer = _buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indices, 1);
	}

	function _buildBuffer(gl, type, data, itemSize) {
		var buffer = gl.createBuffer();
		var arrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
		gl.bindBuffer(type, buffer);
		gl.bufferData(type, new arrayView(data), gl.STATIC_DRAW);
		buffer.itemSize = itemSize;
		buffer.numItems = data.length / itemSize;
		return buffer;
	};

	objLoader.Mesh = class Mesh {
		constructor(objectData, options) {
			options = options || {};
			
			let currentMaterialIndex = -1;
			let currentObjectByMaterialIndex = 0;

			let self = this;
			self.vertices = [];
			self.vertexNormals = [];
			self.indices = [];

			this.name = "";
			const verts = [];
			const vertNormals = [];
			const unpacked = {};
			unpacked.verts = [];
			unpacked.norms = [];
			unpacked.hashindices = {};
			unpacked.indices = [[]];
			unpacked.index = 0;
			debugger;

			const VERTEX_RE = /^v\s/;
			const NORMAL_RE = /^vn\s/;
			const FACE_RE = /^f\s/;
			const WHITESPACE_RE = /\s+/;

			const lines = objectData.split("\n");

			for (let i = 0; i < lines.length; i++) {
				const line = lines[i].trim();
				if (!line || line.startsWith("#")) {
					continue;
				}
				const elements = line.split(WHITESPACE_RE);
				elements.shift();

				if (VERTEX_RE.test(line)) {
					verts.push(...elements);
				} else if (NORMAL_RE.test(line)) {
					vertNormals.push(...elements);
				} 
					else if (FACE_RE.test(line)) {
					let quad = false;
					for (let j = 0, eleLen = elements.length; j < eleLen; j++) {
						if (j === 3 && !quad) {
							j = 2;
							quad = true;
						}
						const hash0 = elements[0] + "," + currentMaterialIndex;
						const hash = elements[j] + "," + currentMaterialIndex;
						if (hash in unpacked.hashindices) {
							unpacked.indices[currentObjectByMaterialIndex].push(unpacked.hashindices[hash]);
						} else {
							let vertex = elements[j].split("/");
							
							let normalIndex = vertex.length - 1;
							
							unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 0]);
							unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 1]);
							unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 2]);
							unpacked.norms.push(+vertNormals[(vertex[normalIndex] - 1) * 3 + 0]);
							unpacked.norms.push(+vertNormals[(vertex[normalIndex] - 1) * 3 + 1]);
							unpacked.norms.push(+vertNormals[(vertex[normalIndex] - 1) * 3 + 2]);
							unpacked.hashindices[hash] = unpacked.index;
							unpacked.indices[currentObjectByMaterialIndex].push(unpacked.hashindices[hash]);
							unpacked.index += 1;
						}
						if (j === 3 && quad) {
							unpacked.indices[currentObjectByMaterialIndex].push(unpacked.hashindices[hash0]);
						}
					}
				}
			}
			self.vertices = unpacked.verts;
			self.vertexNormals = unpacked.norms;
			self.vertexMaterialIndices = unpacked.materialIndices;
			self.indices = options.indicesPerMaterial ? unpacked.indices : unpacked.indices[currentObjectByMaterialIndex];
		}
		makeIndexBufferData() {
			const buffer = new Uint16Array(this.indices);
			buffer.numItems = this.indices.length;
			return buffer;
		}
	}
	if (root) {
		root.objLoader = objLoader;
	}
	return {
		objLoader: objLoader
	};
}));