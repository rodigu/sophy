import { Canvy } from "https://deno.land/x/canvy@v0.0.3/mod.ts";
import { SophyManager } from "../../mod.ts";
import { PongPlayer } from "./player.ts";

export function Pong(cvy: Canvy) {
  cvy.width = window.innerWidth;
  cvy.height = window.innerHeight;

  const manager = new SophyManager(cvy, null, window.innerHeight / 5);
  manager.position.x = cvy.width / 2;
  manager.position.y = cvy.height / 2;

  const p1 = PongPlayer.create(manager, -1);
  PongPlayer.create(manager, 1);

  cvy.draw = () => {
    cvy.fill(0, 0, 0);
    cvy.rect(0, 0, cvy.width, cvy.height);
    manager.run();
  };

  cvy.initiate();
}
