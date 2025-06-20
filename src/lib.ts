import { directions } from './constans';

export const createMaze = (baseboard: number[][]): number[][] => {
  let array = baseboard.map((row) => [...row]);
  for (let i = 0; i < baseboard.length; i++) {
    for (let j = 0; j < baseboard.length; j++) {
      const randomindex = Math.floor(Math.random() * 4);
      if (baseboard[i][j] === 1) {
        array[i + directions[randomindex][1]][j + directions[randomindex][0]] = 1;
      }
    }
  }
  return array;
};
