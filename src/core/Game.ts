import { SquareGroup } from "./SquareGroup";
import { createTetris } from "./Tetris";
import { TetrisRule } from "./TetrisRule";
import { GameStatus, GameViewer, MoveDirection } from "./types";
import viewerConfig from './viewer/viewerConfig'

export class Game {
  private _gameStatus: GameStatus = GameStatus.init // 游戏状态
  private _currTetris?: SquareGroup
  private _nextTetris: SquareGroup = createTetris({x: 0, y: 0})
  private timer?:number
  private duration: number = 1000
  constructor (private _viewer: GameViewer) {
    this.resetTetris(viewerConfig.nextSize.width, this._nextTetris)
    this._viewer.showNext(this._nextTetris)
  }
  start () {
    if (this._gameStatus === GameStatus.playing) {
      return
    }
    this._gameStatus = GameStatus.playing
    if (!this._currTetris) {
      this.switchTetris()
    }
    this.autoDrop()
  }
  pause () {
    if (this._gameStatus !== GameStatus.playing) {
      return
    }
    this._gameStatus = GameStatus.stop
    clearInterval(this.timer)
    this.timer = undefined
  }
  control_left () {
    if (this._currTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(this._currTetris, MoveDirection.left)
    }
  }
  control_right () {
    if (this._currTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(this._currTetris, MoveDirection.right)
    }
  }
  control_rotate () {
    if (this._currTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.rotate(this._currTetris)
    }
  }
  private autoDrop () {
    if (this._gameStatus !== GameStatus.playing && this.timer) {
      return
    }
    this.timer = setInterval(() => {
      if (this._currTetris) {
        TetrisRule.move(this._currTetris, MoveDirection.bottom)
      }
    }, this.duration)
  }
  private switchTetris () {
      this._currTetris = this._nextTetris
      this._nextTetris = createTetris({x: 0, y: 0})
      this.resetTetris(viewerConfig.pannelSize.width, this._currTetris)
      this._viewer.switch(this._currTetris)
      this.resetTetris(viewerConfig.nextSize.width, this._nextTetris)
      this._viewer.showNext(this._nextTetris)
  }
  private resetTetris (width: number, tetris: SquareGroup) {
    let x = Math.round(width / 2 - 1)
    let y = 0
    tetris.centerPoint = {x, y}
    while(tetris.squares.some(item => item.point.y < 0)) {
      tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y + 1
      }
    }
    while(tetris.squares.some(item => item.point.x < 0)) {
      tetris.centerPoint = {
        x: tetris.centerPoint.x + 1,
        y: tetris.centerPoint.y
      }
    }
  }
}