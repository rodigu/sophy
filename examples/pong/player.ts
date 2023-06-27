import { Entity, SophyManager } from "../../mod.ts";
import { SophyBaseBehaviors } from "../../src/basics/behaviors.ts";
import { SophyBaseControls } from "../../src/basics/controls.ts";
import { Collider } from "../../src/collisions/collider.ts";

export class PongPlayer extends Entity {
  static Behaviors = {
    Draw: "draw-pong-player",
  };

  static speed = {
    up: -20,
    down: 20,
  };

  static p1Controls = {
    up: "w",
    down: "s",
  };

  static p2Controls = {
    up: "o",
    down: "k",
  };

  readonly manager: SophyManager;

  static Instances: PongPlayer[] = [];

  constructor(id: string, manager: SophyManager) {
    super(id, 1, manager);
    this.manager = manager;
    PongPlayer.Instances.push(this);
    PongPlayer.speed = {
      up: -manager.UnitSize / 8,
      down: manager.UnitSize / 8,
    };
  }

  static create(manager: SophyManager, options: -1 | 1) {
    const player = new PongPlayer((options + 1).toString(), manager);

    player.position.x =
      (options * manager.canvy.width) / 2 - (manager.UnitSize / 5) * options;

    player.size.height = manager.UnitSize;
    player.size.width = manager.UnitSize / 5;

    const controller = options === -1 ? "p1Controls" : "p2Controls";

    SophyBaseControls.DirectionalMovement.addTo(player, true, {
      up: { key: PongPlayer[controller].up, speed: PongPlayer.speed.up },
      down: { key: PongPlayer[controller].down, speed: PongPlayer.speed.down },
      left: { key: "", speed: 0 },
      right: { key: "", speed: 0 },
    });

    SophyBaseBehaviors.KeepWithinCanvas.addTo(player, true, {
      x: player.size.width / 2,
      y: player.size.height / 2,
    });

    PongPlayer.DrawBehavior(player);
    PongPlayer.AddCollider(player);

    manager.addChild(player);

    return player;
  }

  static AddCollider(player: PongPlayer) {
    player.setCollider(
      new Collider(
        {
          x: -player.size.width / 2,
          y: -player.size.height / 2,
        },
        {
          x: player.size.width / 2,
          y: player.size.height / 2,
        },
        player.position
      )
    );
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
