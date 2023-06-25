import { VectorFunctions } from "./functions.ts";
import { VectorMath } from "./math.ts";

export interface VectorLike {
  x: number;
  y: number;
}

export class Vector implements VectorFunctions, VectorMath {
  public x: number;
  public y: number;

  set = VectorFunctions.prototype.set;

  add = VectorMath.prototype.add;
  sub = VectorMath.prototype.sub;
  mult = VectorMath.prototype.mult;
  multVector = VectorMath.prototype.multVector;
  div = VectorMath.prototype.div;
  distSq = VectorMath.prototype.distSq;
  mag = VectorMath.prototype.mag;
  magSq = VectorMath.prototype.magSq;
  dot = VectorMath.prototype.dot;
  norm = VectorMath.prototype.norm;
  normalize = VectorMath.prototype.normalize;
  setMag = VectorMath.prototype.setMag;
  limit = VectorMath.prototype.limit;
  heading = VectorMath.prototype.heading;
  rotate = VectorMath.prototype.rotate;
  reflect = VectorMath.prototype.reflect;
  angleBetween = VectorMath.prototype.angleBetween;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}
