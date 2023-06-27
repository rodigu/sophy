import { Collider } from "../collisions/collider.ts";
import { SophyManager } from "../manager.ts";
import { Size } from "../primitives.ts";
import { Vector, VectorLike } from "../vector/vector.ts";
import { EntitySettings } from "./settings.ts";
import { Canvy } from "https://deno.land/x/canvy@v0.0.3/mod.ts";

export class Entity implements EntitySettings {
  readonly id: string;
  readonly children: Map<string, Entity>;
  readonly layers: Map<string, Entity>[];
  readonly listeners: Map<string, (event: unknown) => void>;
  readonly manager: SophyManager | undefined;

  private behaviors: Map<string, () => void>;
  private behaviorsActive: Set<string>;
  private layer: number;
  readonly collisionMapping: Map<
    string,
    { collidesWith: Entity; event: { name: string; options: unknown } }[]
  >;

  /**
   * Events should use the BaseEvent format:
   * ```ts
   * {
   *   event1Name: {
   *     name: 'event1Name',
   *     options: unknown,
   *   },
   *   event2Name: {
   *     name: 'event1Name',
   *     options: unknown,
   *   }
   * }
   * ```
   * @date 6/25/2023 - 2:28:20 PM
   *
   * @static
   */
  static Events: unknown;

  /**
   * Behaviors have the format:
   * ```ts
   * {
   *   behavior1: 'behavior1',
   *   behavior2: 'behavior2'
   * }
   * ```
   * @date 6/25/2023 - 2:31:58 PM
   *
   * @static
   */
  static Behaviors: unknown;

  /**
   * Settings is an object property holding any values that
   * should be accessible by any entity at all times.
   * @date 6/25/2023 - 2:32:51 PM
   *
   * @static
   */
  static Settings: unknown;

  static create: (manager: SophyManager, options: any) => Entity;

  public size: Size;
  public rotation: number;
  public scale: VectorLike;
  public position: Vector;
  public tags: Set<string>;

  private _collider: Collider | undefined;

  constructor(id: string, layer: number, manager?: SophyManager) {
    this.id = id;
    this.children = new Map();
    this.layers = [];
    this.listeners = new Map();
    this.collisionMapping = new Map();

    this.manager = manager;

    this.behaviorsActive = new Set();
    this.behaviors = new Map();
    this.layer = layer;

    this.size = { width: 0, height: 0 };
    this.rotation = 0;
    this.scale = { x: 1, y: 1 };
    this.position = new Vector(0, 0);
    this.tags = new Set();
  }

  setCollider(collider: Collider) {
    this._collider = collider;
  }

  addCollisionToMapping(
    entity: Entity,
    collidesWith: Entity,
    event: { name: string; options: any }
  ) {
    if (!this.collisionMapping.has(entity.id))
      this.collisionMapping.set(entity.id, []);

    const mapping = this.collisionMapping.get(entity.id)!;

    mapping.push({
      collidesWith,
      event,
    });
  }

  get collider() {
    if (this._collider === undefined)
      throw new Error(`Entity [${this.id}] has no collider.`);
    return this._collider;
  }

  moveToLayer(layer: number) {
    this.layer = layer;
  }

  moveChildToLayer(child: string | Entity, layer: number) {
    if (typeof child === "string") {
      const childInstance = this.getChild(child);
      if (!childInstance)
        throw new Error(`Entity [${this.id}] has no child [${child}]`);
      child = childInstance;
    }
    this.layers[child.layer].delete(child.id);
    child.moveToLayer(layer);
    this.layers[layer].set(child.id, child);
  }

  addListener(eventName: string, eventFunction: (event: any) => void) {
    this.listeners.set(eventName, eventFunction);
    this.manager?.entityListensTo(eventName, this);
  }

  emitEvent(eventName: string, options: unknown) {
    this.manager?.emitEvent(eventName, options);
  }

  activateBehavior(behaviorName: string) {
    if (!this.behaviors.has(behaviorName))
      throw `Entity [${this.id}] has no behavior [${behaviorName}]`;
    this.behaviorsActive.add(behaviorName);
  }

  addBehavior(
    newBehaviorName: string,
    behavior: () => void,
    doActivate = false
  ) {
    this.behaviors.set(newBehaviorName, behavior);
    if (doActivate) this.behaviorsActive.add(newBehaviorName);
  }

  private addChildToLayer(entity: Entity) {
    if (!this.layers[entity.layer]) this.layers[entity.layer] = new Map();
    this.layers[entity.layer].set(entity.id, entity);
  }

  addChild(entity: Entity) {
    this.children.set(entity.id, entity);
    this.addChildToLayer(entity);
  }

  removeChild(entity: Entity) {
    this.children.delete(entity.id);
    this.layers[entity.layer].delete(entity.id);
  }

  getChild(id: string) {
    return this.children.get(id);
  }

  /**
   * Calls the run function of its children.
   * Children run before their parent class.
   * @date 6/25/2023 - 3:06:37 PM
   */
  runChildren(canvy: Canvy) {
    for (const layer of this.layers) {
      layer?.forEach((child) => {
        child.run(canvy);

        const collisions = this.collisionMapping.get(child.id);
        collisions?.forEach((collision) => {
          const { collidesWith, event } = collision;
          if (child.collider.collidesWith(collidesWith.collider)) {
            child.manager?.emitEvent(event.name, event.options);
          }
        });
      });
    }
  }

  runBehaviors() {
    for (const behavior of this.behaviors.values()) behavior();
  }

  applyTransformations(canvy: Canvy) {
    canvy.translate(this.position.x, this.position.y);
    canvy.rotate(this.rotation);
    canvy.scale(this.scale.x, this.scale.y);
  }

  run(canvy: Canvy) {
    if (!this.manager) throw new Error(`Entity [${this.id}] need a manager!`);
    canvy.push();

    this.applyTransformations(canvy);
    this.runBehaviors();
    this.runChildren(canvy);

    canvy.pop();
  }
}
