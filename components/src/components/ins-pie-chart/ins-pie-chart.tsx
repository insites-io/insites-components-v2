import { h, Component, Prop, Element, Method } from '@stencil/core'

@Component({ tag: 'ins-pie-chart' })
export class InsPieChart {
  @Element() InsPieChartEl: HTMLElement;
  @Prop({ mutable: true }) chartData: Array<any> = [];
  @Prop({ mutable: true }) size: string;
  @Prop({ mutable: true }) innerSize: string;
  @Prop({ mutable: true }) colors: Array<any>;
  @Prop({ mutable: true }) fillColor: string = '#E4E6EC';
  @Prop({ mutable: true }) dataLabels: boolean = true;
  @Prop({ mutable: true }) heading: string = "Pie Chart";
  @Prop({ mutable: true }) innerTitle: boolean = false;
  @Prop({ mutable: true }) titleOffset: number = 20;
  @Prop({ mutable: true }) legends: boolean = false;
  @Prop({ mutable: true }) startAngle: number;
  @Prop({ mutable: true }) endAngle: number;

  insChartEl: any;
  chartContainerEl: any;
  chartColors: any;

  componentDidUpdate() {
    this.checkColors();
    this.checkProps();
  }

  componentDidLoad() {
    this.insChartEl = this.InsPieChartEl.querySelector('ins-chart');
    this.chartContainerEl = this.insChartEl.querySelector('.chart-container');
    this.checkColors();
    this.checkProps();
  }

  checkProps() {
    if (typeof this.chartData === 'string') {
      try {
        this.chartData = JSON.parse(this.chartData);
      } catch(e) {
        console.error("Invalid chart data for", this.InsPieChartEl);
      }
    }
    this.renderChart();
  }

  async checkColors(){
    if (!Array.isArray(this.colors)) {
      let generatedColors = [];
      for (let i = 0; i < this.chartData.length; i++) {
        let generatedColor = await this.insChartEl.generateColor("#1e86e3", i);
        generatedColors.push(generatedColor);
      }
      this.chartColors = generatedColors;
    } else {
      this.chartColors = this.colors;
    }
  }

  @Method()
  async reRenderChart(chartData) {
    this.chartData = chartData;
    this.renderChart();
  }

  renderChart() {
    let options = {
      chart: {
        renderTo: this.chartContainerEl,
        type: 'pie',
        animation: true
      },
      title: {
        text: this.heading,
        align: 'center',
        verticalAlign: this.innerTitle ? 'middle' : '',
        y: this.titleOffset
      },
      plotOptions: {
        pie: {
          colors: this.chartColors,
          dataLabels: { enabled: this.dataLabels },
          tooltip: {
            headerFormat: '<div>',
            pointFormat: '<span>{point.name}: <strong>{point.y}</strong></span>',
            footerFormat: '</div>',
          },
          startAngle: this.startAngle,
          endAngle: this.endAngle,
          showInLegend: this.legends
        }
      },
      series: [{
        name: "Deals",
        data: this.chartData,
        size: this.size,
        innerSize: this.innerSize,
        fillColor: this.fillColor
      }],
      credits: {
        enabled: false
      },
    }

    this.insChartEl.renderChart(options)
  }

  render() {
    return (
      <div class="ins-pie-chart-wrap">
        <ins-chart></ins-chart>
      </div>
    )
  }
}