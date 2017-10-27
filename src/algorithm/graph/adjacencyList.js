class EdgeNode {
    constructor(y, next = null) {
        this.index = y;       // adjacency info
        this.next = next;     // next edge in list
    }
}

// Adjacency list - array where each element is a linked list (EdgeNode).
// Specifies which other vertices each vertex is connected to by an edge.
//
// Directed graph:
//
//     [1] -> 3 -> 4 -> 5
//     [2] -> 4
//     [3] -> 7 -> 1
//     [4] -> 5
//     [5] -> 7 -> 6
//     [6] -> 7
//     [7]

// In a directed graph the length of all linked lists (not counting the head)
// is equal to the number of edges in the graph.
// In the above graph, combined length is 10 and the number of edges is 10.

// In an undirected graph, the length of all linked lists (not counting the head)
// is twice the number of edges in the graph.
// In the below graph, combined length is 20 and the number of edges is 10.
//
// Undirected graph:
//
//     [1] -> 3 -> 4 -> 5
//     [2] -> 4
//     [3] -> 7 -> 1
//     [4] -> 5 -> 2 -> 1
//     [5] -> 7 -> 6 -> 4 -> 1
//     [6] -> 7 -> 5
//     [7] -> 6 -> 5 -> 3

// The weight w(u, v) of the edge (u, v) can be stored in the vertex v
// of the u's adjacency list.

// Drawbacks:
// - can't quickly check if (u, v) is in graph, other than to look for v in u's list

class ListGraph {
    constructor(directed = false) {
        this.edges = [];  // adjacency info (as shown above), 1-based indexes
        this.degree = []; // degree of each vertex, 1-based indexes
        this.vertexCount = 0;
        this.edgeCount = 0;
        this.directed = directed;
    }

    exists(x, y) {
        let node = this.edges[x];
        while (node) {
            if (node.index === y)
                return true;
            node = node.next;
        }
        return false;
    }

    insertEdge(x, y, directed = false) {
        if (this.exists(x, y))
            return;

        let edges = this.edges;
        edges[x] = new EdgeNode(y, edges[x]); // insert at head of list
        this.degree[x] = (this.degree[x] || 0) + 1;

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
     * @return {ListGraph}
     */
    static readGraph(lines, directed) {
        let ln = lines.length;
        let graph;

        if (ln) {
            graph = new ListGraph();
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

    printGraph() {
        let vertexCount = this.vertexCount;
        for (let i = 1; i <= vertexCount; i++) {
            let edgeNode = this.edges[i];
            let str = `[${i}]`;
            while (edgeNode) {
                str += ` -> ${edgeNode.index}`;
                edgeNode = edgeNode.next;
            }
            console.log(str);
        }
    }

    /*
    Breadth-first search is so named because it expands the frontier between
    discovered and undiscovered vertices uniformly across the breadth of the
    frontier. That is, the algorithm discovers all vertices at distance k from s
    before discovering any vertices at distance k + 1.
    */

    /**
     * Breadth-first search.
     * @param {Number} start The index of the root vertex.
     * @param {Function} processVertex Passed a vertex index.
     * @param {Function} processEdge Passed two vertex indexes.
     */
    bfs(start, processVertex, processEdge) {
        if (!start) return;

        let state = [];  // vertexIndex -> 0 | 1 | 2
        let parent = []; // vertexIndex -> vertexIndex
        let queue = [];  // of vertexIndex
        let depth = [];

        // Since a vertex is discovered at most once, it has at most one parent.

        depth[start] = 0;
        state[start] = 1; // discovered

        queue.push(start);
        while (queue.length) {
            let u = queue.shift();
            processVertex(u);

            let p = this.edges[u];
            while (p) {
                let v = p.index;
                if (!state[v]) {             // undiscovered
                    processEdge(u, v);
                    state[v] = 1;            // discovered
                    parent[v] = u;           // u is a parent of v
                    depth[v] = depth[u] + 1;
                    queue.push(v);
                } else if (this.directed) {
                    processEdge(u, v);
                }
                p = p.next;
            }
            state[u] = 2; // processed
        }
        return parent;
    }

    traverse(index) {
        this.bfs(index,
            (x) => {
                console.log(x);
            },
            (x, y) => {
                console.log(`(${x}, ${y})`);
            });
    }
}

// We represent directed edge (x,y) by an EdgeNode y in x's adjacency list.
// The 'degree' field counts the number of meaningful entries for the given vertex.
// An undirected edge (x,y) appears twice in any adjacency-based graph structure:
// once as y in x's list, once in x in y's list.
// The 'directed' flag tells us how to interpret the given graph (directed or not).

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

    let directedGraph = ListGraph.readGraph(lines, true);
    let undirectedGraph = ListGraph.readGraph(lines, false);

    console.log('\nDirected graph:\n');
    directedGraph.printGraph();

    console.log('\nUndirected graph:\n');
    undirectedGraph.printGraph();

    console.log('\nTraverse directed graph:\n');
    directedGraph.traverse(1);

    // Traverse directed graph:
    //
    // 1
    // (1, 3)
    // (1, 4)
    // (1, 5)
    // 3
    // (3, 7)
    // 4
    // 5
    // (5, 6)
    // 7
    // 6

    console.log('\nTraverse undirected graph:\n');
    undirectedGraph.traverse(1);

    // Traverse undirected graph:
    //
    // 1
    // (1, 3)
    // (1, 4)
    // (1, 5)
    // 3
    // (3, 7)
    // 4
    // (4, 2)
    // 5
    // (5, 6)
    // 7
    // 2
    // 6
}