// Directed graph:
//
//      1   2   3   4   5   6   7
//
//  1           1   1   1
//
//  2               1
//
//  3   1                       1
//
//  4                   1
//
//  5                       1   1
//
//  6                           1
//
//  7

// Undirected graph:
//
//      1   2   3   4   5   6   7
//
//  1           1   1   1
//
//  2               1
//
//  3   1                       1
//
//  4   1   1           1
//
//  5   1           1       1   1
//
//  6                   1       1
//
//  7           1       1   1

// The weight w(u, v) of the edge (u, v) can be stored in the u row and v column
// of the adjacency matrix.

class MatrixGraph {
    constructor(directed = false) {
        this.matrix = []; // adjacency matrix, 1-based indexes
        this.degree = []; // degree of each vertex
        this.vertexCount = 0;
        this.edgeCount = 0;
        this.directed = directed;
    }

    insertEdge(x, y, directed) {
        (this.matrix[x] || (this.matrix[x] = []))[y] = 1;
        this.degree = (this.degree[x] || 0) + 1;

        if (directed) {
            this.edgeCount++;
        } else {
            this.insertEdge(y, x, true);
        }
    }

    /**
     * Parses an array of strings in the following format into
     * an adjacency list:
     * First line:                 '<vertexCount> <edgeCount>'
     * Subsequent edgeCount lines: '<vertexIndex> <vertexIndex>'
     * @param lines String[]
     * @param directed Boolean
     * @return {MatrixGraph}
     */
    static readGraph(lines, directed) {
        let ln = lines.length;
        let graph;

        if (ln) {
            graph = new MatrixGraph();
            let header = lines[0];
            let counts = header.split(' ');
            graph.vertexCount = parseInt(counts[0], 10);
            let edgeCount = parseInt(counts[1], 10);

            for (let i = 1; i <= edgeCount; i++) {
                let line = lines[i];
                let xy = line.split(' ');
                let x = parseInt(xy[0], 10);
                let y = parseInt(xy[1], 10);

                graph.insertEdge(x, y, directed);
            }
        }

        return graph;
    }

    _padIndex(index, padS = 3, padE = 4) {
        index = index && typeof index === 'number' && isFinite(index)
            ? index.toString() : '';
        return index.padStart(padS).padEnd(padE);
    }

    printGraph() {
        let n = this.vertexCount;
        let matrix = this.matrix;
        let emptyArr = [];

        for (let x = 0; x <= n; x++) {
            let s = this._padIndex(x);
            let yy = matrix[x] || emptyArr;
            for (let y = 1; y <= n; y++) {
                if (!x) {
                    s += this._padIndex(y);
                } else {
                    s += this._padIndex(yy[y]);
                }
            }
            console.log(s + '\n');
        }
    }
}

{
    let lines = [
        '7 10', // 7 vertices, 10 edges (next 10 lines)
        '1 5',
        '1 4',
        '1 3',
        '2 4',
        '3 1',
        '3 7',
        '4 5',
        '5 6',
        '5 7',
        '6 7'
    ];

    let directedGraph = MatrixGraph.readGraph(lines, true);
    let undirectedGraph = MatrixGraph.readGraph(lines, false);

    console.log('\nDirected graph:\n');
    directedGraph.printGraph();

    console.log('\nUndirected graph:\n');
    undirectedGraph.printGraph();
}