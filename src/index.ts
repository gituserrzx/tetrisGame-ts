import { Square } from "./core/Square";
import {SquarePageViewer} from './core/viewer/squarePageViewer'
import $ from 'jquery'

const sq = new Square()

sq.viewer = new SquarePageViewer(sq, $('#root'))

sq.point = {
  x: 3,
  y: 4
}
sq.color = '#ff0'
console.log(sq.color)
$('#hide').on('click', function () {
  if (sq.viewer) {
    sq.viewer.remove()
  }
})
$('#moveDown').on('click', function () {
  let y = sq.point.y
  sq.point = {
    x: 3,
    y: y + 1
  }
})
$('#show').on('click', function () {
  sq.viewer = new SquarePageViewer(sq, $('#root'))
})
// setInterval(() => {
//   let y = sq.point.y
//   sq.point = {
//     x: 3,
//     y: y + 1
//   }
// },1000)
// import { IViewer } from "./core/types";

// class SquareConsoleViewer implements IViewer {
//   constructor (private square: Square) {
//   }
//   show(): void {
//     console.log(this.square.point, this.square.color)    
//   }
//   remove(): void {
//     throw new Error("Method not implemented.");
//   }
  
// }
// var sq = new Square()
