// high chart code
$(function() {

    "use strict";

    var versionsData, shared_Options, chart1_Options, chart1, chart2_Options, chart2,
        chart3_Options, chart3,

        didScroll = false,

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

    versionsData = [
        {
            "name": "Republicans",
            "y": 3221,
            "color": "#c03c2f"
        },
        {
            "name": "Democrats",
            "y": 1121,
            "color": "#146897"
        },
        {
            "name": "Indpendents",
            "y": 32,
            "color": "#28dc4a"
        }
    ];
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
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 1
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
      // individual chart code
    chart1_Options = {
        chart: {
            renderTo: 'container1'
        },
        title: {
            text: 'House Support'
        },
        series: [{
            name: 'Support',
            data: versionsData // data point
        }]
    };

    chart2_Options ={
        chart: {
            renderTo: 'container2'
        },
        title: {
            text: 'Senate Support'
        },
        series: [{
            name: 'Support',
            data: versionsData // data point
        }]
    };

    chart3_Options ={
        chart: {
            renderTo: 'container3'
        },
        title: {
            text: 'Calls Made'
        },
        series: [{
            name: 'Calls',
            data: versionsData // data point
        }]
    };

        // load options for chart 1
    chart1_Options = jQuery.extend(true, {}, shared_Options, chart1_Options);

      // load options for chart 2
    chart2_Options = jQuery.extend(true, {}, shared_Options, chart2_Options);

      // load options for chart 3
    chart3_Options = jQuery.extend(true, {}, shared_Options, chart3_Options);
    
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
            chart1 = new Highcharts.Chart(chart1_Options);
            animate.chart1Finished = true;
        },
        render2 : function () {
            chart2 = new Highcharts.Chart(chart2_Options);
            animate.chart2Finished = true;
        },
        render3 : function () {
            chart3 = new Highcharts.Chart(chart3_Options);
            animate.chart3Finished = true;
        },
        // checks the current innerHeight of the page and renders charts when page reaches the location of the charts
        positionCheck: function () {
            if(window.scrollY) {
                var scrolledTo = window.innerHeight + window.scrollY;
            } else {
                var scrolledTo = window.innerHeight + window.pageYOffset;
            }
            if(animate.chart1Finished === false && $container1[0].offsetTop + 150 < scrolledTo) {
                animate.render1();
            }
            if(animate.chart2Finished === false && $container2[0].offsetTop + 150 < scrolledTo) {
                animate.render2();
            }
            if(animate.chart3Finished === false && $container3[0].offsetTop + 150 < scrolledTo) {
                animate.render3();
            }
        },
        // runs charts on page load if they are in the view port currently
        pageLoad: function() {
            var windowHeight = window.innerHeight;
            if($container1[0].offsetTop + ($container1.height() / 2) < windowHeight) {
                animate.render1();
            }

            if($container2[0].offsetTop + ($container2.height() / 2) < windowHeight) {
                animate.render2();
            }

            if($container3[0].offsetTop + ($container3.height() / 2) < windowHeight) { //1663 + (250/2) < current window height
                animate.render3();
            }
        }
    }

});