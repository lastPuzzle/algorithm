function timeToNumber(time) {
  return Number(`${time.slice(0, 2)}${time.slice(3, 5)}`);
}

function numberToTime(number) {
  const time = number.toString().padStart(4, "0");
  const hour = time.slice(0, 2);
  let minute = time.slice(2, 4);
  if (Number(minute) > 60) {
    minute = (60 - (100 - Number(minute))).toString().padStart(2, "0");
  }

  return `${hour}:${minute}`;
}

function getBusTimes(count, interval) {
  const startMinutes = 9 * 60;
  const times = [];

  for (let i = 0; i < count; i++) {
    const total = startMinutes + i * interval;
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    times.push(hours * 100 + minutes);
  }

  return times;
}

function sortTimetable(timetable) {
  return timetable.map((v) => timeToNumber(v)).sort((a, b) => a - b);
}

function solution(n, t, m, timetable) {
  const busTimes = getBusTimes(n, t);
  const sortedTimetable = sortTimetable(timetable);
  let lastCrewIndex = 0;
  let answer = "";
  let busCount = 0;

  while (busCount < busTimes.length) {
    busCount++;
    let count = 0;

    for (let j = lastCrewIndex; j < sortedTimetable.length; j++) {
      if (sortedTimetable[j] <= busTimes[busCount - 1] && count < m) {
        count++;
        lastCrewIndex++;
      }
    }

    if (busCount === busTimes.length) {
      if (count < m) {
        answer = busTimes[busCount - 1];
      } else {
        answer = sortedTimetable[lastCrewIndex - 1] - 1;
      }
    }
  }

  return numberToTime(answer);
}
