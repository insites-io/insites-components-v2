import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsPieChart = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.chartData = [];
        this.size = undefined;
        this.innerSize = undefined;
        this.colors = undefined;
        this.fillColor = '#E4E6EC';
        this.dataLabels = true;
        this.heading = "Pie Chart";
        this.innerTitle = false;
        this.titleOffset = 20;
        this.legends = false;
        this.startAngle = undefined;
        this.endAngle = undefined;
    }
    componentDidUpdate() {
        this.checkColors();
        this.checkProps();
    }
    componentDidLoad() {
        this.insChartEl = this.InsPieChartEl.querySelector('ins-chart');
        this.chartContainerEl = this.insChartEl.querySelector('.chart-container');
        this.checkColors();
        this.checkProps();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.InsPieChartEl);
        }
    }
    checkProps() {
        if (typeof this.chartData === 'string') {
            try {
                this.chartData = JSON.parse(this.chartData);
            }
            catch (e) {
                console.error("Invalid chart data for", this.InsPieChartEl);
            }
        }
        this.renderChart();
    }
    async checkColors() {
        if (!Array.isArray(this.colors)) {
            let generatedColors = [];
            for (let i = 0; i < this.chartData.length; i++) {
                let generatedColor = await this.insChartEl.generateColor("#1e86e3", i);
                generatedColors.push(generatedColor);
            }
            this.chartColors = generatedColors;
        }
        else {
            this.chartColors = this.colors;
        }
    }
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
        };
        this.insChartEl.renderChart(options);
    }
    render() {
        return (h("div", { key: 'f8bb341f44f08dcdcb9682c67e177e37513e7147', class: "ins-pie-chart-wrap" }, h("ins-chart", { key: '464b83a0af853cfe0d91e0e2eec4f46b6f13d9bf' })));
    }
    get InsPieChartEl() { return getElement(this); }
};

export { InsPieChart as ins_pie_chart };

//# sourceMappingURL=ins-pie-chart.entry.js.map