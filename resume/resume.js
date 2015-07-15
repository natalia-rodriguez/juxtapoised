


    d3.csv("data/resume.csv", function(data) {


        var w = window.innerWidth;
        var h = 550;
        var nodes = [];
        var x = d3.scale.linear().domain([0, 1]).rangeRound([0, w]);
        var y = d3.scale.linear().domain([0, 1]).rangeRound([0, h]);
        var r = d3.scale.linear().domain([0, 1]).rangeRound([1, 6]);
        var t = d3.scale.linear().domain([0, 1]).rangeRound([1, 1.45]);
        var vis;
        // in the head
        var intervalHandle = null;

        console.log("x", x(Math.random()));

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
                x: x(Math.random()),
                y: y(Math.random())
            };
            nodes.push(node);
        });

        vis = d3.select("#resume_container")
            .append("svg:svg")
            .attr("width", w+50)
            .attr("height", h+50)
            .on('click', function(){
            clearInterval(intervalHandle); timeBuckets();});


        var circles = vis.selectAll(".node")
            .data(nodes, function (d) {
                return d.id;
            })
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x  + "," + d.y + ")"
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
            .attr("class", function (d) {
                if(d.category.substring(0,1) === "T"){
                    return "technical_circle";
                }
                if(d.category.substring(0,1) === "C"){
                    return "creative_circle";
                }
                else{return "award_circle";}
            })
            .attr({'r': 0})
            .transition().duration(3000).ease('elastic')
            .attr("r", function (d) {
                return r(d.r)
            });

        circles.on('click', function(d){
            clearInterval(intervalHandle);
            timeBuckets();
            console.log("d click", d);
            spotlight(d) });

        //.on('click', function(d){ details(d); lineUp();  });;




         function dance() {
             var yolo = vis.selectAll(".node")
                 .data(nodes)
                 .transition()
                 .duration(3000)
                 .attr("transform", function (d, i) {
                     d.x = x(Math.random());
                     d.y = y(Math.random());
                     return "translate(" + d.x + "," + d.y + ")"
                 });

             yolo.select("circle")
                 .transition()
                 .duration(3000);

             yolo.select("text")
                 .transition()
                 .duration(3000);

         }//end dance


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

        //.attr("x", 50)
        //        .attr("y", function(d,i){ return i+20})
        }

        function spotlight(d) {

            console.log("d", d);
            var item = d3.select("#resume_container")
                .append("svg:svg")
                .attr("width", 300)
                .attr("height", 200)
                .attr("x", w/2 )
                .attr("y", h/2);



            item.append("text")
                .attr("class", "title")
                .attr("dy", ".3em")
                .attr("text-anchor", "top")
                .transition()
                .duration(300)
                .text(function () {
                    return d.name.toUpperCase();
                });


            item.append("text")
                .attr("class", "description")
                .attr("dy", ".3em")
                .attr("text-anchor", "bottom")
                .transition()
                .duration(300)
                .text(function () {
                    return d.description;
                });

            item.append("text")
                .attr("class", "position")
                .attr("dy", ".3em")
                .attr("text-anchor", "middle")
                .transition()
                .duration(300)
                .text(function () {
                    return d.position;
                });

            item.append("text")
                .attr("class", "date")
                .attr("dy", ".3em")
                .attr("text-anchor", "top")
                .transition()
                .duration(300)
                .text(function () {
                    return d.date;
                });
        }//spotlight





        function year(d){
            if(d.bucket === 13)
                return "2013";
            if(d.bucket === 14)
                return "2014";
            if(d.bucket === 15)
              return "2015";
        }


        // in the onclick to set
        intervalHandle = setInterval(dance, 1200);

        // in the onclick to clear




    })//end csv
