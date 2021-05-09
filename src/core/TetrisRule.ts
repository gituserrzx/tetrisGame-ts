import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { MoveDirection, Point, Shape } from "./types";
import viewerConfig from './viewer/viewerConfig'

function isPoint (obj: any): obj is Point {
  if (obj.x === undefined) {
    return false
  }
  return true
}

export class TetrisRule {
  static canIMove (shape: Shape, targetPoint: Point, exist: Square[]): boolean {
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
    let tResult = targetPoints.some(item => {
      return exist.some(sq => {
        return sq.point.x === item.x && sq.point.y === item.y
      })
    })
    if (tResult) {
      return false
    }
    return true
  }
  static rotate (tetris: SquareGroup, exist: Square[]): boolean {
    let newShape: Shape = tetris.afterRotateShape(tetris.shape)
    console.log(newShape, tetris.centerPoint)
    if (this.canIMove(newShape, tetris.centerPoint, exist)) {
      tetris.rotate()
      return true
    } else {
      return false
    }
  }
  static move (tetris: SquareGroup, targetPoint: Point, exist: Square[]): boolean
  static move (tetris: SquareGroup, moveDir: MoveDirection, exist: Square[]): boolean 
  static move (tetris: SquareGroup, targetPointOrDirection: Point | MoveDirection, exist: Square[]): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (TetrisRule.canIMove(tetris.shape, targetPointOrDirection, exist)) {
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
      return this.move(tetris, point, exist)
    }
  }
  // 正向移动
  static moveDirected (tetris: SquareGroup, moveDir:  MoveDirection, exist: Square[]) {
    while(this.move(tetris, moveDir, exist)) {
    }
    return false
  }
  static getLinePoints (exist: Square[], number: number): Square[] {
    return exist.filter(item => item.point.y === number)
  }
  static delSquare (exist: Square[]) {
    // 取得所有的y坐标
    let hList = exist.map(item => item.point.y)
    let maxY = Math.max(...hList)
    let minY = Math.min(...hList)
    let num = 0 // 记录删除了几行
    for (let y = minY;y <= maxY; y++) {
      if (this.delLine(exist, y)) {
        num++
      }
    }
    return num
  }
  private static delLine (exist: Square[], number: number): boolean {
    let squares = this.getLinePoints(exist, number)
    if (squares.length === viewerConfig.pannelSize.width) {
      squares.forEach(item => {
        item.viewer!.remove()
        let index = exist.indexOf(item)
        exist.splice(index, 1)
      })
      exist.forEach(item => {
        if(item.point.y < number) {
          item.point = {
            x: item.point.x,
            y: item.point.y + 1
          }
        }
      })
      return true

    }
    return false
  }
}