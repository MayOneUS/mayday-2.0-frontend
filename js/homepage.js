// high chart code
$(function() {

  "use strict";

  var callsMade, chartData, senateS, shared_Options, chart1_Options, chart1, chart2_Options, chart2,
    chart3_Options, chart3,

    didScroll = false,
    api_endpoint = '/bills/supporter_counts',
    bill_url_hr424 = root_services_url + api_endpoint + '?bill_id=hr424-114',
    bill_url_hr20 = root_services_url + api_endpoint + '?bill_id=hr20-114',
    all_supporters_url = root_services_url + api_endpoint,

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

  // everything shared between the graphs
  shared_Options = {
    chart: {
        type: 'pie'
    },
    title: {
      align: 'center',
      verticalAlign: 'middle',
      y: -120,
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
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: '#222'
          }
        },
        startAngle: -40,
        endAngle: 320,
        center: ['50%', '60%']
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
        distance: 8,
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
  function transformEndpointData(response){
    var output = {};
    output.name = 'In the House';
    output.seriesData = [
        {
          "name": "Leaders<br>Needed",
          "y": response.needed_cosponsors,
          "color": "#5e8cac"
        },
        {
          "name": "Current <br>Leaders",
          "y": response.current_cosponsors,
          "color": "#759c64"
        }
    ];
    return output;
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
    chart1Fin : false,
    chart2Fin : false,
    chart3Fin : false,
    // makes three donut charts
    renderHouseSupport : function (chartData,target_container, finishingVar) {


      // individual chart code
      chart1_Options = {
        chart: {
          renderTo: target_container
        },
        title: {
          text: chartData.name
        },
        tooltip: {
          formatter: function() {
            return 'Of 435 '+ this.series.name + '<br>' + 'Members, ' + '<br>' +  this.y + '<br>' + 'are ' + this.point.name;
          }
        },
        series: [{
          name: 'House',
          data: chartData.seriesData // data point
        }]
      };
        // load options for chart 1
      chart1_Options = jQuery.extend(true, {}, shared_Options, chart1_Options);

      chart1 = new Highcharts.Chart(chart1_Options);
    },
    // checks the current innerHeight of the page and renders charts when page reaches the location of the charts
    windowHeight: function(){
      return window.innerHeight + window.pageYOffset;
    },
    fetchAndRender: function(url, renderContainer, finishingVar){
      $.getJSON( url, function(data){
        var endpoint_data = transformEndpointData(data);
        animate.renderHouseSupport(endpoint_data, renderContainer, finishingVar);
      });
    },
    positionCheck: function () {

      if(window.scrollY) {
        var scrolledTo = window.innerHeight + window.scrollY;
      } else {
        var scrolledTo = animate.windowHeight();
      }
      if(animate.chart1Fin === false && $container1[0].offsetTop + 100 < scrolledTo) {
        animate.chart1Fin = true;
        animate.fetchAndRender(all_supporters_url, 'container1', 'chart1Fin');

      }
      if(animate.chart2Fin === false && $container2[0].offsetTop + 100 < scrolledTo) {
        animate.chart2Fin = true;
        $container2.addClass('loaded');
        // animate.fetchAndRender(bill_url_hr424, 'container2', 'chart2Fin');
      }
      if(animate.chart3Fin === false && $container2[0].offsetTop + 150 < scrolledTo) {
        animate.chart3Fin = true;
        $container3.addClass('loaded');
      }
    },
    // runs charts on page load if they are in the view port currently
    pageLoad: function() {

      var windowHeight = animate.windowHeight();

      if(animate.chart1Fin === false && $container1[0].offsetTop + ($container1.height() / 2) < windowHeight) {
        animate.chart1Fin = true;
        animate.fetchAndRender(all_supporters_url, 'container1', 'chart1Fin');

      }

      if(animate.chart2Fin === false && $container2[0].offsetTop + ($container2.height() / 2) < windowHeight) {
        // animate.chart2Fin = true;
        // animate.fetchAndRender(bill_url_hr424, 'container2', 'chart2Fin');
        $container2.addClass('loaded');
      }

      if(animate.chart3Fin === false && $container3[0].offsetTop + ($container3.height() / 2) < windowHeight) { //1663 + (250/2) < current window height
        animate.chart3Fin = true;
        $container3.addClass('loaded');
      }
    }
  }

});



