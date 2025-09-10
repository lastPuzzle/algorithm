function solution(n) {
  var answer = 0;
  var numbers = Array.from({ length: n }, (_, k) => k + 1);
  var check = 0;

  while (check < n) {
    var sum = 0;
    for (var i = check; i < numbers.length; i++) {
      sum += numbers[i];
      if (sum === n) {
        answer++;
        break;
      }
      if (sum > n) break;
    }
    check++;
  }

  return answer;
}
