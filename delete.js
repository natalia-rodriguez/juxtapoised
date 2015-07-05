d3.csv("data/resume.csv", function(data) {

    var width = 700 ,
        height = 700 ;
    var radius_scale;
    var nodes =[];
    var  layout_gravity = -0.01;
    var center = {x: width / 2, y: height / 2};
    var force;
    var damper = 0.1;
    var vis;
    var circles;
    var tooltip = CustomTooltip("blithe_tooltip", 240);







    console.log("debug0");
    var max_amount = d3.max(data, function(d) { return d.count; } );
    radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 27]);
    var fill_color = d3.scale.linear()
        .range(['#E65656', '#4C0000']) // or use hex values
        .domain([1, max_amount+1]);


    var initial_color = d3.scale.linear()
        .range([ '#E6E6E7', '#9D9D9F']) // or use hex values
        .domain([1, max_amount+1]);

    //create node objects from original data
    //that will serve as the data behind each
    //bubble in the vis, then add each node
    //to nodes to be used later
    data.forEach(function(d, i){
        var node = {
            id: i,
            radius: radius_scale(d.count),
            value: d.count,
            name: d.tag,
            x: Math.random() * 900,
            y: Math.random() * 800
        };
        nodes.push(node);
    });
    nodes.sort(function(a, b) {return b.value- a.value; });
// console.log("nodes", nodes);

    vis = d3.select("#dataBlithe").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "svg_vis_blithe")
        .append("g")
        .attr("transform", "translate(20, 20)");


    console.log("vis" + vis);
    circles = vis.selectAll("circle")
        .data(nodes, function(d) { return d.id ;});



    circles.enter().append("circle")
        .attr("r", 0)
        .attr("fill", function(d) { return initial_color(d.value) ;})
        .attr("stroke-width", 2)
        .attr("stroke", function(d) {return d3.rgb(initial_color(d.value));})
        .attr("id", function(d) { return  "bubble_" + d.id; })
        .on("mouseover", function(d, i) {show_details(d, i, this);} )
        .on("mouseout", function(d, i) {hide_details(d, i, this);} );




    circles.transition().duration(2000).attr("r", function(d) { return d.radius; });
    console.log("circles" +circles);

    force = d3.layout.force()
        .nodes(nodes)
        .size([width, height]);
    console.log("3");

    function charge(d) {
        return -Math.pow(d.radius, 2.0) / 8;
    }

    function start() {
        force = d3.layout.force()
            .nodes(nodes)
            .size([width, height]);
    }


    force.gravity(layout_gravity)
        .charge(function (d) {return -Math.pow(d.radius, 2.0) / 8;})
        .friction(0.9)
        .on("tick", function(e) {
            circles.each(move_towards_center(e.alpha))
                .attr("cx", function(d) {return d.x;})
                .attr("cy", function(d) {return d.y;});
        });
    force.start();


    function move_towards_center(alpha) {
        return function(d) {
            d.x = d.x + (center.x - d.x) * (damper + 0.02) * alpha;
            d.y = d.y + (center.y - d.y) * (damper + 0.02) * alpha;
        };
    }



    function show_details(data, i, element) {
        d3.select(element).attr("fill", function(d) { return d3.rgb(fill_color(d.value));});
        var numWithComma = data.value;
        var content = "<span class=\"name\">Tag: </span><span class=\"value\"> #" + data.name + "</span><br/>";
        content +="<span class=\"name\">Amount: </span><span class=\"value\">" + commaSeparateNumber(numWithComma) + "</span><br/>";
        tooltip.showTooltip(content, d3.event);
    }

    function hide_details(data, i, element) {
        d3.select(element).attr("fill", function(d) { return d3.rgb(fill_color(d.value));} );
        d3.select(element).attr("stroke", function(d) { return d3.rgb(fill_color(d.value));} );
        tooltip.hideTooltip();
    }


})