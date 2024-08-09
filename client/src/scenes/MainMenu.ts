import { Scene, GameObjects } from "phaser";
import axios from "axios";

const apiUrl = `http://localhost:8080`;

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;

  constructor() {
    super("MainMenu");
  }

  create() {
    axios.get(apiUrl);
    this.background = this.add.image(512, 384, "background");

    this.title = this.add
      .text(512, 460, `Anna's world`, {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
