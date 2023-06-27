import { Entity, SophyManager } from "../../mod.ts";
import { SophyBaseControls } from "../../src/basics/controls.ts";

export class PongPlayer extends Entity {
  static Behaviors = {
    Draw: "draw-pong-player",
  };

  static speed = {
    up: -10,
    down: 10,
  };

  static p1Controls = {
    up: "w",
    down: "s",
  };

  static p2Controls = {
    up: "o",
    down: "k",
  };

  constructor(id: string, manager: SophyManager) {
    super(id, 1, manager);
  }

  static create(manager: SophyManager, options: -1 | 1) {
    const player = new PongPlayer((options + 1).toString(), manager);

    player.position.x =
      (options * manager.canvy.width) / 2 - (manager.UnitSize / 5) * options;

    player.size.height = manager.UnitSize;
    player.size.width = manager.UnitSize / 5;

    const controller = options === -1 ? "p1Controls" : "p2Controls";

    SophyBaseControls.DirectionalMovement.addTo(player, {
      up: { key: PongPlayer[controller].up, speed: PongPlayer.speed.up },
      down: { key: PongPlayer[controller].down, speed: PongPlayer.speed.down },
      left: { key: "", speed: 0 },
      right: { key: "", speed: 0 },
    });

    PongPlayer.DrawBehavior(player);

    manager.addChild(player);

    return player;
  }

  static DrawBehavior(player: PongPlayer) {
    const { canvy } = player.manager!;
    player.addBehavior(
      PongPlayer.Behaviors.Draw,
      () => {
        canvy.fill(255, 255, 255);
        canvy.rect(
          -player.size.width / 2,
          -player.size.height / 2,
          player.size.width,
          player.size.height
        );
      },
      true
    );
  }
}
