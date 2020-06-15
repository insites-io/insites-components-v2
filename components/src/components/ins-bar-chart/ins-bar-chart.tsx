import { h, Component, Prop, Watch, State, Element, Method } from '@stencil/core'
declare var Highcharts;

@Component({ tag: 'ins-bar-chart' })

export class InsBarChart {
  @Element() insBarChartEl: HTMLElement;
  @Prop({mutable: true}) name: string = "Bar Chart";
  @Prop({mutable: true}) chartData: Array<any> = [];
  @Prop({mutable: true}) categories: Array<any> = [];
  @Prop({mutable: true}) dataSrc: string = "";
  @Prop({mutable: true}) stacked: boolean = false;
  @Prop({mutable: true}) horizontal: boolean = false;

  @State() container: any;

  componentWillLoad() {
      if (typeof this.chartData === 'string') {
          this.chartData = JSON.parse(this.chartData);
      }

      if (typeof this.categories === 'string') {
          this.categories = JSON.parse(this.categories);
      }
  }

  componentDidLoad() {
    const self = this;

    self.container = this.insBarChartEl.querySelector('.bar-chart-container');
    if(self.dataSrc) {
      self.fetchBarChartData();
    }
    if (this.chartData.length && this.categories.length){
      this.renderChart();
    }
  }

  @Method()
  reRenderChart(chartData, categories) {
    this.chartData = chartData;
    this.categories = categories;
    this.renderChart();
  }
  
  fetchBarChartData() {
    const self = this;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        self.reRenderChart(data.barChartSampleData, data.barChartCategories);
      }
    };
    xhttp.open("GET", this.dataSrc, true);
    xhttp.send();
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
          type: this.horizontal ? 'bar':'column',
          renderTo: component.container,
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
          tickLength: 0,
          labels: this.horizontal ? {
            style: {
              color: '#8C94A4',
              fontSize: '12px'
            }
          } : {
            align: 'center',
            style: {
              color: '#8C94A4',
              fontSize: '12px'
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
              fontSize: '12px'
            }
          },
          plotLines: [{
            color: '#E4E6EC',
            width: 1,
            value: 0,
            zIndex: 2
          }]
        },
        legend: {
          enabled: true,
          align: 'center',
          layout: 'horizontal',
          verticalAlign: "bottom",
          itemStyle: {
            color: '#8C94A4',
            fontSize: '14px',
            fontWeight: 'normal'
          },
          itemMarginTop: 30,
          symbolRadius: 0,
          symbolWidth: 10,
          symbolHeight: 10,
          symbolPadding: 20
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            marker: {
              enabled: false
            },
            states: {
              hover: {
                // brightness: 0
              }
            },
            stacking: this.stacked ? 'normal' : ''
          },
          area: {
            fillOpacity: 0.1,
            lineWidth: 2,
            marker: {
              fillColor: '#FFF',
              lineWidth: 2,
              lineColor: null,
              width: 10,
              height: 8,
              radius: 4,
              symbol: 'circle',
              states: {
                hover: {
                  fillColor: null
                }
              }
            }
          }
        },
        series: component.chartData
      });
    }
  }

  render() {
    return (
      <div class="ins-bar-chart">
        <h2>{this.name}</h2>
        <div class="bar-chart-container"></div>
      </div>
    )
  }
}
