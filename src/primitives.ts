import { Entity } from "../mod.ts";
import { SophyManager } from "./manager.ts";

export interface Size {
  width: number;
  height: number;
}

export interface BaseEvent {
  name: string;
  options: unknown;
}

export interface SophyBehavior {
  name: string;
  addTo: (entity: Entity) => void;
}

export interface SophyManagerState {
  name: string;
  addTo: (manager: SophyManager) => void;
}
