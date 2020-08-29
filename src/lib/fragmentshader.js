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
const fsSource = `
    varying lowp vec3 vColor;
    void main(void) {
      gl_FragColor = vec4(vColor,1.0);
    }
  `;

    if (root) {
        root.fsSource = fsSource;
    }
    return {
        fsSource: fsSource
    };
}));