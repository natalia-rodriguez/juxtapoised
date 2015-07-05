d3.csv("data/resume.csv", function(data) {

    var w = 800;
    var h = 450;
    var nodes = [];
    var x = d3.scale.linear().domain([0, 1]).rangeRound([0, w]);
    var y = d3.scale.linear().domain([0, 1]).rangeRound([0, h]);
    var r = d3.scale.linear().domain([0, 1]).rangeRound([1, 50]);
    var t = d3.scale.linear().domain([0, 1]).rangeRound([6, 24]);
    var vis;


    data.forEach(function(d, i){
        var node = {
            id: i,
            r: d.size,
            description: d.description,
            name: d.name,
            date: d.date,
            role: d.position,
            category: d.type,
            x: Math.random() * 900,
            y: Math.random() * 800
        };
        nodes.push(node);
    });

    vis = d3.select("#resume_container")
        .append("svg:svg")
        .attr("width", w)
        .attr("height", h);


    var circles = vis.selectAll(".node")
        .data(nodes, function(d) { return d.id ;})
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + x(d.x) + "," + y(d.y) + ")"
        });

    circles.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .transition()
        .duration(300)
        .attr("font-size", function (d) {
            return t(d.r)
        })
        .text(function (d) {
            return d.name
        });

    circles.append("circle")
        .attr("class", "number_circle")
        .transition()
        .duration(300)
        .attr("r", function (d, i) {
            return r(d.r)
        });
        //.on('click', function(d){ details(d); lineUp();  });;


    function dance() {
        for (var i = 0; i < data.length; i++) {
            data[i] = {x: Math.random(), y: Math.random(), r: Math.random()};
        }

        var node = vis.selectAll(".node")
            .data(nodes)
            .transition()
            .duration(1000)
            .attr("transform", function (d, i) {
                return "translate(" + x(d.x) + "," + y(d.y) + ")"
            });

        node.select("circle")
            .transition()
            .duration(1000)
            .attr("r", function (d, i) {
                return r(d.r)
            });

        node.select("text")
            .transition()
            .duration(1000)
            .attr("font-size", function (d, i) {
                return r(d.r)
            });

    }//end dance

    function lineUp(){

    }

    function details(){

    }
})

//function add() {
//    data.push({x: Math.random(), y: Math.random(), r: Math.random()});
//    var node = vis.selectAll(".node")
//        .data(data)
//        .enter()
//        .append("g")
//        .attr("class", "node")
//        .attr("transform", function (d, i) {
//            return "translate(" + x(d.x) + "," + y(d.y) + ")"
//        });
//
//    node.append("text")
//        .attr("class", "label")
//        .attr("text-anchor", "middle")
//        .attr("dy", ".3em")
//        .transition()
//        .duration(300)
//        .attr("font-size", function (d, i) {
//            return t(d.r)
//        })
//        .text(function (d, i) {
//            return i
//        });
//
//    node.append("circle")
//        .attr("class", "number_circle")
//        .transition()
//        .duration(300)
//        .attr("r", function (d, i) {
//            return r(d.r)
//        });
//}