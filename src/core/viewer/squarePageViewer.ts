import { Square } from "../Square"
import $ from 'jquery'
import { IViewer } from "../types"
import squareConfig from './viewerConfig'
export class SquarePageViewer implements IViewer {
  constructor (private square: Square, private container: JQuery<HTMLElement>) {
    this.square = square
    this.container = container
  }
  private dom?: JQuery<HTMLElement>
  private isRemove: boolean = false
  show(): void {
    if (this.isRemove) {
      return
    }
    if (!this.dom) {
      this.dom = $('<div>').css({
        'box-sizing': 'border-box',
        'border': '1px solid #ccc',
        'position': 'absolute',
        'width': squareConfig.squareSize.width,
        'height': squareConfig.squareSize.height
      }).appendTo(this.container)
    }
    console.log('color', this.square.color)
    this.dom.css({
      left: this.square.point.x * squareConfig.squareSize.width,
      top: this.square.point.y * squareConfig.squareSize.height,
      background: this.square.color
    })
  }
  remove(): void {
    if (this.dom && !this.isRemove) {
      this.dom.remove()
      this.isRemove = true
    }
  }
}