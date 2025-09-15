function solution(k, dungeons) {
  var answer = -1;
  const visited = new Array(dungeons.length).fill(false);

  function DFS(currentK, count) {
    answer = Math.max(answer, count);

    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && currentK >= dungeons[i][0]) {
        visited[i] = true;
        DFS(currentK - dungeons[i][1], count + 1);
        visited[i] = false;
      }
    }
  }

  DFS(k, 0);

  return answer;
}
