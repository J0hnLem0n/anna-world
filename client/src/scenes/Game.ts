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
    const widthToCenenter = this.cameras.main.width / 2;
    const heightToCenter = this.cameras.main.height / 2;

    const character = this.add
      .image(widthToCenenter, heightToCenter, Img.character)
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
    let itemsContainer: Phaser.GameObjects.Container;

    container.on("pointerdown", function (pointer, gameObject) {
      let instanceDrag: Phaser.GameObjects.Image | undefined = undefined;
      const tables = new Array(4).fill(null).map(() => {
        const a = self.add
          .image(-250, -1250, Img.test)
          .setDisplaySize(100, 100)
          .setOrigin(0)
          .setInteractive({ draggable: true })
          .on("dragstart", function (pointer) {
            instanceDrag = self.add
              .image(pointer.x, pointer.y, Img.test)
              .setInteractive({ draggable: true })
              .on("drag", function (pointer) {
                const s = this;
                s.setPosition(pointer.x, pointer.y);
              });
          })
          .on("drag", function (pointer, dragX, dragY) {
            instanceDrag && instanceDrag.setPosition(pointer.x, pointer.y);
          });
        return a;
      });
      const menuSliceXPos = self.cameras.main.width - 380;
      panel = self.add
        .nineslice(
          menuSliceXPos,
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
      const itemSize = 100;
      const itemWidth = 2;
      const containerPaddingTop = 100;
      const allItemsHeight = tables.reduce((acc, i) => {
        acc = itemSize + acc;
        return acc;
      }, 0);
      const containerWidth = 300;
      const containerHeight = allItemsHeight / itemWidth;
      const containerXPos = self.cameras.main.width - 170;
      const containerYPos = containerHeight / 2 + containerPaddingTop;

      itemsContainer = self.add
        .container(containerXPos, containerYPos, tables)
        .setSize(containerWidth, containerHeight)
        .setInteractive({ draggable: true })
        .on("drag", (point, dragX, dragY) => {
          itemsContainer.setPosition(itemsContainer.x, dragY);
        });

      const graphics = self.make.graphics();

      graphics.fillStyle(0xfffff1);
      graphics.fillRect(menuSliceXPos, containerPaddingTop, 1000, 400);
      const mask = new Phaser.Display.Masks.GeometryMask(self, graphics);
      itemsContainer.mask = mask;

      // self.input.enableDebug(itemsContainer);
      new Phaser.Display.Masks.BitmapMask(self, itemsContainer);
      Phaser.Actions.GridAlign(itemsContainer.getAll(), {
        width: itemWidth,
        cellWidth: itemSize,
        cellHeight: itemSize,
        x: -containerWidth / 2,
        y: -containerYPos + containerPaddingTop,
      });
    });
    this.input.on("pointerdown", function (pointer, gameObject) {
      if (!gameObject.length) {
        panel && panel.destroy();
        itemsContainer && itemsContainer.destroy();
      }
      console.log(gameObject);
    });
  }
}
