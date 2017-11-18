class Link {
    constructor(y, next = null) {
        this.index = y;       // the vertex `y` that `x` has as a neighbour
        this.next = next;     // next Link (another neighbour of `x`), if any
    }
}

// Naming convention:
//
//     node = vertex
//     link = edge
//
// Variable names lean in favor of `node` and `link` while in comments
// node/vertex and link/edge can be used interchangeably.

// Adjacency list - array where each element is a linked list of Links.
// Specifies which other vertices each vertex is connected to by an edge.
//
// Directed graph:
//
//    index      [n] - indexes of the `links` array, where n is the vertex (node) index
//      |        (n) - instances of Link, with instance `index` set n
//      V
//     [1] -> (3) -> (4) -> (5)
//     [2] -> (4)
//     [3] -> (7) -> (1)
//     [4] -> (5)
//     [5] -> (7) -> (6)
//     [6] -> (7)
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
//     [1] -> (3) -> (4) -> (5)
//     [2] -> (4)
//     [3] -> (7) -> (1)
//     [4] -> (5) -> (2) -> (1)
//     [5] -> (7) -> (6) -> (4) -> (1)
//     [6] -> (7) -> (5)
//     [7] -> (6) -> (5) -> (3)

// The weight w(u, v) of the edge (u, v) can be stored in the vertex v
// of the u's adjacency list.

// Drawbacks:
// - can't quickly check if (u, v) is in graph, other than to look for v in u's list

// We represent directed edge (x,y) by an Link y in x's adjacency list.
// The 'degree' field counts the number of meaningful entries for the given vertex.
// An undirected edge (x,y) appears twice in any adjacency-based graph structure:
// once as y in x's list, once in x in y's list.
// The 'directed' flag tells us how to interpret the given graph (directed or not).

class ListGraph {
    constructor(directed = false) {
        this.links = [];  // adjacency info (as shown above), 1-based indexes
        this.degree = []; // degree of each node, 1-based indexes
        this.nodeCount = 0;
        this.linkCount = 0;
        this.directed = directed;
    }

    exists(x, y) {
        let node = this.links[x];
        while (node) {
            if (node.index === y)
                return true;
            node = node.next;
        }
        return false;
    }

    insertLink(x, y, directed = false) {
        if (this.exists(x, y))
            return;

        let links = this.links;
        links[x] = new Link(y, links[x]); // insert at head of list
        this.degree[x] = (this.degree[x] || 0) + 1;

        if (directed) {
            this.linkCount++;
        } else {
            this.insertLink(y, x, true);
        }

    }

    /**
     * Parses an array of strings in the following format into
     * an adjacency list:
     * First line:                 '<nodeCount> <linkCount>'
     * Subsequent linkCount lines: '<nodeIndex> <nodeIndex>'
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
            graph.nodeCount = parseInt(counts[0], 10);
            let linkCount = parseInt(counts[1], 10);

            for (let i = 1; i <= linkCount; i++) {
                let line = lines[i];
                let xy = line.split(' ');
                let x = parseInt(xy[0], 10);
                let y = parseInt(xy[1], 10);

                graph.insertLink(x, y, directed);
            }
        }

        return graph;
    }

    printGraph() {
        let nodeCount = this.nodeCount;
        for (let i = 1; i <= nodeCount; i++) {
            let link = this.links[i];
            let str = `[${i}]`;
            while (link) {
                str += ` -> ${link.index}`;
                link = link.next;
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

    // Breadth-first search.
    // Linear time:
    // O(|V|+|E|) for both directed and undirected graphs (unweighted)
    // because we process each vertex and edge only once.
    bfs(start, {processNodeSoon, processNodeLate, processLink, state = []} = {}) {
        if (!start) return;

        let parent = []; // vertexIndex -> vertexIndex
        let depth = [];  // vertexIndex -> Number

        // Since a vertex is discovered at most once, it has at most one parent.
        // The `parent` array represents the discovery tree. Because vertices
        // are discovered in order of increasing distance from the root, the unique
        // path from each vertex to the root uses the smallest number of edges
        // possible.

        depth[start] = 0;
        state[start] = 1; // discovered

        let queue = [start];   // process queue of vertexIndex

        while (queue.length) {
            let u = queue.shift();
            processNodeSoon && processNodeSoon(u);

            let p = this.links[u];           // cursor for list walking
            while (p) {
                let v = p.index;
                if (state[v] !== 2 || this.directed) {
                    // If the vertex we link to hasn't been processed yet,
                    // it means that:
                    // - either we just discovered it
                    //   and so we should process this edge;
                    // - or this vertex has been already discovered
                    //   from another vertex, but this edge is still new
                    //   and we should process it.
                    // For undirected graphs this check will prevent
                    // listing the same link twice: first from parent to
                    // child, then from child to parent, because the parent
                    // will have been processed by the time we check out
                    // child's links.
                    // In a directed graph, all back-links are unique and
                    // should be processed.
                    processLink && processLink(u, v);
                }
                if (!state[v]) {             // undiscovered
                    state[v] = 1;            // discovered
                    parent[v] = u;           // u is a parent of v
                    depth[v] = depth[u] + 1;
                    queue.push(v);
                }
                p = p.next;
            }
            processNodeLate && processNodeLate(u);
            state[u] = 2;  // processed
        }
        return {parent, depth, state};
    }

    bfsBasicQueue(start) {
        let visited = [];
        let queue = [start];
        visited[start] = true;

        while (queue.length) {
            let u = queue.shift();
            console.log(u);

            let link = this.links[u];
            while (link) {
                let v = link.index;
                if (!visited[v]) {
                    visited[v] = true;
                    queue.push(v);
                }
                link = link.next;
            }
        }
    }

    bfsAdvancedQueue(start) {
        let state = [];
        let queue = [start];
        state[start] = 1; // discovered

        while (queue.length) {
            let u = queue.shift();
            console.log(`Node: ${u}`);

            let link = this.links[u];
            while (link) {
                let v = link.index;
                if (state[v] !== 2 || this.directed) {
                    console.log(`Link: ${u} - ${v}`);
                }
                if (!state[v]) {
                    state[v] = 1;
                    queue.push(v);
                }
                link = link.next;
            }
            state[u] = 2;
        }
    }

    dfsBasicRecursive(start) {
        let links = this.links;
        let visited = [];

        function visit(u) {
            let link = links[u];

            while (link) {
                let v = link.index;
                if (!visited[v]) {
                    visited[v] = true;
                    console.log(v);
                    visit(v);
                }
                link = link.next;
            }
        }

        visited[start] = 1;
        console.log(start);

        visit(start);
    }

    /**
     * @typedef {Object} FurthestNodeResult
     * @property {Number} node The index of the furthest node.
     * @property {Number} distance The number of edges to the furthest node.
     */

