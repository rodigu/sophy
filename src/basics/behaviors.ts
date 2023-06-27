import { Entity } from "../entity/entity.ts";
import { SophyManager } from "../manager.ts";
import { SophyBehavior, throwCustomError } from "../primitives.ts";
import { VectorLike } from "../vector/vector.ts";

export class SophyBaseBehaviors {
  static Errors = {
    BehaviorRequiresManager: new Error(
      "Behavior requires entity with a manager."
    ),
  };
  static KeepWithinCanvas: SophyBehavior<VectorLike> = {
    name: "keep-entity-withing-canvas",
    addTo: (
      entity: Entity,
      doActivate = true,
      options: VectorLike = { x: 0, y: 0 }
    ) => {
      if (entity.manager === undefined)
        throwCustomError(
          SophyBaseBehaviors.Errors.BehaviorRequiresManager,
          `->KeepWithinCanvas`
        );

      const manager = entity.manager as SophyManager;
      const { canvy } = manager;

      entity.addBehavior(
        SophyBaseBehaviors.KeepWithinCanvas.name,
        () => {
          if (entity.position.x < options.x + manager.topLeft.x)
            entity.position.x = options.x + manager.topLeft.x;
          if (entity.position.y < options.y + manager.topLeft.y)
            entity.position.y = options.y + manager.topLeft.y;
          if (entity.position.x > -options.x + manager.bottomRight.x)
            entity.position.x = -options.x + manager.bottomRight.x;
          if (entity.position.y > -options.y + manager.bottomRight.y)
            entity.position.y = -options.y + manager.bottomRight.y;
        },
        doActivate
      );
    },
  };
}
