import * as d3 from 'd3';
import { ListGraph } from '../algorithm/graph/listGraph';

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

window.onload = function () {
    let graph = new ListGraph.readGraph(graphSpec, false);
    let comps = graph.getConnectedComponents({zeroBasedIndex: true});

    if (comps.length) {
        renderGraph(comps[0]);
    }
};

function renderGraph(comps) {
    let nodes = comps.nodes;
    let links = comps.links;

    let linkLength = 100;
    let nodeRadius = 14;

    let simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody())
        .force('link', d3.forceLink(links).distance(linkLength).strength(1))
        .force('x', d3.forceX())
        .force('y', d3.forceY())
        .on('tick', ticked);

    let canvas = d3.select(document.body).append('canvas')
            .attr('width', 500)
            .attr('height', 500)
            .node(),
        ctx = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height;

    d3.select(canvas)
        .call(d3.drag()
            .container(canvas)
            .subject(dragsubject)
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    function ticked() {
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(width / 2, height / 2);

        ctx.beginPath();
        links.forEach(drawLink);
        ctx.strokeStyle = '#aaa';
        ctx.stroke();

        ctx.beginPath();
        nodes.forEach(drawNode);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        ctx.save();
        ctx.font = '14px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        nodes.forEach(drawNodeText);
        ctx.restore();

        ctx.restore();
    }

    function dragsubject() {
        return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
    }

    function dragstarted() {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
    }

    function dragged() {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
        if (!d3.event.active) simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    }

    function drawLink(d) {
        ctx.moveTo(d.source.x, d.source.y);
        ctx.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
        ctx.moveTo(d.x + nodeRadius, d.y);
        ctx.arc(d.x, d.y, nodeRadius, 0, 2 * Math.PI);
    }

    function drawNodeText(d) {
        ctx.fillText(d.index, d.x, d.y);
    }
}