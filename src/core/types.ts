export interface Point {
  readonly x: number,
  readonly y: number
}
export interface IViewer {
  show (): void,
  remove (): void
}
export type Shape = Point[]

export type test = string
export enum MoveDirection {
  left,
  right,
  bottom
}