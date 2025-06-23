import { directions } from './constans';

export const createMaze = (baseboard: number[][]): number[][] => {
  const array = baseboard.map((row) => [...row]);
  for (let i = 0; i < baseboard.length; i++) {
    for (let j = 0; j < baseboard.length; j++) {
      const randomindex = Math.floor(Math.random() * 4);
      if (baseboard[i][j] === 1) {
        // console.log(i, j);
        array[i + directions[randomindex][1]][j + directions[randomindex][0]] = 1;
      }
    }
  }
  return array;
};

export const chooseway = (
  x: number,
  y: number,
  nowfacing: number[],
  board: number[][],
): number[] => {
  const index = directions.findIndex(
    (array) => array[0] === nowfacing[0] && array[1] === nowfacing[1],
  );
  const leftdirections: number[] = [
    directions[(((index - 1) % 4) + 4) % 4][0],
    directions[(((index - 1) % 4) + 4) % 4][1],
  ];
  const frontdirections: number[] = [directions[index][0], directions[index][1]];
  const rightdirections: number[] = [
    directions[(index + 1) % 4][0],
    directions[(index + 1) % 4][1],
  ];
  const behinddirectons: number[] = [
    directions[(index + 2) % 4][0],
    directions[(index + 2) % 4][1],
  ];
  if (
    board[y + leftdirections[1]] !== undefined &&
    board[y + leftdirections[1]][x + leftdirections[0]] !== undefined &&
    board[y + leftdirections[1]][x + leftdirections[0]] === 0
  )
    return leftdirections;
  if (
    board[y + frontdirections[1]] !== undefined &&
    board[y + frontdirections[1]][x + frontdirections[0]] !== undefined &&
    board[y + frontdirections[1]][x + frontdirections[0]] === 0
  )
    return frontdirections;
  if (
    board[y + rightdirections[1]] !== undefined &&
    board[y + rightdirections[1]][x + rightdirections[0]] !== undefined &&
    board[y + rightdirections[1]][x + rightdirections[0]] === 0
  )
    return rightdirections;

  return behinddirectons;
};
