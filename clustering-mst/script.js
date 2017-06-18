var svg = d3.select("svg");


svg.on('click', function() {
    var coords = d3.mouse(this);
    svg.append("circle")
        .attr('fill', '#' + Math.floor(Math.random() * 16777215).toString(16))
        .style("z-index", 1000)
        .attr('cx', coords[0])
        .attr('cy', coords[1])
        .attr("r", 0);

    svg.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("r", 10)

    newVertex(coords);
});

function connect(x, y, v, color) {

    var line = svg.append("line") // attach a line
        .style("stroke", "black") // colour the line
        .attr("x1", x[0]) // x position of the first end of the line
        .attr("y1", x[1]) // y position of the first end of the line
        .attr("x2", x[0]) // x position of the second end of the line
        .attr("y2", x[1]) // y position of the second end of the line
        .style("z-index", "0");
    line.transition().duration(320)
        .attr("x1", x[0]) // x position of the first end of the line
        .attr("y1", x[1]) // y position of the first end of the line
        .attr("x2", y[0]) // x position of the second end of the line
        .attr("y2", y[1]) // y position of the second end of the line
        .ease(d3.easeLinear);
}

function refreshLines() {
    svg.selectAll("line").remove();
}

$(document).ready(function() {
    $("input[name=clusters]").change(function(e) {
        k = $(this).val();
        console.log(k);
        refresh();
    });
});