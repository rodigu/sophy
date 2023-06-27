import { Canvy } from "https://deno.land/x/canvy@v0.0.3/mod.ts";
import { Pong } from "./examples/pong/pong.ts";

export function TESTER(canvasElement: HTMLCanvasElement) {
  const canvy = new Canvy(canvasElement);
  Pong(canvy);
}
