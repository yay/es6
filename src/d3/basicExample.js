import * as d3 from 'd3';

window.onload = function () {
    let svg = d3.select(document.body).append('svg')
        .attr('width', 600)
        .attr('height', 600);

    let mainGroup = svg.append('g');

    let data = [1, 2, 3, 4, 5];

    let update = mainGroup.selectAll('circle').data(data);
    update.enter().append('circle')
        .attr('r', d => d * 10)
        .attr('transform', (d, i) => `translate(${i * 100 + 20},100)`)
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
};

// document.addEventListener('DOMContentLoaded', function(e) {
//
// });