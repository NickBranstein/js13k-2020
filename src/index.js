import './main.scss';
import gameImage from './assets/images/sprites/game-image.png';

console.log('Hello World');

const testESNext = (Math.random() > .5 ? 'ES2020Working' : null);
const testESNext2 = {
  child: {
    node: null,
  },
};

const method = () => {
  console.log('Hello Method');
}

method();

// Using an imported image
const imgEl = document.getElementById('jsImage');
const image = document.createElement('img');

image.src = gameImage;
imgEl.appendChild(image);
