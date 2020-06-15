import { h, Component, Prop, Watch, State, Element, Method } from '@stencil/core';
declare var Highcharts;

@Component({ tag: 'ins-sparkline' })

export class InsSparkline {
  @Element() insSparklineEl: HTMLElement;
  @Prop({ mutable: true }) icon: string = "icon-user-1";
  @Prop({ mutable: true }) name: string = "Sparkline";
  @Prop({mutable: true}) value: string = "0";
  @Prop({ mutable: true }) chartData: any;
  @Prop({mutable: true}) percentage: any = "0";
  @Prop({mutable: true}) description: string = "N/A";
  @Prop({mutable: true}) movement: any = "none";
  @Prop({ mutable: true }) dataSrc: string;
  @State() container: any;


  componentDidLoad() {
    const self = this;
    self.container = this.insSparklineEl.querySelector('.chart-container');
    if (self.dataSrc) {
      self.fetchSparkline();
    }

    // var userAgent = window.navigator.userAgent.toLowerCase();
    // var ipad = /iphone|ipod|ipad/.test(userAgent);

    // if (ipad) {
    //   var iconNav = $('span.value');

    //   iconNav.addClass('openSans');
    // } 
  }

  componentWillUpdate() {
      const self = this;
      self.movement = self.movement.toLowerCase();

      switch (self.movement) {
          case '1':
          case 'increase':
              self.movement = 'increase';
              break;
          case '0':
          case 'decrease':
              self.movement = 'decrease';
              break;
          default:
              self.movement = 'none';
      }
  }

  @Method()
  val(attr, value) {
    let data = {
      icon: this.icon,
      name: this.name,
      value: this.value,
      chartData: this.chartData,
      percentage: this.percentage,
      description: this.description,
      movement: this.movement,
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

  @Method()
  setValue(data) {
    const self = this;
    if(typeof(data) === 'object' && data instanceof Object && !Object.keys(data).length === false) {
      self.icon = data.icon;
      self.name = data.name;
      self.value = data.value;
      self.percentage = data.percentage;
      self.description = data.description;
      self.movement = data.movement;
      self.dataSrc = data.data_src;
      self.chartData = data.sparkline_data;
      self.reRenderChart(self.chartData);
    } else {
      return;
    }

  }

  @Method()
  getValue() {
    const self = this;
    return {
      icon: self.icon,
      name: self.name,
      value: self.value,
      percentage: self.percentage,
      description: self.description,
      movement: self.movement,
      sparkline_data: self.chartData,
      data_src: self.dataSrc
    }
  }

  refSparklineDetails(data) {
    const self = this;
    self.icon = data.icon;
    self.name = data.name;
    self.value = data.value;
    self.percentage = data.percentage;
    self.description = data.description;
    self.movement = data.movement.toLowerCase();
  }

  fetchSparkline() {
    const self = this;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        self.refSparklineDetails(data);
        let t = [];
        data.sparkline_data.map((value) => {
          let num = parseInt(value[1]);
          let data = [value[0], num];
          t.push(data);
        });
        self.reRenderChart(t);
      }
    };
    xhttp.open("GET", this.dataSrc, true);
    xhttp.send();
  }

  @Method()
  reRenderChart(chartData) {
    this.chartData = chartData;

    this.renderChart();
  }

  @Watch('chartData')
  watchChartData() {
    this.renderChart();
  }

  renderChart() {
    let component = this;
    setTimeout(() => {
      if ((window as any).Highcharts){
        Highcharts.chart({
          chart: {
            renderTo: component.container,
            type: 'spline',
            height: 150,
            marginBottom: 30,
            style: {
              fontFamily: 'Open Sans'
            }
          },
          title: {
            text: false
          },
          legend: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          yAxis: {
            visible: false,
            minRange: 0.1
          },
          xAxis: {
            categories: [],
            visible: false
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            series: {
              marker: {
                enabled: false
              }
            },
            areaspline: {
              marker: {
                enabled: false
              },
              fillOpacity: 0.1,
            }
          },
          series: [{
            name: component.name,
            data: component.chartData
          }],
          tooltip: {
            headerFormat: '<div>',
            pointFormat: '<span>{point.y}</span>',
            footerFormat: '</div>',
            // borderRadius: 0,
            borderWidth: 0,
            shadow: {
              opacity: .02,
              offsetX: 1,
              offsetY: 1,
              width: 10
            },
            padding: 5,
            backgroundColor: '#fff',
            formatter: function () {
              return `<span> ${this.key} <br /> <strong>${this.y}</strong></span>`
              //  return moment(this.x).format('YYYY-MM-DD') + ': <b>' + this.y + '</b>';
            }
          }
        });
      }
    }, 1000);
  }

  render() {
    return (
      <div class="sparkline">
        <i class={`far ${this.icon}`}></i>
        <h3>{this.name}</h3>
        <span class="value">{this.value}</span>
        <div class="chart-container"></div>

        {this.percentage !== 'N/A' && this.percentage !== 0
          ? <div class={`description ${this.movement}`}>{/*this.movement === "1" || */}
            {this.percentage ?
              <div>
                {this.movement === 'increase' || this.movement === 'decrease' ? <span class="arrow"></span> : '- '}
                <span>{this.percentage}%</span> {this.description}
              </div>
              :
              <div>
                - 0% {this.description}
              </div>
            }
          </div> :
          <div class={`description`}>
            {/* <span>{!this.percentage ? 0 : this.percentage}%</span> {this.description} */}
            <span>N/A</span>
          </div>
        }
      </div>
    )
  }

}
