// high chart code
$(function() {

    "use strict";

    var callsMade, chartData, senateS, shared_Options, chart1_Options, chart1, chart2_Options, chart2,
        chart3_Options, chart3,

        didScroll = false,
        ajax1 = 'http://mayday-step-two.herokuapp.com/bills/supporter_counts?bill_id=hr424-114',
        ajax2 = 'http://mayday-step-two.herokuapp.com/bills/supporter_counts?bill_id=hr20-114',

        // dom objects to render to
        $container1 = $('#container1'),
        $container2 = $('#container2'),
        $container3 = $('#container3'),

        animate ={};

        // set basic options
    Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'Lato'
        },
        plotOptions: {
            pie: {
                shadow: false
            }
        }
      }
    });
    var dataTest = {};
    var data= {
        chartData : [
            {
                "name": "Current <br>Supporters",
                "y": 5,
                "color": "#808080"
            },
            {
                "name": "Current <br>Cosponsors",
                "y": 4,
                "color": "#759c64"
            },
            {
                "name": "Needed <br>Cosponsors",
                "y": 2,
                "color": "#5e8cac"
            }
        ],
        senateS : [
            {
                "name": "Non-<br>Sponsors",
                "y": 40,
                "color": "#808080"
            },
            {
                "name": "Current <br>Sponsors",
                "y": 0,
                "color": "#759c64"
            },
            {
                "name": "Needed <br>Sponsors",
                "y": 60,
                "color": "#5e8cac"
            }
        ]
    };
        // everything shared between the graphs
    shared_Options = {
        chart: {
              type: 'pie'
        },
        title: {
            align: 'center',
            verticalAlign: 'middle',
            y: -150,
            style: {
              "fontSize": "30px",
              "fontWeight":300,
              "color":"#0d3960"
            }
        },
        credits: {
            enabled: false
        },
        exporting: { 
          enabled: false 
        },
        tooltip: {
            backgroundColor: null,
            borderWidth: 0,
            shadow: false,
            useHTML: true,
            style: {
                padding: 0
            }
        },
        series: [{
            size: '60%',
            innerSize: '50%',
            style: {
                'fontWeight': 300,
                'fontFamily': 'Lato',
                color: '#222'
            },
            showInLegend:false,
            dataLabels: {
                enabled: true,
                distance: 10,
                style: {

                },
                formatter: function () {
                    return this.point.name + '<br>' + this.y;
                }
            }
        }]
    };
    function ajaxCall( url, callback) {
        $.getJSON( url, callback);
    }

    // render charts onload or onsroll depending the the inner veiwport height
    $(window).load(function() {
        animate.pageLoad();
    });

    $(window).scroll(function() {// important
        didScroll = true;
    });

    setInterval(function() {// limits the positionCheck() to every 150 milli seconds
        if(didScroll) {
            didScroll = false;
            animate.positionCheck();
        }
    }, 100);// important

    animate = {
        // remains false until charts are rendered
        chart1Finished : false,
        chart2Finished : false,
        chart3Finished : false,
        // makes three donut charts
        render1 : function () {

            animate.chart1Finished = true;

                  // individual chart code
            chart1_Options = {
                chart: {
                    renderTo: 'container1'
                },
                title: {
                    text: 'Empowering Citizens Act'
                },
                tooltip: {
                    formatter: function() {
                        return 'Of 435 '+ this.series.name + '<br>' + 'Members, ' + '<br>' +  this.y + '<br>' + 'are ' + this.point.name;
                    }
                },
                series: [{
                    name: 'House',
                    data: data.chartData // data point
                }]
            };
                // load options for chart 1
            chart1_Options = jQuery.extend(true, {}, shared_Options, chart1_Options);

            chart1 = new Highcharts.Chart(chart1_Options);
        },
        render2 : function () {

            animate.chart2Finished = true;

            chart2_Options ={
                chart: {
                    renderTo: 'container2'
                },
                title: {
                    text: 'Senate Support'
                },
                tooltip: {
                    formatter: function() {
                        return 'Of 100 '+ this.series.name + '<br>' + 'Members, ' + '<br>' +  this.y + '<br>' + 'are ' + this.point.name;
                    }
                },
                series: [{
                    name: 'Senate',
                    data: data.senateS // data point
                }]
            };

                          // load options for chart 2
            chart2_Options = jQuery.extend(true, {}, shared_Options, chart2_Options);

            chart2 = new Highcharts.Chart(chart2_Options);
        },
        // checks the current innerHeight of the page and renders charts when page reaches the location of the charts
        positionCheck: function () {
        
            if(window.scrollY) {
                var scrolledTo = window.innerHeight + window.scrollY;
            } else {
                var scrolledTo = window.innerHeight + window.pageYOffset;
            }
            if(animate.chart1Finished === false && $container1[0].offsetTop + 100 < scrolledTo) {
                ajaxCall(ajax1, function (data){
                    console.log(data);
                    console.log("hope this works",true)
                    animate.render1();
                })
    
            }
            if(animate.chart2Finished === false && $container2[0].offsetTop + 100 < scrolledTo) {
                ajaxCall(ajax2, function (data){
                    console.log(data);
                    console.log("hope this works",true)
                    animate.render2();
                })
            }
        },
        // runs charts on page load if they are in the view port currently
        pageLoad: function() {

            var windowHeight = window.innerHeight + window.pageYOffset;

            if($container1[0].offsetTop + ($container1.height() / 2) < windowHeight) {

                ajaxCall(ajax1, function (data){
                    console.log(data);
                    console.log("hope this works",true)
                    animate.render1();
                })

            } 

            if($container2[0].offsetTop + ($container2.height() / 2) < windowHeight) {

                ajaxCall(ajax2, function (data){
                    console.log(data);
                    console.log("hope this works",true)
                    animate.render2();
                })

            } 

            // if($container3[0].offsetTop + ($container3.height() / 2) < windowHeight) { //1663 + (250/2) < current window height
            //     animate.render3();
            // }
        }
    }

});



