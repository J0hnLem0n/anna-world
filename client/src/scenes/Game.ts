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
      .setInteractive({ draggable: true })
      .on("drag", function (pointer, dragX, dragY) {
        character.setPosition(dragX, dragY);
      })
      .on("dragend", function (pointer, gameObject) {
        // character.clearTint();
      });

    character.setScale(0.3);
    character.setX(100);
    character.setY(this.cameras.main.height - character.displayHeight);

    let panel: Phaser.GameObjects.NineSlice;

    container.on("pointerdown", function (pointer, gameObject) {
      // const n1 = self.add.image(0, 0, Img.test).setScale(0.1).setOrigin(0);
      // const n2 = self.add.image(0, 0, Img.test).setScale(0.1).setOrigin(0);
      // const n3 = self.add.image(0, 0, Img.test).setScale(0.1).setOrigin(0);

      const tables = new Array(50).fill(null).map(() => {
        const a = self.add
          .image(0, 0, Img.test)
          .setScale(0.1)
          .setOrigin(0)
          .setInteractive({ draggable: true })
          .on("drag", function (pointer, dragX, dragY) {
            a.setPosition(dragX, dragY);
          });
        return a;
      });

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
        .setOrigin(0)
        .setInteractive();
      self.tweens.add({
        targets: panel,
        height: 600,
        duration: 500,
        ease: "sine.inout",
      });
      const s = tables.reduce((acc, i) => {
        acc = 100 + acc;
        return acc;
      }, 0);
      const c = self.add
        .container(self.cameras.main.width - 380 + 100, 50, tables)
        .setSize(500, 2500)
        .setInteractive({ draggable: true })
        .on("drag", (point, dragX, dragY) => {
          c.setPosition(c.x, dragY);
          console.log(point);
        });
      console.log(c);
      self.input.enableDebug(c);
      // Phaser.Actions.GridAlign(c.getAll(), {
      //   width: 2,
      //   cellWidth: 100,
      //   cellHeight: 100,
      // });
      // Phaser.Actions.GridAlign([n1, n2], {
      //   width: 400,
      //   height: 200,
      //   cellWidth: 150,
      //   cellHeight: 200,
      //   x: 100,
      //   y: self.cameras.main.width - 275,
      // });
    });

    // const { width, height } = container.getBounds();
    // container.setSize(width, height);

    this.input.on("pointerdown", function (pointer, gameObject) {
      if (!gameObject.length) panel.destroy();
      console.log(gameObject);
    });
  }
}