    /**
     * The function returns the number of edges to the furthest node.
     * The diameter of a graph is "the number of nodes on the longest path",
     * so just add 1 to the returned distance to get the diameter.
     * @param {Number} start The index of the start node.
     * @return {FurthestNodeResult} The index of the furthest node and the distance to it.
     */
    findFurthestNode(start) {
        // To find the diameter of graph simply performs a depth-first search
        // from the start node, while keeping track of the distance on each
        // recursive descent.
        let links = this.links;
        let visited = [];
        let maxDistance = 0;
        let furthestNode = null;

        function search(u, distance = 0) {
            if (distance > maxDistance) {
                maxDistance = distance;
                furthestNode = u;
            }

            let link = links[u];
            while (link) {
                let v = link.index;
                if (!visited[v]) {
                    visited[v] = true;
                    search(v, distance + 1);
                }
                link = link.next;
            }
        }

        visited[start] = true;
        search(start);

        return {
            node: furthestNode,
            distance: maxDistance
        };
    }

    dfsBasicStack(start) {
        let visited = [];
        let stack = [start];

        while (stack.length) {
            let u = stack.pop();
            if (!visited[u]) {
                visited[u] = true;
                console.log(u);
                let link = this.links[u];
                while (link) {
                    if (!visited[link.index]) {
                        stack.push(link.index);
                    }
                    link = link.next;
                }
            }
        }
    }

    dfsAdvancedStack(start) {
        let visited = [];
        let stack = [start];

        visited[start] = true;
        console.log(start);

        while (stack.length) {
            let u = stack.pop();
            let link = this.links[u];
            while (link && visited[link.index]) {
                link = link.next;
            }
            // if there's at least one unvisited vertex adjacent to u
            if (link) {
                let v = link.index;
                stack.push(u);
                visited[v] = true;
                console.log(v);
                stack.push(v);
            }
        }
    }

    getConnectedComponents({toNode, toLink} = {}) {
        let k = this.nodeCount;
        let components = [];
        let state;

        toNode = toNode || (v => v);
        toLink = toLink || ((u, v) => [u, v]);

        for (let i = 1; i <= k; i++) {
            if (!state || !state[i]) {
                let nodes = [];
                let links = [];

                state = this.bfs(i, {state,
                    processNodeSoon: v => nodes.push(toNode(v)),
                    processLink: (u, v) => links.push(toLink(u, v))
                }).state;

                components.push({nodes, links});
            }
        }

        return components;
    }

    twoColor() {
        let k = this.nodeCount;
        let colors = [];
        let bipartite = true;
        let state;

        function complement(color) {
            if (color === 1) return 0;
            if (color === 0) return 1;
            return undefined;
        }

        for (let i = 1; i <= k; i++) {
            if (!state || !state[i]) {
                colors[i] = 1; // 0 - black, 1 - white, undefined - uncolored
                state = this.bfs(i, {state,
                    processLink: (u, v) => { // here we are given unique edges only
                        if (colors[u] === colors[v]) {
                            bipartite = false;
                            console.warn(`Warning: not bipartite due to (${u}, ${v}).`);
                        } else {
                            colors[v] = complement(colors[u]);
                        }
                    }
                }).state;
            }
        }

        return {bipartite, colors};
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
                console.log(`\n${end} can't be reached from ${start} (${graph}).\n`);
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

    printTraversal(index, {type = 'bfs'} = {}) {
        return this[type](index, {
            processNodeSoon: (x) => {
                console.log(x);
            },
            processLink: (x, y) => {
                console.log(`(${x}, ${y})`);
            }
        });
    }
}

export { ListGraph, Link }
