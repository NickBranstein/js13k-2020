import './main.scss';
import './lib/mat4';
import {Game} from './engine/game';

var gl = document.getElementById('canvas').getContext('webgl');

let game = new Game(gl, 0,0);

game.start();
