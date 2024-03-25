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
            responsive: true,
            onHover: function(event, elements) {
                event.stopPropagation();
            },
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
                            size: function(context) {
                                const width = context.chart.width || 0;
                                return Math.round(width / 38);
                            }
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
                const vh = chart.canvas.clientHeight / 100;

                ctx.save();

                ctx.font = '1.3vw work sans';
                ctx.fillStyle = 'gray';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('TOTAL COUNT', xCoor, yCoor - (10*vh));

                ctx.font = '6vw work sans';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.viewModel.totalCount, xCoor, yCoor);

                ctx.font = '1vw work sans';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('VEHICLES / HOUR', xCoor, yCoor + (8*vh));

                ctx.restore();
            }
        };

        const arcLabels = {
            id: 'arcLabels',
            afterDatasetsDraw: (chart) => {
                const ctx = chart.ctx;

                chart.data.datasets.forEach((dataset, i) => {
                    chart.getDatasetMeta(i).data.forEach((datapoint, index) => {

                        const {x,y} = datapoint.tooltipPosition();
                        const datasetLength = chart.getDatasetMeta(i).data.length;

                        let deltaY = 0;
                        if (index > 0) {
                            const prevModel = chart.getDatasetMeta(i).data[index - 1].tooltipPosition();
                            const prevY = prevModel.y;
                            if (Math.abs(y - prevY) < 20) {
                                deltaY = 15 * (y > prevY ? 1 : -1);
                            }
                        }

                        if (index < datasetLength - 1) {
                            const nextModel = chart.getDatasetMeta(i).data[index + 1].tooltipPosition();
                            const nextY = nextModel.y;
                            if (Math.abs(y - nextY) < 20) {
                                deltaY = 5 * (y > nextY ? 1 : -1);
                            }
                        }

                        const halfwidth = chart.width/2;
                        const halfheight = chart.height/2;
                        const angle = Math.atan2(y - halfheight, x - halfwidth);
                        const radius = Math.min(halfwidth, halfheight) * 0.12;

                        const xLabel = x + radius * Math.cos(angle);
                        const yLabel = y + deltaY + radius * Math.sin(angle);

                        ctx.font = '1.1vw work sans';
                        ctx.fillStyle = 'gray';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(this.viewModel.data[index], xLabel, yLabel);
                    });
                });
            }
        };

        const doughnutShadow = {
            id: 'doughnutShadow',
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const outerRadius = Math.min(chart.chartArea.right - chart.chartArea.left, chart.chartArea.bottom - chart.chartArea.top) / 2;
                const innerRadius = outerRadius * 0.87;
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                // Draw black circular ring
                ctx.save();
                ctx.beginPath();
                ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 30;
                ctx.stroke();
                ctx.restore();
            }
        };

        this.dashboardChart = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [centreText, arcLabels, doughnutShadow]
        });
    }

    updateChart() {
        this.dashboardChart.data.labels = this.viewModel.labels;
        this.dashboardChart.data.datasets[0].data = this.viewModel.data;
        this.dashboardChart.update();
    }
}