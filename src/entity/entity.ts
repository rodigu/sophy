import { Size } from "../primitives.ts";
import { Vector } from "../vector/vector.ts";
import { EntitySettings } from "./settings.ts";

export class Entity implements EntitySettings {
  readonly id: string;
  readonly children: Map<string, Entity>;
  readonly layers: Map<string, Entity>[];
  readonly layer: number;

  private behaviors: Map<string, () => void>;
  private behaviorsActive: Set<string>;
  private listeners: Map<string, (event: unknown) => void>;

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

  public size: Size;
  public rotation: number;
  public scale: Size;
  public position: Vector;

  constructor(id: string, layer: number) {
    this.id = id;
    this.children = new Map();
    this.layers = [];
    this.layer = layer;

    this.behaviorsActive = new Set();
    this.behaviors = new Map();
    this.listeners = new Map();

    this.size = { width: 0, height: 0 };
    this.rotation = 0;
    this.scale = { width: 0, height: 0 };
    this.position = new Vector(0, 0);
  }

  addListener(eventName: string, eventFunction: (event: any) => void) {
    this.listeners.set(eventName, eventFunction);
  }

  removeListener(eventName: string) {
    this.listeners.delete(eventName);
  }

  activateBehavior(name: string) {
    if (!this.behaviors.has(name)) return;
    this.behaviorsActive.add(name);
  }

  addBehavior(name: string, behavior: () => void, doActivate = false) {
    this.behaviors.set(name, behavior);
    if (doActivate) this.behaviorsActive.add(name);
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
  runChildren() {
    for (const layer of this.layers) layer.forEach((child) => child.run());
  }

  run() {}
}
