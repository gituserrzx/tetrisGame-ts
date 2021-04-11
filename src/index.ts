import { Square } from "./core/Square";
import {SquarePageViewer} from './core/viewer/squarePageViewer'
import $ from 'jquery'
import { SquareGroup } from "./core/SquareGroup";
import { createTetris } from "./core/Tetris";

let group = createTetris({x: 3, y: 3})

group.squares.forEach(item => {
  item.viewer = new SquarePageViewer(item, $('#root'))
})
// let group = new SquareGroup(LShape, {
//   x: 3,
//   y: 3
// }, '#ff0')

// const sq = new Square()

// sq.viewer = new SquarePageViewer(sq, $('#root'))

// sq.point = {
//   x: 3,
//   y: 4
// }
// sq.color = '#ff0'
// $('#hide').on('click', function () {
//   if (sq.viewer) {
//     sq.viewer.remove()
//   }
// })
$('#moveDown').on('click', function () {
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y + 1
  }
})
$('#moveRight').on('click', function () {
  group.centerPoint = {
    x: group.centerPoint.x + 1,
    y: group.centerPoint.y
  }
})
$('#moveLeft').on('click', function () {
  group.centerPoint = {
    x: group.centerPoint.x - 1,
    y: group.centerPoint.y
  }
})
$('#moveUp').on('click', function () {
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y - 1
  }
})
// $('#show').on('click', function () {
//   sq.viewer = new SquarePageViewer(sq, $('#root'))
// })