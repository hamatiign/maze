'use client';

import { useEffect, useState } from 'react';
import { chooseway, createMaze } from '../utils';
import styles from './page.module.css';

export default function Home() {
  const [user, setUser] = useState({
    x: 0,
    y: 0,
    facing: { north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0] },
    nowfacing: [0, -1],
  });

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

  // const newboard = structuredClone(board);
  const isfirst = (board: number[][]) => board.flat().filter((c) => c === 1).length === 64;

  useEffect(() => {
    if (isfirst(board)) {
      const array = createMaze(board);
      setBoard(array);
    }
  }, [board]);
  // console.log(board);

  useEffect(() => {
    const interval = setInterval(() => {
      if (user.x === board.length - 1 && user.y === board.length - 1) return;
      const selectedway = chooseway(user.x, user.y, user.nowfacing, board);

      setUser((prev) => ({
        ...prev,
        x: user.x + selectedway[0],
        y: user.y + selectedway[1],
        nowfacing: selectedway,
      }));

      console.log('prevx', user.x, 'prevy', user.y, 'prevnowfacing', user.nowfacing, selectedway);
      // user.x = user.x + user.nowfacing[0];
      // user.y = user.y + user.nowfacing[1];
    }, 1000);
    return () => clearInterval(interval);
  }, [board, user]);

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
                  {user.nowfacing[1] === 1
                    ? '下'
                    : user.nowfacing[0] === 1
                      ? '右'
                      : user.nowfacing[0] === -1
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
