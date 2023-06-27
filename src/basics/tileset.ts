import { Canvy } from "https://deno.land/x/canvy@v0.0.3/mod.ts";
import { Size } from "../primitives.ts";
import { Vector, VectorLike } from "../vector/vector.ts";

/**
 * The variable `size` holds the size of the tiles in the original tileset.
 * @date 6/26/2023 - 3:21:03 PM
 *
 * @export
 * @interface
 * @typedef {SophyTilesetData}
 */
export interface SophyTilesetData {
  name: string;
  image: HTMLImageElement;
  size: Size;
  numberOfColumns: number;
}

export class SophyTileset {
  static drawTile(
    canvy: Canvy,
    tileset: SophyTilesetData,
    position: Vector | VectorLike,
    id: number,
    size: Size
  ) {
    const { x, y } = position;
    const { tileX, tileY } = SophyTileset.tileNumToPos(id, tileset);
    canvy.imageSection(
      tileset.image,
      x - size.width / 2,
      y - size.height / 2,
      size.width,
      size.height,
      tileX,
      tileY,
      tileset.size.width,
      tileset.size.height
    );
  }

  static tileNumToPos(n: number, tileset: SophyTilesetData) {
    return {
      tileX: (n % tileset.numberOfColumns) * tileset.size.width,
      tileY: Math.floor(n / tileset.numberOfColumns) * tileset.size.height,
    };
  }
}
