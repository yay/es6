class EdgeNode {
    constructor(y, next = null) {
        this.y = y;           // adjacency info
        this.next = next;     // next edge in list
        // this.weight        // edge weight, if any
    }
}

class Graph {
    constructor(directed = false) {
        this.edges = [];       // adjacency info, 1-based indexes
        this.degree = [];      // degree of each vertex, 1-based indexes
        this.vertexCount = 0;
        this.edgeCount = 0;
        this.directed = directed;
    }

    insertEdge(x, y, directed) {
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
     *
     * @param lines String[]
     * @param directed Boolean
     * @return {Graph}
     */
    static readGraph(lines, directed) {
        let ln = lines.length;
        let graph;

        if (ln) {
            graph = new Graph();
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
            let str = `${i}:`;
            while (edgeNode) {
                str += ` ${edgeNode.y}`;
                edgeNode = edgeNode.next;
            }
            console.log(str);
        }
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
        '3 7',
        '4 5',
        '4 7',
        '5 6',
        '5 7',
        '6 7'
    ];

    let directedGraph = Graph.readGraph(lines, true);
    let undirectedGraph = Graph.readGraph(lines, false);

    console.log('\nDirected graph:\n');
    directedGraph.printGraph();

    console.log('\nUndirected graph:\n');
    undirectedGraph.printGraph();
}