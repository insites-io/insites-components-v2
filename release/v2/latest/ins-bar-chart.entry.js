import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsBarChart = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.name = "";
        this.chartData = [];
        this.categories = [];
        this.stacked = false;
        this.horizontal = false;
    }
    componentDidLoad() {
        this.insChartEl = this.insBarChartEl.querySelector('ins-chart');
        this.chartContainerEl = this.insChartEl.querySelector('.chart-container');
        if (this.chartData.length && this.categories.length) {
            this.renderChart();
        }
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insBarChartEl);
        }
    }
    componentWillLoad() {
        this.parseProps();
    }
    componentWillUpdate() {
        this.parseProps();
        this.renderChart();
    }
    parseProps() {
        if (typeof this.chartData === 'string') {
            try {
                this.chartData = JSON.parse(this.chartData);
            }
            catch (e) {
                console.error("Invalid chart data for", this.insBarChartEl);
            }
        }
        if (typeof this.categories === 'string') {
            try {
                this.categories = JSON.parse(this.categories);
            }
            catch (e) {
                console.error("Invalid chart categories for", this.insBarChartEl);
            }
        }
    }
    renderChart() {
        let options = {
            chart: {
                type: this.horizontal ? 'bar' : 'column',
                renderTo: this.chartContainerEl,
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
                borderWidth: 0,
                shadow: {
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
                    dateTimeLabelFormats: {
                        week: '%b %e',
                        day: '%b %e',
                        month: '%b'
                    },
                    categories: this.categories,
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
            series: this.chartData
        };
        this.insChartEl.renderChart(options);
    }
    render() {
        return (h("div", { key: '1c21794d74f496c6396f97400d028141427357e5', class: "ins-bar-chart" }, h("h2", { key: '344f8835a34089c0f5211940e2cbd410eb13ed4d' }, this.name), h("ins-chart", { key: '1ade6d2a75b985719f5946fb286150a7e3016801' })));
    }
    get insBarChartEl() { return getElement(this); }
};

export { InsBarChart as ins_bar_chart };

//# sourceMappingURL=ins-bar-chart.entry.js.map