const solution = (rows, columns, queries) => {
  const matrix = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: columns }, (_, c) => r * columns + c + 1)
  );

  return queries.map(([x1, y1, x2, y2]) => {
    const coords = getBorderCoords(x1 - 1, y1 - 1, x2 - 1, y2 - 1);
    const values = coords.map(([r, c]) => matrix[r][c]);
    console.log(values);
    const rotated = [values.pop(), ...values];
    console.log(rotated);

    coords.forEach(([r, c], i) => (matrix[r][c] = rotated[i]));

    return Math.min(...rotated);
  });
};

const getBorderCoords = (x1, y1, x2, y2) => [
  ...Array.from({ length: y2 - y1 }, (_, i) => [x1, y1 + i]),
  ...Array.from({ length: x2 - x1 }, (_, i) => [x1 + i, y2]),
  ...Array.from({ length: y2 - y1 }, (_, i) => [x2, y2 - i]),
  ...Array.from({ length: x2 - x1 }, (_, i) => [x2 - i, y1]),
];
