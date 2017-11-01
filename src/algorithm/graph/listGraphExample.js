import { ListGraph } from './listGraph';

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

let bipartiteGraphSpec = [
    '7 8',

    '1 2',
    '1 3',
    '2 4',
    '3 4',
    '3 7',
    '4 5',
    '4 6',
    '6 7'
];

function readAndPrint() {
    // Read directed graph
    let directedGraph = ListGraph.readGraph(graphSpec, true);

    console.log('\nPrint directed graph:\n');
    directedGraph.printGraph();


    // Read undirected graph
    let undirectedGraph = ListGraph.readGraph(graphSpec, false);

    console.log('\nPrint undirected graph:\n');
    undirectedGraph.printGraph();
}

function bfsTraversal() {
    let directedGraph = ListGraph.readGraph(graphSpec, true);

    console.log('\nBFS traverse directed graph from node #1:\n');
    directedGraph.printTraversal(1);

    // BFS traverse directed graph:
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


    let undirectedGraph = ListGraph.readGraph(graphSpec, false);

    console.log('\nBFS traverse undirected graph from node #1:\n');
    undirectedGraph.printTraversal(1);

    // BFS traverse undirected graph:
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
}

function dfsTraversal() {
    let directedGraph = ListGraph.readGraph(graphSpec, true);

    console.log('\nDFS traverse directed graph:\n');
    directedGraph.printTraversal(1, {type: 'dfs'});

    let undirectedGraph = ListGraph.readGraph(graphSpec, false);

    console.log('\nDFS traverse undirected graph:\n');
    undirectedGraph.printTraversal(1, {type: 'dfs'});

    {
        console.log('\nRecursive DFS traverse undirected graph:\n');
        let result = undirectedGraph.printTraversal(1, {type: 'dfsBB'});
        console.log(result);
    }
}

function findPath() {
    let directedGraph = ListGraph.readGraph(graphSpec, true);
    let undirectedGraph = ListGraph.readGraph(graphSpec, false);

    // There are two points to remember when using breadth-first search
    // to find a shortest path from x to y:
    //
    // 1) the shortest path tree is only useful if BFS was performed with x
    //    as the root of the search;
    //
    // 2) BFS gives the shortest path only if the graph is unweighted.

    undirectedGraph.findPath(2, 7, undirectedGraph.bfs(2).parent, true);
    // Notice how we had to use 2 as the root for the breadth-first search
    // to generate the child-parent tree to be used by findPath.
    console.log('\nFind and print the above path using recursion:\n');
    undirectedGraph.findPathR(2, 7, undirectedGraph.bfs(2).parent);

    console.log('Try finding a path from 1 to 2 in a directed graph' +
        ' that does not have a link from 1 to 2');
    directedGraph.findPath(1, 2, directedGraph.bfs(1).parent, true);
}

function connectedComponents() {
    function print(comps) {
        console.log(JSON.stringify(comps, null, 4));
    }

    let directedGraph = ListGraph.readGraph(graphSpec, true);
    let undirectedGraph = ListGraph.readGraph(graphSpec, false);

    console.log('\nComponents of a directed graph');
    print( directedGraph.getConnectedComponents() );

    console.log('\nComponents of an undirected graph');
    print( undirectedGraph.getConnectedComponents() );
}

function twoColor() {
    let undirectedGraph = ListGraph.readGraph(graphSpec, false);

    console.log('\nTwo-color undirected graph:');
    console.log( 'Result:', undirectedGraph.twoColor() ); // non-bipartite

    let bipartiteGraph = ListGraph.readGraph(bipartiteGraphSpec, false);
    console.log('\nPrint bipartite graph:');
    bipartiteGraph.printGraph();

    console.log('\nTwo-color bipartite graph:');
    console.log( 'Result:', bipartiteGraph.twoColor() ); // examine 'colors' array
}

readAndPrint();
bfsTraversal();
dfsTraversal();
findPath();
connectedComponents();
twoColor();