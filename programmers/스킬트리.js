function solution(skill, skill_trees) {
  let answer = 0;
  const skillSet = new Set(skill);

  for (let tree of skill_trees) {
    const filtered = tree
      .split("")
      .filter((char) => skillSet.has(char))
      .join("");
    if (skill.startsWith(filtered)) {
      answer++;
    }
  }

  return answer;
}
