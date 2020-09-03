import './main.scss';
import './lib/fragmentshader';
import './lib/vertexshader';
import './lib/shader';
import './lib/drawobject';
import './lib/mat4';
import './lib/objloader';
import './assets/models';
import {Game} from './engine/game';

var gl = document.getElementById('canvas').getContext('webgl');

let game = new Game(gl, 0,0);

game.start();