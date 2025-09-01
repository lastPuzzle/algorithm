/*
    1. 1번 마을로 부터 각 마을을 가는 최단거리 구하는 문제
    2. 인접리스트 형식으로 구현 필요 
*/
function solution(N, road, K) {
    const createGraph = (N, road) => {
        const graph = Array.from({length: N + 1}, () => []);
        road.forEach(([from, to, cost]) => {
            graph[from].push([to, cost]);
            graph[to].push([from, cost]);
        });
        return graph;
    };
    
    const findMinDistances = (graph, N) => {
        const distance = Array.from({length: N + 1}, () => Number.MAX_SAFE_INTEGER);
        const visited = Array.from({length: N + 1}, () => false);
        distance[1] = 0;
        
        const dfs = (current, sum) => {
            if(sum > K) return;
            
            distance[current] = Math.min(distance[current], sum);
            
            graph[current].forEach(([next, cost]) => {
                if(!visited[next] && sum + cost < distance[next]) {
                    visited[next] = true;
                    dfs(next, sum + cost);
                    visited[next] = false;
                }
            });
        };
        
        visited[1] = true;
        dfs(1, 0);
        return distance;
    };
    
    const countReachableVillages = (distances, K) => 
        distances.filter(dist => dist <= K).length;
    
    const graph = createGraph(N, road);
    const distances = findMinDistances(graph, N);
    return countReachableVillages(distances, K);
};