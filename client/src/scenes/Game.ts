import { Scene } from "phaser";
import { Assets, Assets as Img } from "./Boot";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  create() {
    const self = this;
    this.camera = this.cameras.main;

    const mainRoom = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      Img.mainRoom
    );

    const circle = this.add.circle(0, 0, 30, 0xa60e1a, 0.1);
    var textConfig = { fontSize: "40px", color: "white", fontFamily: "Arial" };
    const Text = this.add.text(-10, -20, "+", textConfig);
    const container = this.add
      .container(this.cameras.main.width - 60, 60, [circle, Text])
      .setSize(circle.width, circle.height)
      .setInteractive();

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

    character.setScale(0.3);
    character.setX(100);
    character.setY(this.cameras.main.height - character.displayHeight);

    let panel: Phaser.GameObjects.NineSlice;

    container.on("pointerdown", function (pointer, gameObject) {
      panel = self.add
        .nineslice(
          self.cameras.main.width - 380,
          0,
          Assets.manuItems,
          "PopupBackground400",
          400,
          275,
          160,
          160,
          100,
          100
        )
        .setOrigin(0, 0)
        .setInteractive();
      self.tweens.add({
        targets: panel,
        height: 600,
        duration: 500,
        ease: "sine.inout",
      });
    });

    this.input.setDraggable(character);
    this.input.on("dragstart", function (pointer, gameObject) {});
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on("dragend", function (pointer, gameObject) {
      gameObject.clearTint();
    });

    this.input.on("pointerdown", function (pointer, gameObject) {
      if (!gameObject.length) panel.destroy();
      console.log(gameObject);
    });
  }
}
