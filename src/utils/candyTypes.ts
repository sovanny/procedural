
export interface ICandy {
  name: string,
  type: CANDY_TYPE
  points: number
}

export enum CANDY_TYPE {
  EXAMPLE_ONE,
  EXAMPLE_TWO,
}

export const candyTypes: ICandy[] = [
  {
    name: 'Example 1',
    type: CANDY_TYPE.EXAMPLE_ONE,
    points: 1
  },
  {
    name: 'Example 2',
    type: CANDY_TYPE.EXAMPLE_TWO,
    points: 1
  }
]
