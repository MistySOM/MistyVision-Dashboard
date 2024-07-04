// Import the ChartViewModel module
import ChartViewModel from './chartviewmodel.js';

// Define and export the ChartView class
export default class ChartView {
    // Constructor to initialize the chart view
    constructor(viewModel) {
        this.viewModel = viewModel;
        this.initializeDashboardChart();
        this.viewModel.subscribe(this.updateChart.bind(this));
    }

    // Method to initialize the dashboard chart
    initializeDashboardChart() {
        const chart = document.getElementById('dashboardChart');

        // Define the initial data and configuration for the chart
        const data = {
            datasets: [{
                data: this.viewModel.data,
                backgroundColor: ['#1400FA', '#7857F7', '#5CFDC6']
            }],
            labels: this.viewModel.labels
        };

        // Define the options for the chart
        const options = {
            cutout: '90%', // Define the cutout size for the doughnut chart
            rotation: 90,
            responsive: true,
            events: null,
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
                    events: null,
                    labels: {
                        usePointStyle: true,
                        color: 'white',
                        padding: function(context) {
                            const width = context.chart.width || 0;
                            return Math.round(width / 20); // Calculate padding based on chart width
                        },
                        font: {
                            family: 'Work Sans',
                            size: function(context) {
                                const width = context.chart.width || 0;
                                return Math.round(width / 38); // Calculate font size based on chart width
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

        // Define the centreText plugin to display text in the center of the chart
        const centreText = {
            id: 'centreText',
            afterDatasetsDraw: (chart) => {
                const ctx = chart.ctx;

                // Calculate the center coordinates of the chart
                const xCoor = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const yCoor = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                const vh = chart.canvas.clientHeight / 100;

                ctx.save();

                // Draw the 'TOTAL COUNT' label above the center of the chart
                ctx.font = (vh*3.5).toString() + 'px work sans';
                ctx.fillStyle = 'gray';
                ctx.textAlign = 'center'; // Center the text horizontally
                ctx.textBaseline = 'middle'; // Center the text vertically
                ctx.fillText('TOTAL COUNT', xCoor, yCoor - (11*vh));

                // Draw the total count value in the center of the chart
                ctx.font = (vh*16).toString() + 'px work sans';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center'; // Center the text horizontally
                ctx.textBaseline = 'middle'; // Center the text vertically
                if (this.viewModel.messageStatus == false) {
                    // If the message status is false, adjust font size and display 'UNKNOWN'
                    ctx.font = (vh*10).toString() + 'px work sans';
                    ctx.fillText('UNKNOWN', xCoor, yCoor);
                } else {
                    // Otherwise, display the total count from the view model
                    ctx.fillText(this.viewModel.totalCount, xCoor, yCoor);
                }

                // Draw the 'VEHICLES / HOUR' label below the center of the chart
                ctx.font = (vh*3).toString() + 'px work sans';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center'; // Center the text horizontally
                ctx.textBaseline = 'middle'; // Center the text vertically
                ctx.fillText('VEHICLES / HOUR', xCoor, yCoor + (8*vh));
                ctx.restore();
            }
        };

        // Define the arcLabels plugin to display labels on chart segments
        const arcLabels = {
            id: 'arcLabels',
            afterDatasetsDraw: (chart) => {
                const ctx = chart.ctx;

                // Loop through each dataset and each data point to draw labels
                chart.data.datasets.forEach((dataset, i) => {
                    chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                        const dataValue = this.viewModel.data[index]; // Get the data value for the current segment
                        if (dataValue > 0) {
                            const {x,y} = datapoint.tooltipPosition(); // Get the tooltip position for the current segment
                            const datasetLength = chart.getDatasetMeta(i).data.length; // Get the total number of segments

                            let deltaY = 0;
                            if (index > 0) {
                                const prevModel = chart.getDatasetMeta(i).data[index - 1].tooltipPosition();
                                const prevY = prevModel.y;
                                if (Math.abs(y - prevY) < 20) {
                                    deltaY = 15 * (y > prevY ? 1 : -1); // Adjust the Y offset to avoid overlap with the previous label
                                }
                            }

                            if (index < datasetLength - 1) {
                                const nextModel = chart.getDatasetMeta(i).data[index + 1].tooltipPosition();
                                const nextY = nextModel.y;
                                if (Math.abs(y - nextY) < 20) {
                                    deltaY = 5 * (y > nextY ? 1 : -1); // Adjust the Y offset to avoid overlap with the next label
                                }
                            }

                            const vh = chart.canvas.clientHeight / 100;
                            const halfwidth = chart.width/2;
                            const halfheight = chart.height/2;
                            const angle = Math.atan2(y - halfheight, x - halfwidth); // Calculate the angle for the label
                            const radius = Math.min(halfwidth, halfheight) * 0.12; // Calculate the radius for the label position

                            const xLabel = x + radius * Math.cos(angle); // Calculate the X coordinate for the label
                            const yLabel = y + deltaY + radius * Math.sin(angle); // Calculate the Y coordinate for the label

                            ctx.font = (vh*3).toString() + 'px work sans';
                            ctx.fillStyle = 'gray';
                            ctx.textAlign = 'center'; // Center the text horizontally
                            ctx.textBaseline = 'middle'; // Center the text vertically
                            ctx.fillText(this.viewModel.data[index], xLabel, yLabel);
                        }
                    });
                });
            }
        };

        // Define the doughnutShadow plugin to draw a shadow around the doughnut chart
        const doughnutShadow = {
            id: 'doughnutShadow',
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const chartWidth = chart.chartArea.right - chart.chartArea.left; // Calculate the width of the chart area
                const outerRadius = Math.min(chart.chartArea.right - chart.chartArea.left, chart.chartArea.bottom - chart.chartArea.top) / 2; // Calculate the outer radius of the chart
                const innerRadius = outerRadius * 0.87;
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2; // Calculate the X coordinate of the chart center
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2; // Calculate the Y coordinate of the chart center
                const lineWidth = (5 * chartWidth) / 100; // Calculate the line width for the shadow

                ctx.save();
                ctx.beginPath();
                ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2); // Draw a circle for the shadow
                ctx.strokeStyle = 'black';
                ctx.lineWidth = lineWidth;
                ctx.stroke();
                ctx.restore();
            }
        };

        // Create a new Chart instance and assign it to dashboardChart
        this.dashboardChart = new Chart(chart, {
            type: 'doughnut',
            data: data, // Assign the initial data
            options: options, // Assign the options
            plugins: [centreText, arcLabels, doughnutShadow] // Add the custom plugins
        });
    }

    // Method to update the chart with new data
    updateChart() {
        this.dashboardChart.data.labels = this.viewModel.labels;
        this.dashboardChart.data.datasets[0].data = this.viewModel.data;
        this.dashboardChart.update();
    }
}