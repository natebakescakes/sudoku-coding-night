const getArrayKey = (row, col) => `${Math.floor(row / 3)}${Math.floor(col / 3)}`;

const getArrayIndex = (row, col) => (row % 3) * 3 + (col % 3);

const validSolution = (solution) => {
  const validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (solution.length !== 9) {
    return false;
  }

  if (solution.some(row => row.length !== 9)) {
    return false;
  }

  const copy = solution.map(row => row.slice());
  if (copy.some(row => JSON.stringify(row.sort()) !== JSON.stringify(validNumbers))) {
    return false;
  }

  const transposed = Object.keys(solution[0]).map(c => solution.map(r => r[c]));
  if (transposed.some(row => JSON.stringify(row.sort()) !== JSON.stringify(validNumbers))) {
    return false;
  }

  for (let i = 0; i < 9; i += 1) {
    const row = solution[i];
    for (let j = 0; j < 9; j += 1) {
      if (!validNumbers.includes(row[j])) {
        return false;
      }
    }
  }

  const arrayMap = {};
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      arrayMap[`${i}${j}`] = [];
    }
  }

  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      arrayMap[getArrayKey(i, j)][getArrayIndex(i, j)] = solution[i][j];
    }
  }

  if (
    Object.keys(arrayMap)
      .map(key => arrayMap[key])
      .every(row => JSON.stringify(row.sort()) !== JSON.stringify(validNumbers))
  ) {
    return false;
  }

  return true;
};

module.exports = { validSolution };
