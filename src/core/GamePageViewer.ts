import { SquareGroup } from "./SquareGroup";
import { GameStatus, GameViewer } from "./types";
import $ from 'jquery'
import viewerConfig from './viewer/viewerConfig'
import { SquarePageViewer } from "./viewer/squarePageViewer";
import { Game } from "./Game";
export class GamePageViwer implements GameViewer {
  onGamePause(): void {
    $('.show-status').text('游戏暂停')
    $('#mask').show()
  }
  onGamePlay(): void {
    $('#mask').hide()
  }
  onGameOver(): void {
    $('.show-status').text('Game Over')
    $('#mask').show()
  }
  private nextDom = $('#next')
  private pannelDom = $('#pannel')
  showScore(number: number): void {
    $('#score').html(number.toString())
  }
  init(game: Game): void {
    this.nextDom.css({
      width: viewerConfig.nextSize.width * viewerConfig.squareSize.width,
      height: viewerConfig.nextSize.height * viewerConfig.squareSize.height,
      position: 'relative'
    })
    this.pannelDom.css({
      width: viewerConfig.pannelSize.width * viewerConfig.squareSize.width,
      height: viewerConfig.pannelSize.height * viewerConfig.squareSize.height,
      background: viewerConfig.pannelSize.color,
      position: 'relative'
    })
    $(document).on('keydown', function (e) {
      if (e.keyCode === 38) {
        game.control_rotate()
      } else if (e.keyCode === 39) {
        game.control_right()
      } else if (e.keyCode === 40) {
        game.control_down()
      } else if (e.keyCode === 37) {
        game.control_left()
      } else if (e.keyCode === 32) {
        switch(game.gameStatus) {
          case GameStatus.init:
          case GameStatus.stop:
          case GameStatus.over:
            game.start()
            break
          case GameStatus.playing:
            game.pause()
            break
        }
      }
    })
  }
  showNext(tetris: SquareGroup): void {
    tetris.squares.forEach(item => {
      item.viewer = new SquarePageViewer(item, this.nextDom)
    })
  }
  switch(tetris: SquareGroup): void {
    tetris.squares.forEach(item => {
      item.viewer!.remove()
      item.viewer = new SquarePageViewer(item, this.pannelDom)
    })
  }
}