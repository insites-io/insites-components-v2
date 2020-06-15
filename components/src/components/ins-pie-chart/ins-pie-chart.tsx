import { h, Component, Prop, Element, Method } from '@stencil/core'
declare var Highcharts;

@Component({ tag: 'ins-pie-chart' })
export class InsPieChart {
    @Element() InsPieChartEl: HTMLElement;
    @Prop({ mutable: true }) chartData: Array<any> = [];
    @Prop({ mutable: true }) size: string;
    @Prop({ mutable: true }) innerSize: string;
    @Prop({ mutable: true }) colors: Array<any>;
    @Prop({ mutable: true }) fillColor: string = '#E4E6EC';
    @Prop({ mutable: true }) dataLabels: boolean = true;
    @Prop({ mutable: true }) title: string = "Pie Chart";
    @Prop({ mutable: true }) innerTitle: boolean = false;
    @Prop({ mutable: true }) titleOffset: number = 20;
    @Prop({ mutable: true }) legends: boolean = false;
    @Prop({ mutable: true }) startAngle: number;
    @Prop({ mutable: true }) endAngle: number;

    container: any;
    chartColors: any;

    componentDidUpdate() {
        this.checkProps();
    }

    componentDidLoad() {
        this.container = this.InsPieChartEl.querySelector('.pie-chart-container');
        this.checkProps();
    }

    checkProps() {
        if (typeof this.chartData === 'string') {
            this.chartData = JSON.parse(this.chartData);
        }

        if (!Array.isArray(this.colors)){
            let generatedColors = [];
            for (let i = 0; i < this.chartData.length; i++) {
                generatedColors.push(Highcharts.Color("#1e86e3").brighten(i  / 10).get());
            }
            this.chartColors = generatedColors;
        } else {
            this.chartColors = this.colors;
        }
        this.renderChart();
    }

    @Method()
    reRenderChart(chartData) {
        this.chartData = chartData;
        this.renderChart();
    }

    renderChart() {
        if ((window as any).Highcharts) {
            Highcharts.chart({
                chart: {
                    renderTo: this.container,
                    type: 'pie',
                    animation: true
                },
                title: {
                    text: this.title,
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
            });
        }
    }

    render() {
        return (
            <div class="ins-pie-chart-wrap">
                <div class="pie-chart-container"></div>
            </div>
        )
    }
}
