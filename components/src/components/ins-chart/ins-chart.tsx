import { h, Component, Element, Method } from '@stencil/core'
import Highcharts from "highcharts";

@Component({ tag: 'ins-chart' })

export class InsChart {
  @Element() insChartEl: HTMLElement;

  @Method()
  async renderChart(options) {
    Highcharts.chart(options);
  }

  @Method()
  async generateColor(color, count){
    return new Highcharts.Color(color).brighten(count  / 10).get()
  }

  render() {
    return (<div class="chart-container"></div>)
  }
}
