'use client';

import { useEffect, useState } from 'react';
import { createMaze } from '../lib';
import styles from './page.module.css';

export default function Home() {
  const [user, setUser] = useState({
    x: 0,
    y: 0,
    facing: { north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0] },
    nowfacing: [0, -1],
  });

  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [facing, setFacing] = useState<[number, number]>([1, 0]);

  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const newboard = structuredClone(board);
  const isfirst = (board: number[][]) => board.flat().filter((c) => c === 1).length === 64;

  useEffect(() => {
    if (isfirst(board)) {
      const array = createMaze(board);
      setBoard(array);
    }
  }, [board]);
  // console.log(board);

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((num, x) => (
            <div
              key={`${x}-${y}`}
              className={styles.cell}
              style={{ backgroundColor: num === 1 ? 'black' : 'skyblue' }}
            >
              {y === user.y && x === user.x && (
                <div className={styles.facing}>
                  {user.facing.south
                    ? '下'
                    : facing[0] === 1
                      ? '右'
                      : facing[0] === -1
                        ? '左'
                        : '上'}
                </div>
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
