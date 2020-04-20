import Sprite from './sprite.js';

const canvas = document.getElementById('canvas');
const { width, height } = canvas;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'orange';
ctx.fillRect(0, 0, width, height);

const spriteInstance = new Sprite(ctx);
