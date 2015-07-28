


    d3.csv("data/resume.csv", function(data) {


        var w = window.innerWidth;
        var h = 550;
        var nodes = [];
        var r = d3.scale.linear().domain([0, 1]).rangeRound([1, 6]);
        var t = d3.scale.linear().domain([0, 1]).rangeRound([1, 1.45]);
        var vis;
        var tooltip = CustomTooltip("blithe_tooltip", 240);
        var intervalHandle = null;

        function x(d){
            var max = w - r(d.r);
            var min = r(d.r);
            return Math.floor(Math.random()*(max-min+1)+min);
        }


        function y(d){
            var max = h - r(d.r);
            var min = r(d.r);
            return Math.floor(Math.random()*(max-min+1)+min);
        }

        function OpenInNewTab(url) {
            var win = window.open(url, '_blank');
            win.focus();
        }

        data.forEach(function (d, i) {
            var node = {
                id: i,
                r: d.size,
                description: d.description,
                name: d.name,
                date: d.date,
                role: d.position,
                category: d.type,
                bucket: d.group,
                link: d.link
            };
            nodes.push(node);
        });

        vis = d3.select("#resume_container")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h);


        var circles = vis.selectAll(".node")
            .data(nodes, function (d) {
                return d.id;
            })
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + x(d) + "," + y(d) + ")"
            });

        circles.append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .attr("dy", ".3em")
            .transition()
            .duration(300)
            .attr("font-size", function (d) {
                return t(d.r);
            })
            .text(function (d) {
                return d.name
            });

        circles.append("circle")
            .attr("class", function(d){return getClass(d);})
            .attr({'r': 0})
            .transition().duration(3000).ease('elastic')
            .attr("r", function (d) {
                return r(d.r)
            });





        circles.on("mouseover", function(d, i) {show_details(d, i, this); pause(); clearInterval(intervalHandle);} )
            .on("mouseout", function(d, i) {hide_details(d, i, this); dance(); intervalHandle = setInterval(dance, 2000);} )
            .on("click", function(d){
                if(d.link){
                OpenInNewTab(d.link);}});


    var creative ={
        color: "#44D0AB",
        name: "Creative"};

    var technical= {
        color: "#A6EEDB",
        name: "Technical"};

    var award ={color: "#FEB49F",
        name: "Award"};

    var mapkey = [creative, technical, award]  ;



         function dance() {
             var yolo = vis.selectAll(".node")
                 .data(nodes)
                 .transition()
                 .duration(3000)
                 .attr("transform", function (d, i) {
                     return "translate(" + x(d) + "," + y(d) + ")"
                 });

             yolo.select("circle")
                 .transition()
                 .duration(3000);

             yolo.select("text")
                 .transition()
                 .duration(3000);

         }//end dance

        function pause(){
            var yolo = vis.selectAll(".node");
            yolo.transition()
                .duration( 0 );
        }


        function timeBuckets(){
            var buckets = d3.selectAll(".node")
                    .data(nodes)
                    .transition()
                    .duration(3000)
                    .attr("transform", function(d) {
                        var newX = - d.x;
                        var newY= - d.y;
                        return "translate(" + newX + "," + newY + ")"
            });

            buckets.select("circle")
                .transition()
                .duration(3000);

            buckets.select("text")
                .transition()
                .duration(3000);
        }

        function year(d){
            if(d.bucket === 13)
                return "2013";
            if(d.bucket === 14)
                return "2014";
            if(d.bucket === 15)
              return "2015";
        }


        intervalHandle = setInterval(dance, 1200);


        function show_details(data, i, element) {
            var content = "<span class=\"name\">" +  data.name + "</span><br/>";
            content +="<span class=\"position\">" + data.role + "</span><br/>";
            content +="<span class=\"date\">" + data.date + "</span><br/>";
            content +="<span class=\"description\">" + data.description + "</span><br/>";
            tooltip.showTooltip(content, d3.event);
        }

        function hide_details(data, i, element) {
            tooltip.hideTooltip();
        }

        function getClass(d) {
            if(d.category.substring(0,1) === "T"){
                return "technical_circle";
            }
            if(d.category.substring(0,1) === "C"){
                return "creative_circle";
            }
            else{return "award_circle";}
        }
    })//end csv


