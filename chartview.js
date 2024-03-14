import ChartViewModel from './chartviewmodel.js';

export default class ChartView {
    constructor(viewModel) {
        this.viewModel = viewModel;
        this.initializeDashboardChart();
        this.viewModel.subscribe(this.updateChart.bind(this));
    }

    initializeDashboardChart() {
        const chart = document.getElementById('dashboardChart');

        const data = {
            datasets: [{
                data: this.viewModel.data,
                backgroundColor: ['#1400FA', '#7857F7', '#5CFDC6']
            }],

            labels: this.viewModel.labels
        };
        /*
            const centreText = {
                id: 'centreText',
                beforeDraw(chart, args, pluginOptions) {
                    const { ctx, data } = chart;

                    ctx.save();
                    const xCoor = 200;
                    const yCoor = 200;
                    ctx.font = '30px Work-Sans';
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('Center Text', xCoor, yCoor);
                    ctx.restore();
                }
            };

            const drawLabelsPlugin = {
                id: 'drawLabels',
                afterDraw(chart, args, pluginOptions) {
                    const { ctx, chartArea } = chart;

                    const datasets = chart.data.datasets[0];
                    const totalValue = datasets.data.reduce((acc, value) => acc + value, 0);

                    const radius = chartArea.outerRadius;
                    const centerX = chartArea.x + radius;
                    const centerY = chartArea.y + radius;

                    const arc = chart.getDatasetMeta(0).data[0];

                    for (let i = 0; i < datasets.data.length; i++) {
                        const value = datasets.data[i];
                        const angle = arc.startAngle + (arc.endAngle - arc.startAngle) * (value / totalValue);
                        const labelX = centerX + Math.cos(angle) * radius * 1.2; // adjust the factor to control the distance from the center
                        const labelY = centerY + Math.sin(angle) * radius * 1.2;

                        ctx.fillStyle = 'white';
                        ctx.font = '14px Work-Sans';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(datasets.labels[i], labelX, labelY);
                    }
                }
            };
        */
        const options = {
            cutout: '90%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        color: 'white',
                        font: {
                            family: 'Work Sans',
                            size: 17
                        },
                    }
                },
            },
            elements: {
                arc: {
                    borderRadius: 60,
                    borderWidth: 0,
                },
            }
        };

        this.dashboardChart = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }

    updateChart() {
        this.dashboardChart.data.labels = this.viewModel.labels;
        this.dashboardChart.data.datasets[0].data = this.viewModel.data;
        this.dashboardChart.update();
    }
}