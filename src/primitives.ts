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

export interface SophyBehavior<Options> {
  name: string;
  addTo: (entity: Entity, doActivate: boolean, options?: Options) => void;
}

export interface SophyManagerState<Options> {
  name: string;
  addTo: (manager: SophyManager, options?: Options) => void;
}

export const throwCustomError = (error: Error, message: string): never => {
  error.message = message;
  throw error;
};
