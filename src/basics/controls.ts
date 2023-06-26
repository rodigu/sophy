import { Entity } from "../entity/entity.ts";
import { SophyBehavior } from "../primitives.ts";

type ControlsOptions = {
  key: string;
  functionCall: () => void;
}[];

export class SophyBaseControls {
  static KeyboardControls: SophyBehavior<ControlsOptions> = {
    name: "sophy-keyboard-controls",
    addTo: (entity: Entity, options?: ControlsOptions) => {},
  };

  static ArrowMoveUpDown: SophyBehavior<{ up: number; down: number }> = {
    name: "sophy-arrow-move-up-down",
    addTo: (entity: Entity, options?: { up: number; down: number }) => {
      entity.addListener("keydown", (event: KeyboardEvent) => {
        event.key;
      });
    },
  };
}
