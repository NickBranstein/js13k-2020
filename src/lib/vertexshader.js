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
const vsSource = `
    attribute vec4 Vert;
    attribute vec4 Norm;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying vec3 vColor;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * Vert;
    }
  `;

    if (root) {
        root.vsSource = vsSource;
    }
    return {
        vsSource: vsSource
    };
}));