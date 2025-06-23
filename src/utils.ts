import { directions } from './constans';

export const createMaze = (baseboard: number[][]): number[][] => {
  const array = baseboard.map((row) => [...row]);
  for (let i = 0; i < baseboard.length; i++) {
    for (let j = 0; j < baseboard.length; j++) {
      const randomindex = Math.floor(Math.random() * 4);
      if (baseboard[i][j] === 1) {
        console.log(i, j);
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
  const leftdirections: number[] = [nowfacing.reverse()[0] * -1, nowfacing.reverse()[1] * -1];
  const frontdirections: number[] = nowfacing;
  const rightdirections: number[] = [nowfacing.reverse()[0], nowfacing.reverse()[1]];
  const behindirectons: number[] = [nowfacing[0] * -1, nowfacing[1] * -1];
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
  return behindirectons;
};
