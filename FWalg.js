function floydWarshall(graph) {
    const n = graph.length;
    const dist = new Array(n).fill(null).map(() => new Array(n));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            dist[i][j] = graph[i][j];
        }
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] != Infinity && dist[k][j] != Infinity && dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    return dist;
}

// Пример матрицы смежности графа
const graph = [
    [0, 5, Infinity, 3],
    [2, 0, 7, Infinity],
    [Infinity, 1, 0, 2],
    [Infinity, Infinity, 4, 0]
];

const result = floydWarshall(graph);
console.log(result);