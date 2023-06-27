import { Canvy } from "https://deno.land/x/canvy@v0.0.3/mod.ts";
import { Entity } from "./entity/entity.ts";
import { SophyBaseStates } from "./basics/states.ts";

export class SophyManager extends Entity {
  static ID = "MANAGER_ID";

  readonly canvy: Canvy;
  readonly AssetMap: unknown;

  private keySet: Set<string>;
  private states: Map<string, () => void>;
  private currentState: string;
  private events: Map<string, { options: unknown; hasCycled: boolean }>;
  private entityEventListeners: Map<string, Entity[]>;

  readonly entityMap: Map<string, Entity>;

  private _UnitSize: number;
  private _UnitSqrt: number;

  /**
   * Creates an instance of SophyManager.
   *
   * Current state defaults to `SophyBaseStates.RunEntities`.
   * @date 6/26/2023 - 1:00:50 PM
   *
   * @constructor
   * @param canvy
   */
  constructor(canvy: Canvy, assetMap: unknown, unitSize: number) {
    super(SophyManager.ID, 0);
    this.entityMap = new Map();

    this.canvy = canvy;
    this.AssetMap = assetMap;
    this.events = new Map();
    this.entityEventListeners = new Map();

    this.keySet = new Set();

    addEventListener("keydown", (event: KeyboardEvent) => {
      this.keySet.add(event.key);
    });

    addEventListener("keyup", (event: KeyboardEvent) => {
      this.keySet.delete(event.key);
    });

    this.states = new Map();

    SophyBaseStates.RunEntities.addTo(this);
    this.currentState = SophyBaseStates.RunEntities.name;

    this.position.x = canvy.width / 2;
    this.position.y = canvy.height / 2;

    this._UnitSize = unitSize;
    this._UnitSqrt = Math.sqrt(unitSize);
  }

  get UnitSize() {
    return this._UnitSize;
  }

  set UnitSize(newSize: number) {
    this._UnitSize = newSize;
    this._UnitSqrt = Math.sqrt(newSize);
  }

  get UnitSqrt() {
    return this._UnitSqrt;
  }

  get state() {
    return this.currentState;
  }

  isKeyPressed(key: string) {
    return this.keySet.has(key);
  }

  entityListensTo(eventName: string, listener: Entity): void {
    if (!this.entityEventListeners.has(eventName))
      this.entityEventListeners.set(eventName, []);

    this.entityEventListeners.get(eventName)!.push(listener);
  }

  emitEvent(eventName: string, options: unknown): void {
    this.events.set(eventName, { options, hasCycled: false });
  }

  setState(newState: string) {
    if (!this.states.has(newState))
      throw new Error(`State [${newState}] doesn't exist in manager`);

    this.currentState = newState;
  }

  addState(newState: string, stateFunction: () => void) {
    this.states.set(newState, stateFunction);
  }

  private runEvents() {
    this.events.forEach((event, eventName) => {
      event.hasCycled = true;
      this.entityEventListeners.get(eventName)?.forEach((entity) => {
        const listenerFunction = entity.listeners.get(eventName);
        if (listenerFunction) listenerFunction(event.options);
      });
    });
  }

  private clearEvents() {
    for (const eventName of this.events.keys())
      if (this.events.get(eventName)!.hasCycled) this.events.delete(eventName);
  }

  run() {
    this.canvy.push();

    this.runEvents();

    this.applyTransformations(this.canvy);
    this.runBehaviors();
    this.states.get(this.currentState)!();

    this.clearEvents();

    this.canvy.pop();
  }
}
