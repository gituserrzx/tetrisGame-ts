import { SquareGroup } from "./SquareGroup";
import { MoveDirection, Point, Shape } from "./types";
import viewerConfig from './viewer/viewerConfig'

function isPoint (obj: any): obj is Point {
  if (obj.x) {
    return true
  }
  return false
}

export class TetrisRule {
  static canIMove (shape: Shape, targetPoint: Point): boolean {
    let targetPoints: Point[] = shape.map(item  => {
      return {
        x: item.x + targetPoint.x,
        y: item.y + targetPoint.y
      }
    })
   let result = targetPoints.some(item => {
      return (item.x < 0 || item.x > viewerConfig.pannelSize.width - 1 || 
        item.y < 0 || item.y >viewerConfig.pannelSize.height - 1) 
    })
    if (result) {
      return false
    }
    return true
  }

  static move (tetris: SquareGroup, targetPoint: Point): boolean
  static move (tetris: SquareGroup, moveDir: MoveDirection): boolean 
  static move (tetris: SquareGroup, targetPointOrDirection: Point | MoveDirection): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (TetrisRule.canIMove(tetris.shape, targetPointOrDirection)) {
        tetris.centerPoint = targetPointOrDirection
        return true
      }
      return false
    } else {
      let point:Point = tetris.centerPoint
      if (MoveDirection.left === targetPointOrDirection) {
        point = {
          x: point.x - 1,
          y: point.y
        }
      } else if (MoveDirection.right === targetPointOrDirection) {
        point = {
          x: point.x + 1,
          y: point.y
        }
      } else {
        point = {
          x: point.x,
          y: point.y + 1
        }
      }
      return this.move(tetris, point)
    }
  }
}