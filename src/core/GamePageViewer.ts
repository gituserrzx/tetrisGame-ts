import { SquareGroup } from "./SquareGroup";
import { GameViewer } from "./types";
import $ from 'jquery'
import { SquarePageViewer } from "./viewer/squarePageViewer";
export class GamePageViwer implements GameViewer {
  showNext(tetris: SquareGroup): void {
    tetris.squares.forEach(item => {
      item.viewer = new SquarePageViewer(item, $('#next'))
    })
  }
  switch(tetris: SquareGroup): void {
    tetris.squares.forEach(item => {
      item.viewer!.remove()
      item.viewer = new SquarePageViewer(item, $('#pannel'))
    })
  }
}