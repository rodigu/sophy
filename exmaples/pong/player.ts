import { Entity } from "../../mod.ts";

export class Player extends Entity {
  static Instances: Map<string, Entity>;
}
