import { Scene } from "phaser";

export enum Img {
  background = "background",
  mainRoom = "mainRoom",
  character = "character",
}

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("background", "assets/bg.png");
    this.load.image("mainRoom", "assets/mainRoom.png");
    this.load.image("character", "assets/character.png");
  }

  create() {
    this.scene.start("Preloader");
  }
}
