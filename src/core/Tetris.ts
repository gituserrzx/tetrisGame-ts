import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./util";

export const TShape:Shape = [
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
]
export const LShape: Shape = [
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
]

export const LMirrorShape: Shape = [
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
]

export const SShape: Shape = [
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
]

export const SMirrorShape: Shape = [
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
]
export const SquareShape: Shape = [
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
]
export const LineShape: Shape = [
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

const shapeTypes: Shape[] = [
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
  return new SquareGroup(shapeTypes[getRandom(0, shapeTypes.length)], centerPoint, colorList[getRandom(0, colorList.length)])
}