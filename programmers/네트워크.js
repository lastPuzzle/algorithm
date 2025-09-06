function solution(n, computers) {
  var answer = 0;
  const visited = Array.from(n).fill(false);

  function BFS(i) {
    let queue = [i];
    visited[i] = true;

    while (queue.length > 0) {
      const current = queue.shift();
      for (let i = 0; i < computers[current].length; i++) {
        if (computers[current][i] === 1 && !visited[i]) {
          visited[i] = true;
          queue.push(i);
        }
      }
    }
  }

  for (var i = 0; i < n; i++) {
    if (!visited[i]) {
      BFS(i);
      answer++;
    }
  }
  return answer;
}
