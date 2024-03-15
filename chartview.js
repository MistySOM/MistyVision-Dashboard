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

        const options = {
            cutout: '90%',
            rotation: 90,
            layout: {
                padding: {
                    top: 40,
                    bottom: 40,
                    left: 40,
                    right: 40
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    onClick: (e) => e.stopPropagation(),
                    labels: {
                        usePointStyle: true,
                        color: 'white',
                        padding: 40,
                        font: {
                            family: 'Work Sans',
                            size: 17
                        },
                    }
                }
            },
            elements: {
                arc: {
                    borderRadius: 20,
                    borderWidth: 0,
                },
            }
        };

        const centreText = {
            id: 'centreText',
            afterDatasetsDraw: (chart) => {
                const ctx = chart.ctx;

                const xCoor = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const yCoor = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                ctx.save();

                ctx.font = '24px work sans';
                ctx.fillStyle = 'gray';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('TOTAL COUNT', xCoor, yCoor - 80);

                ctx.font = '120px work sans';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.viewModel.totalCount, xCoor, yCoor);

                ctx.font = '20px work sans';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('VEHICLES / HOUR', xCoor, yCoor + 60);

                ctx.restore();
            }
        }

        const arcLabels = {
            id: 'arcLabels',
            afterDraw: (chart) => {
                const ctx = chart.ctx;

                chart.data.datasets.forEach((dataset, i) => {
                    chart.getDatasetMeta(i).data.forEach((datapoint, index) => {

                        const { x, y } = datapoint.tooltipPosition();

                        const halfwidth = chart.width/2;
                        const halfheight = chart.height/2;

                        const xLabel = x >= halfwidth ? x + 25 : x - 25;
                        const yLabel = y >= halfheight ? y + 25 : y - 25;

                        const textWidth = ctx.measureText(chart.data.labels[index]).width;
                        ctx.font = '20px work sans';
                        ctx.fillStyle = 'gray';
                        ctx.textAlign = 'ceter';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(this.viewModel.data[index], xLabel, yLabel);
                    })
                })

            }


        }

        this.dashboardChart = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [centreText]
        });
    }

    updateChart() {
        this.dashboardChart.data.labels = this.viewModel.labels;
        this.dashboardChart.data.datasets[0].data = this.viewModel.data;
        this.dashboardChart.update();
    }
}