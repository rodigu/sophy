import { Entity } from "../../mod.ts";
import { VectorLike, Vector } from "../vector/vector.ts";

export class Collider {
  private topLeft: VectorLike;
  private bottomRight: VectorLike;

  private parentPosition: Vector;

  constructor(
    topLeft: VectorLike,
    bottomRight: VectorLike,
    parentPosition: Vector
  ) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;

    this.parentPosition = parentPosition;
  }

  static defaultCollider(parent: Entity) {
    return new Collider(
      {
        x: -parent.size.width / 2,
        y: -parent.size.height / 2,
      },
      {
        x: parent.size.width / 2,
        y: parent.size.height / 2,
      },
      parent.position
    );
  }

  get x0() {
    return this.topLeft.x + this.parentPosition.x;
  }
  get y0() {
    return this.topLeft.y + this.parentPosition.y;
  }

  get realTopLeft(): VectorLike {
    return { x: this.x0, y: this.y0 };
  }

  get x1() {
    return this.bottomRight.x + this.parentPosition.x;
  }
  get y1() {
    return this.bottomRight.y + this.parentPosition.y;
  }

  get realBottomRight(): VectorLike {
    return { x: this.x1, y: this.y1 };
  }

  get realBottomLeft(): VectorLike {
    return {
      x: this.topLeft.x + this.parentPosition.x,
      y: this.bottomRight.y + this.parentPosition.y,
    };
  }

  get realTopRight(): VectorLike {
    return {
      x: this.bottomRight.x + this.parentPosition.x,
      y: this.topLeft.y + this.parentPosition.y,
    };
  }

  /**
   * Expects point o be in the same coordinate space as the collider's parent.
   * @date 6/27/2023 - 2:03:58 PM
   *
   * @param point
   * @returns
   */
  pointIsIn(point: VectorLike | Vector): boolean {
    return (
      point.x > this.x0 &&
      point.x < this.x1 &&
      point.y > this.y0 &&
      point.y < this.y1
    );
  }

  collidesWith(other: Collider) {
    return (
      this.pointIsIn(other.realTopLeft) ||
      this.pointIsIn(other.realBottomRight) ||
      this.pointIsIn(other.realBottomLeft) ||
      this.pointIsIn(other.realTopRight) ||
      other.pointIsIn(this.realTopLeft) ||
      other.pointIsIn(this.realBottomRight) ||
      other.pointIsIn(this.realBottomLeft) ||
      other.pointIsIn(this.realTopRight)
    );
  }
}
