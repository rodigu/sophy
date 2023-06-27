import { Entity, SophyManager, Vector } from "../../mod.ts";
import { Collider } from "../../src/collisions/collider.ts";
import { SophyHelpers } from "../../src/sophy.ts";
import { PongPlayer } from "./player.ts";

export class PongBall extends Entity {
  static Behaviors = {
    Move: "move-ball",
    Draw: "draw-ball",
    Bound: "bound-ball",
  };

  static Events = {
    CollisionWithPlayer: "ball-collides-with-player",
  };

  readonly manager: SophyManager;

  private speed: Vector;

  static Instances: PongBall[] = [];

  constructor(manager: SophyManager) {
    super("ball", 1);
    this.manager = manager;
    this.speed = Vector.random(9);

    this.size.width = manager.UnitSize / 5;
    this.size.height = manager.UnitSize / 5;

    PongBall.Instances.push(this);
  }

  static MoveBehavior(ball: PongBall) {
    ball.addBehavior(
      PongBall.Behaviors.Move,
      () => {
        ball.position.add(ball.speed);
      },
      true
    );
  }

  static DrawBehavior(ball: PongBall) {
    ball.addBehavior(
      PongBall.Behaviors.Draw,
      () => {
        ball.manager.canvy.fill(255, 255, 255);
        ball.manager.canvy.rect(
          -ball.size.width / 2,
          -ball.size.width / 2,
          ball.size.width,
          ball.size.height
        );
      },
      true
    );
  }

  static BoundaryBounce(ball: PongBall) {
    ball.addBehavior(
      PongBall.Behaviors.Bound,
      () => {
        if (ball.position.y < ball.manager.topLeft.y + ball.size.height)
          ball.speed.y = -ball.speed.y;
        else if (
          ball.position.y >
          ball.manager.bottomRight.y - ball.size.height
        )
          ball.speed.y = -ball.speed.y;
      },
      true
    );
  }

  static PlayerCollisionEmit(ball: PongBall) {
    ball.setCollider(Collider.defaultCollider(ball));

    for (const instance of PongPlayer.Instances) {
      ball.manager.addCollisionToMapping(ball, instance, {
        name: PongBall.Events.CollisionWithPlayer,
        options: {},
      });
    }
  }

  static PlayerCollisionListen(ball: PongBall) {
    ball.addListener(PongBall.Events.CollisionWithPlayer, () => {
      ball.speed.x = -ball.speed.x;
      ball.speed.mult(SophyHelpers.random(0.9, 1.2));
      if (
        ball.manager.isKeyPressed(PongPlayer.p1Controls.up) ||
        ball.manager.isKeyPressed(PongPlayer.p2Controls.up)
      ) {
        if (ball.speed.y > 0) {
          ball.speed.y *= -1;
          ball.speed.mult(SophyHelpers.random(0.9, 1.2));
          ball.speed.x += SophyHelpers.random(0, 0.5) * Math.sign(ball.speed.x);
        } else ball.speed.mult(SophyHelpers.random(0.8, 1.1));
        ball.speed.y += SophyHelpers.random(-0.5, -0.1);
      } else if (
        ball.manager.isKeyPressed(PongPlayer.p1Controls.down) ||
        ball.manager.isKeyPressed(PongPlayer.p2Controls.down)
      ) {
        if (ball.speed.y < 0) {
          ball.speed.y *= -1;
          ball.speed.mult(SophyHelpers.random(0.9, 1.2));
          ball.speed.x += SophyHelpers.random(0, 0.5) * Math.sign(ball.speed.x);
        } else ball.speed.mult(SophyHelpers.random(0.8, 1.1));
        ball.speed.y += SophyHelpers.random(0.1, 0.5);
      }

      ball.position.add(ball.speed);
    });
  }

  static create(manager: SophyManager) {
    const ball = new PongBall(manager);

    PongBall.DrawBehavior(ball);
    PongBall.MoveBehavior(ball);
    PongBall.BoundaryBounce(ball);
    PongBall.PlayerCollisionEmit(ball);
    PongBall.PlayerCollisionListen(ball);

    manager.addChild(ball);

    return ball;
  }
}
