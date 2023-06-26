import { SophyManager } from "../manager.ts";
import { SophyManagerState } from "../primitives.ts";

export class SophyBaseStates {
  static RunEntities: SophyManagerState = {
    name: "run-entities-base-state",
    addTo: (manager: SophyManager) => {
      manager.addState(SophyBaseStates.RunEntities.name, () => {
        manager.runChildren(manager.canvy);
      });
    },
  };
}
