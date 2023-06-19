import { Container, Graphics, Ticker, Filter } from 'pixi.js';
import chroma from 'chroma-js';
import { RGBSplitFilter } from '@pixi/filter-rgb-split';
import { CRTFilter } from '@pixi/filter-crt';

export class Scene extends Container {
  private readonly screenWidth;
  private readonly screenHeight;

  private squares;
  private graphic;
  private colors;
  private mousePositions = [];
  private totalSquares;
  private scales: Array<Array<String>> = [];
  private actualScale;

  private sumTime;
  private lastMousePosition;
  private returnPositionTime;
  private returnToPosition;

  constructor(
    screenWidth: number,
    screenHeight: number,
    totalSquares?: number,
    returnPositionTime?: number,
    returnToPosition?: boolean
  ) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.totalSquares = totalSquares || 100;
    this.returnPositionTime = returnPositionTime || 1;
    this.returnToPosition = returnToPosition;
    this.scales = [
      ['red', 'blue', 'green'],
      ['#151D3B', '#D82148', '#6EBF8B', '#DADBBD'],
      ['#CF0A0A', '#DC5F00', '#EEEEEE'],
      ['#060047', '#B3005E', '#E90064', '#FF5F9E'],
      ['#0079FF', '#00DFA2', '#F6FA70', '#FF0060'],
      ['#EA047E', '#FF6D28', '#FCE700', '#00F5FF'],
      ['#52057B', '#892CDC', '#BC6FF1'],
      ['#2E99B0', '#FCD77F', '#FF2E4C', '#1E1548'],
      ['#00FFEB', '#FF0000', '#F0FF00', '#FF0084'],
    ];
    this.actualScale = 4;
    this.squares = [];

    this.graphic = new Graphics();

    this.calculateColors();

    // this.filters = [new RGBSplitFilter(), new CRTFilter()];

    this.addChild(this.graphic);

    this.resetMousePositions();
    this.generateSquares();
    this.drawSquares();

    this.graphic.on('pointermove', this.moveEvent.bind(this));
    this.graphic.interactive = true;

    this.sumTime = 0;
    this.lastMousePosition = { x: -100, y: -100 };
    Ticker.shared.add(this.update.bind(this));
  }

  calculateColors() {
    this.colors = chroma
      .scale(['black', ...this.scales[this.actualScale]]) // create a scale with all colors, having black as the first one
      .mode('rgb') // in RGB
      .colors(this.totalSquares)
      .map(
        (num) => parseInt(num.replace(/^#/, ''), 16) //it seems pixi doesn't like the hexa string, so we convert it
      );
  }

  resetMousePositions() {
    this.mousePositions = [...Array(this.totalSquares).keys()].map(() => ({
      x: -100,
      y: -100,
    }));
  }

  changeSquareQuantity(val) {
    this.totalSquares = val;
    this.graphic.clear();
    this.generateSquares();
    this.drawSquares();
  }

  generateSquares() {
    this.squares = [];
    const initialSquareSide = 100;

    for (let i = 0; i < this.totalSquares; i++) {
      const sizeReduced = initialSquareSide - initialSquareSide * (0.01 * i); //reduce 10% on each interation

      this.squares.push({
        x: this.mousePositions[i].x - sizeReduced / 2,
        y: this.mousePositions[i].y - sizeReduced / 2,
        width: sizeReduced,
        height: sizeReduced,
        color: this.colors[i],
      });
    }
  }

  drawSquares() {
    this.squares.forEach((square) => {
      const { x, y, width, height, color } = square;
      this.graphic.beginFill(color);
      this.graphic.drawRect(x, y, width, height);
      this.graphic.endFill();
    });
  }

  setFilter(filterArray: Array<Filter>) {
    this.filters = filterArray;
  }

  setReturnPositionTime(value: number) {
    this.returnPositionTime = value;
  }

  setTotalSquares(value: number) {
    this.totalSquares = value;
    this.resetMousePositions();
    this.calculateColors();
  }

  setShouldReturnToPosition(value: boolean) {
    this.returnToPosition = value;
  }

  moveEvent(e) {
    this.sumTime = 0;
    this.lastMousePosition = { x: e.data.global.x, y: e.data.global.y };
    this.mousePositions = [
      ...this.mousePositions,
      { x: e.data.global.x, y: e.data.global.y },
    ];
    this.mousePositions = this.mousePositions.slice(1);
    this.graphic.clear();
    this.generateSquares();
    this.drawSquares();
  }

  update(deltaTime) {
    this.sumTime += 1;
    if (this.returnToPosition && this.sumTime >= this.returnPositionTime) {
      this.mousePositions = [
        ...this.mousePositions,
        { x: this.lastMousePosition.x, y: this.lastMousePosition.y },
      ];
      this.mousePositions = this.mousePositions.slice(1);
      this.graphic.clear();
      this.generateSquares();
      this.drawSquares();
    }
  }
}
