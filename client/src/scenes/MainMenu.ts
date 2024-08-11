import { Scene, GameObjects } from "phaser";
import axios from "axios";
import { apiHost, Assets } from "./Boot";

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
    const self = this;

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
    const element = this.add
      .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
      .createFromCache(Assets.loginForm);
    element.addListener("click");
    element.on(
      "click",
      async function (
        event: Event & {
          target: HTMLButtonElement;
        }
      ) {
        if (event.target && event.target.name === "playButton") {
          try {
            const login = this.getChildByName("login").value;
            const password = this.getChildByName("password").value;
            await api.post("/sign", {
              login,
              password,
            });
            self.scene.start("Game");
          } catch (e) {
            console.log(e);
          }
        }
      }
    );
  }
}
