function uniqueCombinationCount(arrays) {
  const set = new Set();

  arrays.forEach((inner) => {
    const sorted = [...inner].sort();
    set.add(JSON.stringify(sorted));
  });

  return set.size;
}

function solution(user_id, banned_id) {
  var user = [];

  function DFS(l, count, data) {
    if (l === banned_id.length && count === 0) {
      user.push(data);
      return;
    } else {
      for (var i = 0; i < user_id.length; i++) {
        if (banned_id[l].length !== user_id[i].length) continue;
        if (data.includes(user_id[i])) continue;

        var count = 0;
        for (var j = 0; j < banned_id[l].length; j++) {
          if (banned_id[l][j] !== "*") {
            count++;
            if (banned_id[l][j] === user_id[i][j]) {
              count--;
            }
          }
        }

        if (count === 0) {
          DFS(l + 1, count, [...data, user_id[i]]);
        }
      }
    }
  }

  DFS(0, 0, []);

  return uniqueCombinationCount(user);
}
