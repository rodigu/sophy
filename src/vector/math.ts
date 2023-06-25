import { Vector, VectorLike } from "./vector.ts";

export class VectorMath {
  add(this: Vector, vector: Vector | VectorLike) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(this: Vector, vector: Vector | VectorLike) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  mult(this: Vector, scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  multVector(this: Vector, vector: Vector | VectorLike) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  }

  div(this: Vector, scalar: number) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  /**
   * Magnitude squared of a vector.
   * @date 6/25/2023 - 1:55:46 PM
   */
  magSq(this: Vector) {
    return this.x * this.x + this.y * this.y;
  }

  mag(this: Vector) {
    return Math.sqrt(this.magSq());
  }

  dot(this: Vector, vector: Vector | VectorLike) {
    return this.x * vector.x + this.y * vector.y;
  }

  distSq(this: Vector, vector: Vector | VectorLike) {
    const { x, y } = vector;
    return (this.x - x) ** 2 + (this.y - y) ** 2;
  }

  norm(this: Vector): Vector {
    const mag = this.mag();
    return new Vector(this.x / mag, this.y / mag);
  }

  normalize(this: Vector) {
    const mag = this.mag();
    this.div(mag);
    return this;
  }

  setMag(this: Vector, mag: number) {
    this.normalize();
    this.mult(mag);
    return this;
  }

  limit(this: Vector, limit: number) {
    if (this.magSq() < limit ** 2) return;
    this.setMag(limit);
    return this;
  }

  heading(this: Vector) {
    return Math.atan(this.x / this.y);
  }

  rotate(this: Vector, angle: number) {
    this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    return this;
  }

  /**
   * The `normal` vector must be normalized.
   * @date 6/25/2023 - 2:19:38 PM
   *
   * @param this
   * @param normal
   */
  reflect(this: Vector, normal: Vector | VectorLike) {
    const dot = this.dot(normal);
    this.sub(this.mult(2).mult(dot).multVector(normal));
    return this;
  }

  angleBetween(this: Vector, vector: Vector) {
    return Math.acos(this.dot(vector) / (this.mag() * vector.mag()));
  }
}
