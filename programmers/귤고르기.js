function solution(k, tangerine) {
  const sizeCount = new Map();

  for (const size of tangerine) {
    sizeCount.set(size, (sizeCount.get(size) || 0) + 1);
  }

  const sortedSizes = Array.from(sizeCount.values()).sort((a, b) => b - a);

  let answer = 0;

  for (const count of sortedSizes) {
    answer++;
    k -= count;

    if (k <= 0) {
      break;
    }
  }

  return answer;
}
