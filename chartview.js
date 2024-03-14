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
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        color: 'white',
                        padding: 30,
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

        const myPlugin = {
            id: 'myPlugin',
            beforeDatasetsDraw: (chart) => {
                const ctx = chart.ctx;
                ctx.save();
                const xCoor = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const yCoor = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                ctx.save();

                ctx.font = '24px work sans';
                ctx.fillStyle = 'Gray';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('TOTAL COUNT', xCoor, yCoor - 75);


                ctx.font = '100px work sans';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.viewModel.totalCount, xCoor, yCoor);

                ctx.font = '20px work sans';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('VEHICLES / HOUR', xCoor, yCoor + 50);

                ctx.restore();
            },
        }

        this.dashboardChart = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [myPlugin]
        });
    }

    updateChart() {
        this.dashboardChart.data.labels = this.viewModel.labels;
        this.dashboardChart.data.datasets[0].data = this.viewModel.data;

        this.dashboardChart.update();
    }
}