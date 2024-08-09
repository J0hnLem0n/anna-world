import { Scene } from "phaser";

export enum Assets {
  background = "background",
  mainRoom = "mainRoom",
  character = "character",
  loginForm = "loginForm",
}

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image(Assets.background, "assets/bg.png");
    this.load.image(Assets.mainRoom, "assets/mainRoom.png");
    this.load.image(Assets.character, "assets/character.png");
    this.load.html(Assets.loginForm, "assets/login.html");
  }

  create() {
    this.scene.start("Preloader");
  }
}
