import { Square } from "./Square";
import { Point, Shape } from "./types";

export class SquareGroup {
  private _squares: readonly Square[] = []
  get shape () {
    return this._shape
  }
  get squares () {
    return this._squares
  }
  get centerPoint (): Point {
    return this._centerPoint
  }
  set centerPoint (val: Point) {
    this._centerPoint = val
    if (this._squares) {
      // this._shape.forEach((item, i) => {
      //   let point = {
      //     x: item.x + this._centerPoint.x,
      //     y: item.y + this._centerPoint.y
      //   }
      //   this._squares[i].point = point
      // })
      this.renderShape()
    }
  }
  private renderShape () {
     this._shape.forEach((item, i) => {
      let point = {
        x: item.x + this._centerPoint.x,
        y: item.y + this._centerPoint.y
      }
      this._squares[i].point = point
    })
  }
  protected isClock: boolean = true  // true 顺时针旋转 false 逆时针旋转
  afterRotateShape (shape: Shape):Shape {
    if (this.isClock) {
      return shape.map(item => {
        let newP: Point = {
          x: -item.y,
          y: item.x
        }
        return newP
      })
    } else {
      return shape.map(item => {
        let newP: Point = {
          x: item.y,
          y: -item.x
        }
        return newP
      })
    }
  }
  rotate () {
    let newShape: Shape = this.afterRotateShape(this._shape)
    this._shape = newShape
    this.renderShape()
  }
  constructor (private _shape: Shape, private _centerPoint: Point, private _color: string) {
    let arr: Square[] = []
    _shape.forEach(item => {
      let sq = new Square()
      sq.point = {
        x: item.x + _centerPoint.x,
        y: item.y + _centerPoint.y
      }
      sq.color = _color
      arr.push(sq)
    })
    this._squares = arr
  }
}