import { Scene } from "./Scene";
import { Application } from "pixi.js";
import { Options } from "./Options";

const app = new Application({
  view: document.getElementById("canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  resizeTo: window,
  autoDensity: true,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
});

const scene = new Scene(app.screen.width, app.screen.height, 100, 1, true);

const options = new Options(scene);

app.stage.addChild(scene);
