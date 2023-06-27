export type ControlsOptions = {
  key: string;
  functionCall: () => void;
}[];

interface KeyPressOptions {
  key: string;
  speed: number;
}
export interface SophyDirectionalControlsOptions {
  up: KeyPressOptions;
  down: KeyPressOptions;
  left: KeyPressOptions;
  right: KeyPressOptions;
}
