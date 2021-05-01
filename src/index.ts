// import {SquarePageViewer} from './core/viewer/squarePageViewer'
import $ from 'jquery'
// import { createTetris } from "./core/Tetris";
// import { TetrisRule } from './core/TetrisRule';
// import { MoveDirection } from './core/types';

import { Game } from "./core/Game";
import { GamePageViwer } from "./core/GamePageViewer";
import { TetrisRule } from './core/TetrisRule';

// let group = createTetris({x: 3, y: 3})

// group.squares.forEach(item => {
//   item.viewer = new SquarePageViewer(item, $('#root'))
// })
// // let group = new SquareGroup(LShape, {
// //   x: 3,
// //   y: 3
// // }, '#ff0')

// // const sq = new Square()

// // sq.viewer = new SquarePageViewer(sq, $('#root'))

// // sq.point = {
// //   x: 3,
// //   y: 4
// // }
// // sq.color = '#ff0'
// // $('#hide').on('click', function () {
// //   if (sq.viewer) {
// //     sq.viewer.remove()
// //   }
// // })
// $('#moveDown').on('click', function () {
//   // let centerPoint = {
//   //   x: group.centerPoint.x,
//   //   y: group.centerPoint.y + 1
//   // }
//   // let shape = group.shape
//   // if (TetrisRule.canIMove(shape, centerPoint)) {
//   //   group.centerPoint = centerPoint
//   // }
//   TetrisRule.move(group, MoveDirection.bottom)
// })
// $('#moveRight').on('click', function () {
//   // let centerPoint = {
//   //   x: group.centerPoint.x + 1,
//   //   y: group.centerPoint.y
//   // }
//   // let shape = group.shape
//   // if (TetrisRule.canIMove(shape, centerPoint)) {
//   //   group.centerPoint = centerPoint
//   // }
//   TetrisRule.move(group, MoveDirection.right)
// })
// $('#moveLeft').on('click', function () {
//   // let centerPoint = {
//   //   x: group.centerPoint.x - 1,
//   //   y: group.centerPoint.y
//   // }
//   // let shape = group.shape
//   // if (TetrisRule.canIMove(shape, centerPoint)) {
//   //   group.centerPoint = centerPoint
//   // }
//   console.log('shape', group)
//   TetrisRule.move(group, MoveDirection.left)
// })
// $('#rotate').on('click', function () {
//   group.rotate()
// })
// // $('#show').on('click', function () {
// //   sq.viewer = new SquarePageViewer(sq, $('#root'))
// // })
let game = new Game(new GamePageViwer())
$('#stop').on('click', function () {
  game.pause()
})
$('#start').on('click', function () {
  game.start()
})
$('#moveDown').on('click', function () {
  game.control_down()
})
$('#rotate').on('click', function () {
  game.control_rotate()
})
$('#moveLeft').on('click', function () {
  game.control_left()
})
$('#moveRight').on('click', function () {
  game.control_right()
})