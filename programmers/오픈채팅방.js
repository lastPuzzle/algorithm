function solution(record) {
  const answer = [];
  const nicknames = new Map();

  const enterText = "님이 들어왔습니다.";
  const leaveText = "님이 나갔습니다.";

  for (const log of record) {
    const [state, id, nickname] = log.split(" ");

    switch (state) {
      case "Change":
        nicknames.set(id, nickname);
        break;
      case "Enter":
        nicknames.set(id, nickname);
        answer.push({ id, state });
        break;
      case "Leave":
        answer.push({ id, state });
        break;
    }
  }

  for (let i = 0; i < answer.length; i++) {
    const { id, state } = answer[i];
    const text = state === "Enter" ? enterText : leaveText;
    answer[i] = nicknames.get(id) + text;
  }

  return answer;
}
