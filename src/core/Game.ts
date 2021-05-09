import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createTetris } from "./Tetris";
import { TetrisRule } from "./TetrisRule";
import { GameStatus, GameViewer, MoveDirection, Point } from "./types";
import viewerConfig from './viewer/viewerConfig'

export class Game {
  private _gameStatus: GameStatus = GameStatus.init // 游戏状态
  private _currTetris?: SquareGroup
  private _nextTetris: SquareGroup = createTetris({x: 0, y: 0})
  private timer?: any
  private duration: number = 1000
  private _exist: Square[] = []
  private _score: number = 0
  constructor (private _viewer: GameViewer) {
    this.createNextTetris()
    this._viewer.init(this)
    this.score = 0
  }
  get score () {
    return this._score
  }
  set score (val) {
    this._score = val
    this._viewer.showScore(this._score)
    let arr = viewerConfig.levels.filter(item => {
      if (this._score >= item.score) {
        return item
      }
    })
    let option = arr.pop()
    console.log(arr, option, this.duration)
    if (option!.duration === this.duration) {
      return
    }
    this.duration = option!.duration
    clearInterval(this.timer)
    this.timer = undefined
    this.autoDrop()
  }
  get gameStatus ()  {
    return this._gameStatus
  }
  start () {
    if (this._gameStatus === GameStatus.playing) {
      return
    }
    if (this._gameStatus === GameStatus.over) {
      this.init()
    }
    this._gameStatus = GameStatus.playing
    if (!this._currTetris) {
      this.switchTetris()
    }
    this._viewer.onGamePlay()
    this.autoDrop()
  }
  pause () {
    if (this._gameStatus !== GameStatus.playing) {
      return
    }
    this._gameStatus = GameStatus.stop
    clearInterval(this.timer)
    this.timer = undefined
    this._viewer.onGamePause()
  }
  init () {
    this._exist.forEach(item => {
      item.viewer!.remove()
    })
    this._exist = []
    this.score = 0
    this._currTetris = undefined
    this.createNextTetris()
  }
  control_left () {
    if (this._currTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(this._currTetris, MoveDirection.left, this._exist)
    }
  }
  control_right () {
    if (this._currTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(this._currTetris, MoveDirection.right, this._exist)
    }
  }
  control_rotate () {
    if (this._currTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.rotate(this._currTetris, this._exist)
    }
  }
  control_down () {
    if (this._currTetris && this._gameStatus === GameStatus.playing) {
      if (!TetrisRule.moveDirected(this._currTetris, MoveDirection.bottom, this._exist)) {
        this.hitBottom()
      }
    }
  }
  private autoDrop () {
    if (this._gameStatus !== GameStatus.playing && this.timer) {
      return
    }
    this.timer = setInterval(() => {
      if (this._currTetris) {
        if (!TetrisRule.move(this._currTetris, MoveDirection.bottom, this._exist)) {
          this.hitBottom()
        }
      }
    }, this.duration)
  }
  private createNextTetris () {
    this._nextTetris = createTetris({x: 0, y: 0})
    this.resetTetris(viewerConfig.nextSize.width, this._nextTetris)
    this._viewer.showNext(this._nextTetris)
  }
  private switchTetris () {
      this._currTetris = this._nextTetris
      this._currTetris.squares.forEach(item => {
        if (item.viewer) {
          item.viewer.remove()
        }
      })
      this.resetTetris(viewerConfig.pannelSize.width, this._currTetris)
      if (!TetrisRule.canIMove(this._currTetris.shape, this._currTetris.centerPoint, this._exist)) {
        this._gameStatus = GameStatus.over
        clearInterval(this.timer)
        this.timer = undefined
        this._viewer.onGameOver()
        return
      }
      this.createNextTetris()
      this._viewer.switch(this._currTetris)

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
  private addScore (number: number) {
    if (number === 1) {
      this.score += 10
    } else if (number === 2) {
      this.score += 30
    } else if (number === 3) {
      this.score += 100
    } else {
      this.score += 200
    }
  }
  private hitBottom () {
    this._exist = this._exist.concat(this._currTetris!.squares)
    let num = TetrisRule.delSquare(this._exist)
    if (num > 0) {
      this.addScore(num)
    }
    this.switchTetris()
  }
}
