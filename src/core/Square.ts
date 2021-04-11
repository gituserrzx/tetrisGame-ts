import { Point, IViewer } from "./types";

export class Square {
  private _point: Point = {
    x: 0,
    y: 0
  }
  private _color: string = ''
  private _viewer?: IViewer
  get viewer () {
    return this._viewer
  }
  set viewer (val) {
    this._viewer = val
    if (this._viewer) {
      this._viewer.show()
    }
  }
  get point () {
    return this._point
  }
  set point (val: Point) {
    this._point = val
    // 当值变化时视图更新
    if (this._viewer) {
      this._viewer.show()
    }
  }
  get color () {
    return this._color
  }
  set color (val: string) {
    this._color = val
    if (this._viewer) {
      this._viewer.show()
    }
  }
}