import { Entity } from "../entity/entity.ts";
import { SophyBehavior, throwCustomError } from "../primitives.ts";
import { ControlsOptions, SophyDirectionalControlsOptions } from "./types.ts";

export class SophyBaseControls {
  static Errors = {
    RequiresOptions: new Error(
      "Controller behavior function requires options."
    ),
  };

  static KeyboardControls: SophyBehavior<ControlsOptions> = {
    name: "sophy-keyboard-controls",
    addTo: (entity: Entity, options?: ControlsOptions) => {},
  };

  static DirectionalMovement: SophyBehavior<SophyDirectionalControlsOptions> = {
    name: "sophy-directional-movement",
    addTo: (entity: Entity, options?: SophyDirectionalControlsOptions) => {
      if (options === undefined) {
        throwCustomError(
          SophyBaseControls.Errors.RequiresOptions,
          `Directional movement behavior.`
        );
      }

      entity.addBehavior(
        SophyBaseControls.DirectionalMovement.name,
        () => {
          for (let key of ["up", "down", "left", "right"] as (
            | "up"
            | "down"
            | "left"
            | "right"
          )[]) {
            if (entity.manager?.isKeyPressed(options![key].key)) {
              const positionCoord = key === "up" || key === "down" ? "y" : "x";
              key = key as "up" | "down" | "left" | "right";
              entity.position[positionCoord] += options![key].speed;
            }
          }
        },
        true
      );
    },
  };
}
