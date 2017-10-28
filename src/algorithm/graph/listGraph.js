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
            graph = new ListGraph(directed);
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
     *
     * Linear time:
     * O(|V|+|E|) for both directed and undirected graphs (unweighted)
     * because we process each vertex and edge only once.
     */
    bfs(start, options = {}) {
        if (!(start && options)) return;

        let pVe = options.processVertexEarly;
        let pVl = options.processVertexLate;
        let pE = options.processEdge;

        let state = options.state || [];  // vertexIndex -> 0 | 1 | 2
        let parent = []; // vertexIndex -> vertexIndex
        let depth = [];  // vertexIndex -> Number

        // Since a vertex is discovered at most once, it has at most one parent.
        // The `parent` array represents the discovery tree. Because vertices
        // are discovered in order of increasing distance from the root, the unique
        // path from each vertex to the root uses the smallest number of edges
        // possible.

        depth[start] = 0;
        state[start] = 1; // discovered

        let queue = [];   // process queue of vertexIndex
        queue.push(start);
        while (queue.length) {
            let u = queue.shift();
            pVe && pVe(u); // process vertex early

            let p = this.edges[u];           // cursor for list walking
            while (p) {
                let v = p.index;
                if (state[v] !== 2 || this.directed) {
                    // If the vertex we link to hasn't been processed yet
                    // in an undirected graph, it means that:
                    // - either we just discovered it
                    //   and so we should process this edge;
                    // - or this vertex has been already discovered
                    //   from another vertex, but this edge is still new
                    //   and we should process it.
                    // In a directed graph all back-links are unique and
                    // should be processed.
                    pE && pE(u, v);          // process edge
                }
                if (!state[v]) {             // undiscovered
                    state[v] = 1;            // discovered
                    parent[v] = u;           // u is a parent of v
                    depth[v] = depth[u] + 1;
                    queue.push(v);
                }
                p = p.next;
            }
            state[u] = 2;  // processed
            pVl && pVl(u); // process vertex late
        }
        return {parent, depth, state};
    }

    getConnectedComponents({toNode, toLink} = {}) {
        let k = this.vertexCount;
        let components = [];
        let state;

        toNode = toNode || (v => v);
        toLink = toLink || ((u, v) => [u, v]);

        for (let i = 1; i <= k; i++) {
            if (!state || !state[i]) {
                let nodes = [];
                let links = [];

                state = this.bfs(i, {state,
                    processVertexEarly: v => nodes.push(toNode(v)),
                    processEdge: (u, v) => links.push(toLink(u, v))
                }).state;

                components.push({nodes, links});
            }
        }

        return components;
    }

    findPath(start, end, parent, print = false) {
        if (!start || start >= end) return;

        let path = [];
        let cursor = end;

        while (cursor && start !== cursor) {
            path.push(cursor);
            cursor = parent[cursor];
        }

        if (start === cursor) {
            path.push(start);
            path.reverse();
        } else {
            path = null;
        }

        if (print) {
            let graph = (this.directed ? '' : 'un') + 'directed';
            if (path) {
                console.log(`\nShortest path from ${start} to ${end} (${graph}):\n`
                    + path.join(' -> '));
            } else {
                console.log(`\n${end} can't be reached from ${start} (${graph}).`);
            }
        }

        return path;
    }

    // Reverse the path using recursion.
    findPathR(start, end, parent) {
        if (start === end || !end) {
            console.log(start);
        } else {
            this.findPathR(start, parent[end], parent);
            console.log(end);
        }
    }

    traverse(index) {
        this.bfs(index, {
            processVertexEarly: (x) => {
                console.log(x);
            },
            processEdge: (x, y) => {
                console.log(`(${x}, ${y})`);
            }
        });
    }
}

export { ListGraph, EdgeNode }

// We represent directed edge (x,y) by an EdgeNode y in x's adjacency list.
// The 'degree' field counts the number of meaningful entries for the given vertex.
// An undirected edge (x,y) appears twice in any adjacency-based graph structure:
// once as y in x's list, once in x in y's list.
// The 'directed' flag tells us how to interpret the given graph (directed or not).

function examples() {
    let graphSpec = [
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

    let directedGraph = ListGraph.readGraph(graphSpec, true);
    let undirectedGraph = ListGraph.readGraph(graphSpec, false);

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
    // (3, 1)
    // 4
    // (4, 5)
    // 5
    // (5, 7)
    // (5, 6)
    // 7
    // 6
    // (6, 7)
    //
    // Out of total 7 vertices and 10 edges, 6 vertices and 9 edges are listed,
    // because vertex 2 and edge (2,4) are unreachable in this directed graph
    // if traversal is started from vertex #1.

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
    // (4, 5)
    // (4, 2)
    // 5
    // (5, 7)
    // (5, 6)
    // 7
    // (7, 6)
    // 2
    // 6

    // There are two points to remember when using breadth-first search
    // to find a shortest path from x to y:
    // 1) the shortest path tree is only useful if BFS was performed with x
    //    as the root of the search;
    // 2) BFS gives the shortest path only if the graph is unweighted.

    undirectedGraph.findPath(2, 7, undirectedGraph.bfs(2).parent, true);
    // Notice how we had to use 2 as the root for the breadth-first search
    // to generate the child-parent tree to be used by findPath.
    console.log('\nFind and print the above path using recursion:\n');
    undirectedGraph.findPathR(2, 7, undirectedGraph.bfs(2).parent);

    directedGraph.findPath(1, 2, directedGraph.bfs(1).parent, true);

    {
        let comps = undirectedGraph.getConnectedComponents();
        console.log(JSON.stringify(comps, null, 4));
    }

    {
        let comps = directedGraph.getConnectedComponents();
        console.log(JSON.stringify(comps, null, 4));
    }
}

examples();