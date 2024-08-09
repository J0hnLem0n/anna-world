import { Scene, GameObjects } from "phaser";
import axios from "axios";

const apiHost = `http://localhost:8080`;

const api = axios.create({
  baseURL: apiHost,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;

  constructor() {
    super("MainMenu");
  }

  async create() {
    await api.post("/sign/anna");
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
