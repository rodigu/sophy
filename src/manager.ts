import { Canvy } from "https://deno.land/x/canvy@v0.0.2/mod.ts";
import { Entity } from "./entity/entity.ts";

export class SophyManager extends Entity {
  static ID = "MANAGER_ID";

  readonly entityMap: Map<string, Entity>;

  constructor() {
    super(SophyManager.ID, 0);
    this.entityMap = new Map();
  }

  run(canvy: Canvy) {
    canvy.push();

    this.applyTransformations(canvy);
    this.runBehaviors();
    this.runChildren(canvy);

    canvy.pop();
  }
}
