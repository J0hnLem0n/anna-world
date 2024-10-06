import { Scene } from "phaser";
import { Assets } from "./Boot";
import axios from "axios";

export const apiUrl = import.meta.env.API_URL;
const Api = axios.create({ baseURL: apiUrl });

type Items = { id: number; image: string }[];

const getItems = () =>
  new Promise<Items>(async (res, rej) => {
    try {
      const r: Items = await Api.get("/items");
      res(r);
    } catch {
      rej("axios error");
    }
  });

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
    this.items = [];
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    getItems().then((r) => {
      r?.data.forEach((e) => {
        this.items.push(e);
        this.load.image(e.id.toString(), e.image);
      });
    });

    this.load.image(Assets.test, [`${apiUrl}/public/table.png`]);

    this.load.image(Assets.background, "assets/bg.png");
    this.load.image(Assets.mainRoom, "assets/mainRoom.png");
    this.load.image(Assets.character, "assets/character.png");
    this.load.atlas(
      Assets.manuItems,
      "assets/nine-slice.png",
      "assets/nine-slice.json"
    );
    this.load.html(Assets.loginForm, "assets/login.html");
    this.load.html(Assets.loginForm, "assets/login.html");
    this.load.html(Assets.loginForm, "assets/login.html");
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("Game", this.items);
  }
}
