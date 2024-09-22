import { Scene } from "phaser";

export enum Assets {
  background = "background",
  mainRoom = "mainRoom",
  character = "character",
  loginForm = "loginForm",
  manuItems = "manuItems",
  test = "test",
}

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.setPath("assets");
  }

  create() {
    this.scene.start("Preloader");
  }
}
