function solution(begin, target, words) {
  var answer = Number.MAX_SAFE_INTEGER;
  var n = words.length;
  var visited = new Array(n).fill(false);

  function DFS(word, count) {
    if (word === target) {
      answer = Math.min(answer, count);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (!visited[i] && canTransform(word, words[i])) {
        visited[i] = true;
        DFS(words[i], count + 1);
        visited[i] = false;
      }
    }
  }

  function canTransform(word1, word2) {
    let diff = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        diff++;
      }
    }
    return diff === 1;
  }

  DFS(begin, 0);

  return answer === Number.MAX_SAFE_INTEGER ? 0 : answer;
}
