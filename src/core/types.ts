import { SquareGroup } from "./SquareGroup";

export interface Point {
  readonly x: number,
  readonly y: number
}
export interface IViewer {
  show (): void,
  remove (): void
}
export type Shape = Point[]

export enum MoveDirection {
  left,
  right,
  bottom
}

export enum GameStatus {
  init, // 初始化
  playing, // 开始
  stop, // 暂停
  over // 结束
}

export interface GameViewer {
  showNext (tetris: SquareGroup): void
  switch (tetris: SquareGroup): void
}