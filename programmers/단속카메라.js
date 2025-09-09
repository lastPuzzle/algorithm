function solution(routes) {
  routes.sort((a, b) => a[1] - b[1]);

  let cameraCount = 0;
  let lastCameraPosition = -30001;

  for (let route of routes) {
    const [start, end] = route;

    if (start > lastCameraPosition) {
      cameraCount++;
      lastCameraPosition = end;
    }
  }

  return cameraCount;
}
