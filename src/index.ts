import { Scene } from './Scene';
import { Application } from 'pixi.js';

const app = new Application({
    view: document.getElementById('canvas') as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000
})


const scene = new Scene(app.screen.width, app.screen.height, 100, 1, true);

// document.getElementById('sqr-qtd').addEventListener('input',(e: any) => {
//     scene.changeSquareQuantity(e.target.value);
// });

// document.getElementById('close-btn').addEventListener('click',(e: any) => {
//     document.getElementsByClassName('options')[0].classList.add('close-tray');
//     document.getElementById('open-btn').classList.remove('hide-open-btn');
// });

// document.getElementById('open-btn').addEventListener('click',(e: any) => {
//     document.getElementsByClassName('options')[0].classList.remove('close-tray');
//     document.getElementById('open-btn').classList.add('hide-open-btn');
// });

// document.getElementById('return-yes').addEventListener('change', (e: any) => {
//     console.log(e.target.value);
// });

// document.getElementById('return-no').addEventListener('change', (e: any) => {
//     console.log(e.target.value);
// });

app.stage.addChild(scene);