import { AsciiFilter } from "@pixi/filter-ascii";
import { ColorMapFilter } from "@pixi/filter-color-map";
import { CRTFilter } from "@pixi/filter-crt";
import { DotFilter } from "@pixi/filter-dot";
import { GlitchFilter } from "@pixi/filter-glitch";
import { BlurFilter } from "@pixi/filter-blur";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import { OutlineFilter } from "@pixi/filter-outline";
import { PixelateFilter } from "@pixi/filter-pixelate";
import { RGBSplitFilter } from "@pixi/filter-rgb-split";

export class Options {
  private readonly doc;
  private readonly actualSceneRef;
  private options;
  private closeOptionsButton;
  private openOptionsButton;
  private optionsController;

  constructor(actualScene) {
    this.actualSceneRef = actualScene;

    this.doc = document;
    this.options = document.getElementById("options-tray");
    this.closeOptionsButton = document.getElementById("close-btn");
    this.openOptionsButton = document.getElementById("open-btn");

    this.optionsController = {
      squareQuantity: {
        element: document.getElementById("sqr-qtd"),
        value: 100,
      },
      shouldSquaresReturn: {
        element: {
          yes: document.getElementById("return-yes"),
          no: document.getElementById("return-no"),
        },
        value: true,
      },
      // returnSquaresTimer: {
      //     element: document.getElementById('return-timer'),
      //     value: 1,
      // },
      filter: {
        element: document.getElementById("filter-select"),
        value: [],
      },
    };

    this.doc.addEventListener("keypress", this.keyPressEvent.bind(this));

    this.clickEvents();

    this.initializeControllers();
  }

  /** Key press event */
  keyPressEvent(e: any) {
    if (e.key === "o") {
      // open/close options tray
      if (!this.openOptionsButton.classList.contains("hide-open-btn")) {
        this.openTrayFunc();
      } else {
        this.closeTrayFunc();
      }
    }
  }

  /** Open and close tray methods */

  clickEvents() {
    this.closeOptionsButton.addEventListener(
      "click",
      this.closeTrayFunc.bind(this)
    );
    this.openOptionsButton.addEventListener(
      "click",
      this.openTrayFunc.bind(this)
    );
  }

  closeTrayFunc = () => {
    this.options.classList.add("close-tray");
    this.openOptionsButton.classList.remove("hide-open-btn");
  };

  openTrayFunc = () => {
    this.options.classList.remove("close-tray");
    this.openOptionsButton.classList.add("hide-open-btn");
  };

  /** Control methods */

  initializeControllers = () => {
    // start event listeners here for the options commands

    // square quantity
    this.optionsController.squareQuantity.element.addEventListener(
      "input",
      this.changeSquareQuantity.bind(this)
    );

    // should return squares or not
    this.optionsController.shouldSquaresReturn.element.yes.addEventListener(
      "change",
      this.shouldReturnYes.bind(this)
    );
    this.optionsController.shouldSquaresReturn.element.no.addEventListener(
      "change",
      this.shouldReturnNo.bind(this)
    );

    // returnSquaresTimer
    // this.optionsController.returnSquaresTimer.element.addEventListener('input', this.setReturnTimer.bind(this));

    // Filters
    this.optionsController.filter.element.addEventListener(
      "input",
      this.selectFilter.bind(this)
    );
  };

  changeSquareQuantity = (e: any) => {
    this.optionsController.squareQuantity.value = parseInt(e.target.value);
    this.actualSceneRef.setTotalSquares(parseInt(e.target.value));
  };

  shouldReturnYes = (e: any) => {
    this.optionsController.shouldSquaresReturn.value = true;
    this.actualSceneRef.setShouldReturnToPosition(true);
  };

  shouldReturnNo = (e: any) => {
    this.optionsController.shouldSquaresReturn.value = false;
    this.actualSceneRef.setShouldReturnToPosition(false);
  };

  // setReturnTimer = (e: any) => {
  //     this.optionsController.returnSquaresTimer.valeu = parseInt(e.target.value);
  //     this.actualSceneRef.setReturnPositionTime(parseInt(e.target.value));
  // }

  selectFilter = (e: any) => {
    let filterArray = [];

    switch (e.target.value) {
      case "":
        filterArray = [];
        break;
      case "ASCII":
        filterArray = [new AsciiFilter()];
        break;
        // case 'ColorMap':
        //     filterArray = [new ColorMapFilter()];
        break;
      case "CRT":
        filterArray = [new CRTFilter()];
        break;
      case "Dot":
        filterArray = [new DotFilter()];
        break;
      case "Glitch":
        filterArray = [new GlitchFilter()];
        break;
      case "MotionBlur":
        filterArray = [new BlurFilter()];
        break;
      case "KawaseBlur":
        filterArray = [new KawaseBlurFilter()];
        break;
      case "Outline":
        filterArray = [new OutlineFilter()];
        break;
      case "Pixelate":
        filterArray = [new PixelateFilter()];
        break;
      case "RGBsplit":
        filterArray = [new RGBSplitFilter()];
        break;
      default:
        filterArray = [];
        break;
    }

    this.optionsController.filter.value = filterArray;

    this.actualSceneRef.setFilter(filterArray);
  };
}
