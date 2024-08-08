import { Scene } from "phaser";
import { Img } from "./Boot";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  create() {
    this.camera = this.cameras.main;

    const mainRoom = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      Img.mainRoom
    );

    let scaleX = this.cameras.main.width / mainRoom.width;
    let scaleY = this.cameras.main.height / mainRoom.height;
    let scale = Math.max(scaleX, scaleY);
    mainRoom.setScale(scale).setScrollFactor(0);

    const character = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        Img.character
      )
      .setInteractive({ draggable: true });

    character.setScale(0.2);
    character.setX(100);
    character.setY(this.cameras.main.height - character.displayHeight);

    this.input.setDraggable(character);
    this.input.on("dragstart", function (pointer, gameObject) {
      // gameObject.setTint(0xff0000);
    });
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on("dragend", function (pointer, gameObject) {
      gameObject.clearTint();
    });
  }
}
