function solution(m, n, board) {
  const createBoard = (board) => board.map((v) => v.split(""));

  const create2DArray = (rows, cols, value) =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => value)
    );

  const checkRemovableBlocks = (boardArr, m, n) => {
    const directions = [
      [1, 1, 0],
      [0, 1, 1],
    ];
    const [nx, ny] = directions;

    return create2DArray(m, n, 1).map((row, i) =>
      row.map((_, j) => {
        if (i >= m - 1 || j >= n - 1) return 1;

        const current = boardArr[i][j];
        if (current === 0) return 1;

        const matches = nx.every((dx, k) => {
          const newI = i + dx;
          const newJ = j + ny[k];
          return newI < m && newJ < n && boardArr[newI][newJ] === current;
        });

        return matches ? 0 : 1;
      })
    );
  };

  const markConnectedBlocks = (checkArr, m, n) => {
    const newCheckArr = checkArr.map((row) => [...row]);

    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (checkArr[i][j] === 0) {
          [
            [0, 1],
            [1, 0],
            [1, 1],
          ].forEach(([dx, dy]) => {
            newCheckArr[i + dx][j + dy] = 0;
          });
        }
      }
    }

    return newCheckArr;
  };

  const removeBlocks = (boardArr, checkArr, m, n) => {
    let count = 0;
    const newBoard = boardArr.map((row, i) =>
      row.map((cell, j) => {
        if (checkArr[i][j] === 0) {
          count++;
          return 0;
        }
        return cell;
      })
    );
    return { newBoard, count };
  };

  const dropBlocks = (boardArr, m, n) => {
    return Array.from({ length: m }, (_, i) =>
      Array.from({ length: n }, (_, j) => {
        const column = Array.from(
          { length: m },
          (_, row) => boardArr[row][j]
        ).filter((cell) => cell !== 0);

        const paddedColumn = [...Array(m - column.length).fill(0), ...column];

        return paddedColumn[i];
      })
    );
  };

  const hasBlocksToRemove = (checkArr) =>
    checkArr.some((row) => row.some((cell) => cell === 0));

  const gameLoop = (boardArr, totalRemoved = 0) => {
    const checkArr = checkRemovableBlocks(boardArr, m, n);
    const markedCheckArr = markConnectedBlocks(checkArr, m, n);

    if (!hasBlocksToRemove(markedCheckArr)) {
      return totalRemoved;
    }

    const { newBoard, count } = removeBlocks(boardArr, markedCheckArr, m, n);
    const droppedBoard = dropBlocks(newBoard, m, n);

    return gameLoop(droppedBoard, totalRemoved + count);
  };

  const initialBoard = createBoard(board);
  return gameLoop(initialBoard);
}
