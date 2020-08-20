import './main.scss';
import './fragmentshader';
import './vertexshader';
import './shader';
import './drawobject';
import './mat4';
import './objloader';
var gl = document.getElementById('canvas').getContext('webgl');

var objStr = document.getElementById('testDrone').innerHTML;
var drone = new objLoader.Mesh(objStr);
objLoader.initMeshBuffers(gl, drone);

//shader progamInfo for test model
var programInfo = shaderMethods.InitShader(gl, vsSource, fsSource);

//render loop
var oldTimestamp = 0;
function render(timestamp) {
    timestamp *= 0.001;  // convert to seconds
    const deltaTime = timestamp - oldTimestamp;
    oldTimestamp = timestamp;
    drawMethods.drawObject(gl, programInfo, drone, deltaTime);
    requestAnimationFrame(render);
} 

//render Start
window.onload = function () {
    requestAnimationFrame(render);
}