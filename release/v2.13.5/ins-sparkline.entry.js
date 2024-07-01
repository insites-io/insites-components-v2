import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsSparkline = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.icon = "";
        this.name = "";
        this.value = "";
        this.chartData = undefined;
        this.percentage = "";
        this.description = "";
        this.movement = "";
    }
    componentWillLoad() {
        this.checkMovement();
    }
    componentDidLoad() {
        this.insChartEl = this.insSparklineEl.querySelector('ins-chart');
        this.chartContainerEl = this.insChartEl.querySelector('.chart-container');
        this.renderChart();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insSparklineEl);
        }
    }
    componentWillUpdate() {
        this.checkMovement();
    }
    componentDidUpdate() {
        this.renderChart();
    }
    checkMovement() {
        this.movement = this.movement.toLowerCase();
        switch (this.movement) {
            case '1':
            case 'increase':
                this.movement = 'increase';
                break;
            case '0':
            case 'decrease':
                this.movement = 'decrease';
                break;
            default:
                this.movement = 'none';
        }
    }
    renderChart() {
        let options = {
            chart: {
                renderTo: this.chartContainerEl,
                type: 'spline',
                height: 150,
                marginBottom: 30,
                style: {
                    fontFamily: 'Open Sans'
                }
            },
            title: { text: "" },
            legend: { enabled: false },
            exporting: { enabled: false },
            credits: { enabled: false },
            yAxis: {
                visible: false,
                minRange: 0.1
            },
            xAxis: {
                categories: [],
                visible: false
            },
            plotOptions: {
                series: {
                    marker: { enabled: false }
                },
                areaspline: {
                    marker: { enabled: false },
                    fillOpacity: 0.1,
                }
            },
            series: [{
                    name: this.name,
                    data: this.chartData
                }],
            tooltip: {
                headerFormat: '<div>',
                pointFormat: '<span>{point.y}</span>',
                footerFormat: '</div>',
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
                    return `<span> ${this.key} <br /> <strong>${this.y}</strong></span>`;
                }
            }
        };
        this.insChartEl.renderChart(options);
    }
    render() {
        return (h("div", { key: '86f8648fd34f8a1a6d2e9afdd6088a2406a2405a', class: "ins-sparkline" }, h("i", { key: '4f0ffd118e2a7c08c24ee45be8c4eed43d19cd7a', class: `far ${this.icon}` }), h("h3", { key: '69730acaf0da74b77c155bcef2c7ec4ce525731c' }, this.name), h("span", { key: 'a7324f2c6635c8b8f0a4df995b83a124bb39e583', class: "value" }, this.value), h("ins-chart", { key: '560ad011c1b9b25730137c37cc17b5ffd962027a' }), this.percentage !== 'N/A' && this.percentage !== 0
            ? h("div", { class: `description ${this.movement}` }, this.percentage ?
                h("div", null, this.movement === 'increase' || this.movement === 'decrease' ? h("span", { class: "arrow" }) : '- ', h("span", null, this.percentage, "%"), " ", this.description)
                :
                    h("div", null, "- 0% ", this.description)) :
            h("div", { class: `description` }, h("span", null, "N/A"))));
    }
    get insSparklineEl() { return getElement(this); }
};

export { InsSparkline as ins_sparkline };

//# sourceMappingURL=ins-sparkline.entry.js.map