export class SophyHelpers {
  static random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  static randint(min: number, max: number) {
    return Math.floor(SophyHelpers.random(min, max));
  }

  static randSign() {
    return Math.sign(Math.random() - 0.5);
  }

  static randElement<T>(list: Array<T>): T {
    return list[SophyHelpers.randint(0, list.length)];
  }

  static PI = 3.1415;

  /**
   * Number inputs as fractions of PI
   * @date 6/27/2023 - 3:34:50 PM
   *
   * @static
   * @param min
   * @param max
   */
  static randAngle(min: number, max: number) {
    return SophyHelpers.random(min * SophyHelpers.PI, max * SophyHelpers.PI);
  }
}
