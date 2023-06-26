import { Canvy } from "https://deno.land/x/canvy@v0.0.2/mod.ts";
import { Entity } from "./entity/entity.ts";
import { SophyBaseStates } from "./basics/states.ts";

export class SophyManager extends Entity {
  static ID = "MANAGER_ID";

  readonly canvy: Canvy;
  readonly AssetMap: unknown;

  private states: Map<string, () => void>;
  private currentState: string;

  readonly entityMap: Map<string, Entity>;

  /**
   * Creates an instance of SophyManager.
   *
   * Current state defaults to `SophyBaseStates.RunEntities`.
   * @date 6/26/2023 - 1:00:50 PM
   *
   * @constructor
   * @param canvy
   */
  constructor(canvy: Canvy, assetMap: unknown) {
    super(SophyManager.ID, 0);
    this.entityMap = new Map();

    this.canvy = canvy;
    this.AssetMap = assetMap;

    this.states = new Map();

    SophyBaseStates.RunEntities.addTo(this);
    this.currentState = SophyBaseStates.RunEntities.name;
  }

  get state() {
    return this.currentState;
  }

  setState(newState: string) {
    if (!this.states.has(newState))
      throw `State [${newState}] doesn't exist in manager`;

    this.currentState = newState;
  }

  addState(newState: string, stateFunction: () => void) {
    this.states.set(newState, stateFunction);
  }

  run() {
    this.canvy.push();

    this.applyTransformations(this.canvy);
    this.runBehaviors();
    this.states.get(this.currentState)!();

    this.canvy.pop();
  }
}
