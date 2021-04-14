import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./util";
 
class TShape extends SquareGroup {
  constructor (centerPoint: Point, color: string) {
    super([
      {
        x: 0,
        y: -1
      },
      {
        x: -1,
        y: 0
      },
      {
        x: 0,
        y: 0
      },
      {
        x: 1,
        y: 0
      }
    ], centerPoint, color)
  }
}
// export const TShape:Shape = [
//   {
//     x: 0,
//     y: -1
//   },
//   {
//     x: -1,
//     y: 0
//   },
//   {
//     x: 0,
//     y: 0
//   },
//   {
//     x: 1,
//     y: 0
//   }
// ]
class LShape extends SquareGroup {
  constructor (centerPoint: Point, color: string) {
    super([
      {
        x: -2,
        y: 0
      }, 
      {
        x: -1,
        y: 0
      },
      {
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: -1
      }
    ], centerPoint, color)
  }
}
// export const LShape: Shape = [
//   {
//     x: -2,
//     y: 0
//   }, 
//   {
//     x: -1,
//     y: 0
//   },
//   {
//     x: 0,
//     y: 0
//   },
//   {
//     x: 0,
//     y: -1
//   }
// ]

class LMirrorShape extends SquareGroup {
  constructor (centerPoint: Point, color: string) {
    super([
      {
        x: 2,
        y: 0
      },
      {
        x: 1,
        y: 0
      },
      {
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: -1
      }
    ], centerPoint, color)
  }
}
// export const LMirrorShape: Shape = [
//   {
//     x: 2,
//     y: 0
//   },
//   {
//     x: 1,
//     y: 0
//   },
//   {
//     x: 0,
//     y: 0
//   },
//   {
//     x: 0,
//     y: -1
//   }
// ]

class SShape extends SquareGroup {
  constructor (centerPoint: Point, color: string) {
    super([
      {
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: 1
      },
      {
        x: -1,
        y: 1
      },
      {
        x: 1,
        y: 0
      }
    ], centerPoint, color)
  }
}
// export const SShape: Shape = [
//   {
//     x: 0,
//     y: 0
//   },
//   {
//     x: 0,
//     y: 1
//   },
//   {
//     x: -1,
//     y: 1
//   },
//   {
//     x: 1,
//     y: 0
//   }
// ]

class SMirrorShape extends SquareGroup {
  constructor (centerPoint: Point, color: string) {
    super([
      {
        x: 0,
        y: 0
      },
      {
        x: -1,
        y: 0
      },
      {
        x: 0,
        y: 1
      },
      {
        x: 1,
        y: 1
      }
    ], centerPoint, color)
  }
}
// export const SMirrorShape: Shape = [
//   {
//     x: 0,
//     y: 0
//   },
//   {
//     x: -1,
//     y: 0
//   },
//   {
//     x: 0,
//     y: 1
//   },
//   {
//     x: 1,
//     y: 1
//   }
// ]
class SquareShape extends SquareGroup {
  constructor (centerPoint: Point, color: string) {
    super([
      {
        x: 0,
        y: 0
      },
      {
        x: 1,
        y: 0
      },
      {
        x: 0,
        y: 1
      },
      {
        x: 1,
        y: 1
      }
    ], centerPoint, color)
  }
}
// export const SquareShape: Shape = [
//   {
//     x: 0,
//     y: 0
//   },
//   {
//     x: 1,
//     y: 0
//   },
//   {
//     x: 0,
//     y: 1
//   },
//   {
//     x: 1,
//     y: 1
//   }
// ]
class LineShape extends SquareGroup {
  constructor (centerPoint: Point, color: string) {
    super([
      {
        x: -1,
        y: 0
      },
      {
        x: 0,
        y: 0
      },
      {
        x: 1,
        y: 0
      },
      {
        x: 2,
        y: 0
      }
    ]
    , centerPoint, color)
  }
}
// export const LineShape: Shape = [
//   {
//     x: -1,
//     y: 0
//   },
//   {
//     x: 0,
//     y: 0
//   },
//   {
//     x: 1,
//     y: 0
//   },
//   {
//     x: 2,
//     y: 0
//   }
// ]

const shapeTypes = [
  TShape,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape
]

const colorList: string[] = [
  'red',
  '#fff',
  'gold',
  'blue',
  'yellow',
  '#f0f'
]

export function createTetris (centerPoint: Point) {
  let shapeClass = shapeTypes[getRandom(0, shapeTypes.length)]
  return new shapeClass(centerPoint, colorList[getRandom(0, colorList.length)])
}