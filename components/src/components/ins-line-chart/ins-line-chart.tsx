import { h, Component, Prop, Watch, State, Element, Method } from '@stencil/core';
declare var Highcharts;

@Component({ tag: 'ins-line-chart' })

export class InsLineChart {
  @Element() insLineChartEl: HTMLElement;
  @Prop({ mutable: true }) name: string = "Line Chart";
  @Prop({ mutable: true }) categories: any = []; 
  @Prop({ mutable: true }) chartData: any = [];
  @Prop({ mutable: true }) dataSrc: string = "";
  @State() container: any;
  @State() labelTextSize: string = '12px';
  @State() itemTextSize: string = '14px';

  @Method()
  val(attr, value) {
    let data = {
      name: this.name,
      categories: this.categories,
      chartData: this.chartData,
      dataSrc: this.dataSrc
    };
    if (attr && !value){
      return this[attr];
    }
    else if (attr && value){
      return this[attr] = value;
    }
    else{
      return data;
    }
  }
  fetchLineChartData() {
    const self = this;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange =function() {
      if (this.readyState == 4 && this.status == 200) {
        // // console.log('not parsed', JSON.parse(this.responseText));
        let data = JSON.parse(this.responseText);
      var lineChartCategories = ['Jan 17', 'Feb 17', 'Mar 17', 'Apr 17', 'May 17', 'Jun 17', 'Jul 17', 'Aug 17', 'Sep 17', 'Oct 17', 'Nov 17', 'Dec 17'];
        self.reRenderChart(data.lineGraphSampleData, lineChartCategories)
      }
    };
    xhttp.open("GET", this.dataSrc, true);
    xhttp.send();
  }
  
  componentWillLoad() {
    if (typeof this.chartData === 'string') {
      this.chartData = JSON.parse(this.chartData);
    }

    if (typeof this.categories === 'string') {
      this.categories = JSON.parse(this.categories);
    }
  }

  resizeFontSize() {
      let $this = this;

      if(window.outerWidth < 768) {
          $this.labelTextSize = '10px';
          $this.itemTextSize = '12px';
      }
  }

  componentDidLoad() {
    const self = this;
    self.container = this.insLineChartEl.querySelector('.line-chart-container');
    if(self.dataSrc) {
      self.fetchLineChartData();
    }

    window.onresize = function() {
        self.resizeFontSize();
    };

    self.resizeFontSize();
  }

  @Method()
  reRenderChart(chartData, categories) {
    this.chartData = chartData;
    this.categories = categories;

    this.renderChart();
  }

  @Watch('chartData')
  watchChartData() {
      this.componentWillLoad();
    this.renderChart();
  }

  @Watch('categories')
  watchCategoryHandler() {
      this.componentWillLoad();
    this.renderChart();
  }

  renderChart() {
    let component = this;
    if ((window as any).Highcharts){
      Highcharts.chart({
        chart: {
          renderTo: component.container,
          type: 'spline',
          plotBackgroundColor: {
            linearGradient: [0, 0, 0, 400],
            stops: [
              [0, 'rgba(238,238,238,0)'],
              [1, 'rgb(245, 246, 248)']
            ]
          },
          zoomType: 'x',
          animation: true,
          spacingLeft: 0,
          spacingRight: 0,
          spacingTop: 0,
          style: {
            fontFamily: 'Open Sans'
          }
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 900
            }
          }]
        },
        rangeSelector: {
          enabled: true
        },
        navigator: {
          enabled: true
        },
        title: {
          text: null,
        },
        exporting: {
          enabled: false
        },
        tooltip: {
          shared: true,
          // crosshairs: true
          // borderRadius: 0,
          borderWidth: 0,
          shadow:{
          opacity: .02,
          offsetX: 1,
          offsetY: 1,
          width: 10
        },
        padding: 5,
        backgroundColor: '#fff',
        },
        xAxis: [{
          crosshair: {
              color: '#ccc',
              width: 1,
              zIndex: 1,
              dashStyle: 'dash'
          },
          alternateGridColor: '#ffffff',
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            week: '%b %e',
            day: '%b %e',
            month: '%b'
          },
          categories: component.categories,
          startOnTick: false,
          endOnTick: false,
          gridLineWidth: 0,
          minPadding: 0.015,
          maxPadding: 0.0075,
          tickLength: 0,
          labels: {
            align: 'center',
            style: {
              color: '#8C94A4',
              fontSize: component.labelTextSize
            },
            x: 0,
            y: 40,
          }
        }],
        yAxis: {
          allowDecimals: false,
          title: {
            text: null,
          },
          gridLineColor: '#dce1e8',
          labels: {
            align: 'right',
            x: -20,
            y: 0,
            style: {
              color: '#8C94A4',
              fontSize: component.labelTextSize
            }
          },
          plotLines: [{
            color: '#E4E6EC',
            width: 1,
            value: 0,
            zIndex: 2
          }],
          min: 0
        },
        legend: {
          enabled: true,
          align: 'center',
          layout: 'horizontal',
          verticalAlign: "bottom",
          itemStyle: {
            color: '#8C94A4',
            fontSize:  component.itemTextSize,
            fontWeight: 'normal'
          },
          itemMarginTop: 30,
          symbolWidth: 32
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false,
              fillColor: '#fff',
              symbol: 'circle',
              radius: 1
            }
          }
        },
        series: component.chartData
      });
    }
  }

  render() {
    return (
      <div class="ins-line-chart">
        <h2>{this.name}</h2>
        <div class="line-chart-container"></div>
      </div>
    )
  }
}
