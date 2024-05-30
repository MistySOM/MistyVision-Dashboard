// Import the ChartViewModel module
import ChartViewModel from './chartviewmodel.js';

// Define and export the ChartView class
export default class ChartView {
    // Constructor to initialize the chart view
    constructor(viewModel) {
        this.viewModel = viewModel; // Assign the view model to an instance variable
        this.initializeDashboardChart(); // Initialize the dashboard chart
        this.viewModel.subscribe(this.updateChart.bind(this)); // Subscribe to view model updates
    }

    // Method to initialize the dashboard chart
    initializeDashboardChart() {
        // Get the chart element from the DOM
        const chart = document.getElementById('dashboardChart');

        // Define the initial data and configuration for the chart
        const data = {
            datasets: [{
                data: this.viewModel.data, // Set the initial data from the view model
                backgroundColor: ['#1400FA', '#7857F7', '#5CFDC6'] // Define the colors for each dataset segment
            }],
            labels: this.viewModel.labels // Set the initial labels from the view model
        };

        // Define the options for the chart
        const options = {
            cutout: '90%', // Define the cutout size for the doughnut chart
            rotation: 90, // Rotate the chart 90 degrees
            responsive: true, // Make the chart responsive
            onHover: function(event, elements) {
                event.stopPropagation(); // Stop event propagation on hover
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
                    position: 'bottom', // Position the legend at the bottom
                    onClick: (e) => e.stopPropagation(), // Prevent clicking on legend items
                    labels: {
                        usePointStyle: true, // Use point style for legend labels
                        color: 'white', // Set the color for legend labels
                        padding: function(context) {
                            const width = context.chart.width || 0;
                            return Math.round(width / 20); // Calculate padding based on chart width
                        },
                        font: {
                            family: 'Work Sans', // Set the font family for legend labels
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
                    borderRadius: 20, // Set the border radius for chart segments
                    borderWidth: 0, // Set the border width for chart segments
                },
            }
        };

        // Define the centreText plugin to display text in the center of the chart
        const centreText = {
            id: 'centreText',
            afterDatasetsDraw: (chart) => {
                const ctx = chart.ctx; // Get the 2D drawing context for the chart

                // Calculate the center coordinates of the chart
                const xCoor = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const yCoor = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                const vh = chart.canvas.clientHeight / 100; // Calculate a unit of vertical height

                ctx.save(); // Save the current state of the canvas

                // Draw the 'TOTAL COUNT' label above the center of the chart
                ctx.font = (vh*3.5).toString() + 'px work sans'; // Set the font size and family
                ctx.fillStyle = 'gray'; // Set the fill color
                ctx.textAlign = 'center'; // Center the text horizontally
                ctx.textBaseline = 'middle'; // Center the text vertically
                ctx.fillText('TOTAL COUNT', xCoor, yCoor - (11*vh)); // Draw the text

                // Draw the total count value in the center of the chart
                ctx.font = (vh*16).toString() + 'px work sans'; // Set the font size and family
                ctx.fillStyle = 'white'; // Set the fill color
                ctx.textAlign = 'center'; // Center the text horizontally
                ctx.textBaseline = 'middle'; // Center the text vertically
                if (this.viewModel.messageStatus == false) {
                    // If the message status is false, display 'UNKNOWN'
                    ctx.font = (vh*10).toString() + 'px work sans'; // Adjust the font size
                    ctx.fillText('UNKNOWN', xCoor, yCoor); // Draw the text
                } else {
                    // Otherwise, display the total count from the view model
                    ctx.fillText(this.viewModel.totalCount, xCoor, yCoor); // Draw the text
                }

                // Draw the 'VEHICLES / HOUR' label below the center of the chart
                ctx.font = (vh*3).toString() + 'px work sans'; // Set the font size and family
                ctx.fillStyle = 'white'; // Set the fill color
                ctx.textAlign = 'center'; // Center the text horizontally
                ctx.textBaseline = 'middle'; // Center the text vertically
                ctx.fillText('VEHICLES / HOUR', xCoor, yCoor + (8*vh)); // Draw the text
                ctx.restore(); // Restore the saved state of the canvas
            }
        };

        // Define the arcLabels plugin to display labels on chart segments
        const arcLabels = {
            id: 'arcLabels',
            afterDatasetsDraw: (chart) => {
                const ctx = chart.ctx; // Get the 2D drawing context for the chart

                // Loop through each dataset and each data point to draw labels
                chart.data.datasets.forEach((dataset, i) => {
                    chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                        const dataValue = this.viewModel.data[index]; // Get the data value for the current segment
                        if (dataValue > 0) {
                            const {x,y} = datapoint.tooltipPosition(); // Get the tooltip position for the current segment
                            const datasetLength = chart.getDatasetMeta(i).data.length; // Get the total number of segments

                            let deltaY = 0; // Initialize the Y offset for the label
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

                            const vh = chart.canvas.clientHeight / 100; // Calculate a unit of vertical height
                            const halfwidth = chart.width/2;
                            const halfheight = chart.height/2;
                            const angle = Math.atan2(y - halfheight, x - halfwidth); // Calculate the angle for the label
                            const radius = Math.min(halfwidth, halfheight) * 0.12; // Calculate the radius for the label position

                            const xLabel = x + radius * Math.cos(angle); // Calculate the X coordinate for the label
                            const yLabel = y + deltaY + radius * Math.sin(angle); // Calculate the Y coordinate for the label

                            ctx.font = (vh*3).toString() + 'px work sans'; // Set the font size and family
                            ctx.fillStyle = 'gray'; // Set the fill color
                            ctx.textAlign = 'center'; // Center the text horizontally
                            ctx.textBaseline = 'middle'; // Center the text vertically
                            ctx.fillText(this.viewModel.data[index], xLabel, yLabel); // Draw the label
                        }
                    });
                });
            }
        };

        // Define the doughnutShadow plugin to draw a shadow around the doughnut chart
        const doughnutShadow = {
            id: 'doughnutShadow',
            beforeDraw: (chart) => {
                const ctx = chart.ctx; // Get the 2D drawing context for the chart
                const chartWidth = chart.chartArea.right - chart.chartArea.left; // Calculate the width of the chart area
                const outerRadius = Math.min(chart.chartArea.right - chart.chartArea.left, chart.chartArea.bottom - chart.chartArea.top) / 2; // Calculate the outer radius of the chart
                const innerRadius = outerRadius * 0.87; // Calculate the outer radius of the chart
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2; // Calculate the X coordinate of the chart center
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2; // Calculate the Y coordinate of the chart center
                const lineWidth = (5 * chartWidth) / 100; // Calculate the line width for the shadow

                ctx.save(); // Save the current state of the canvas
                ctx.beginPath(); // Begin a new path
                ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2); // Draw a circle for the shadow
                ctx.strokeStyle = 'black'; // Set the stroke color
                ctx.lineWidth = lineWidth; // Set the line width
                ctx.stroke(); // Apply the stroke
                ctx.restore(); // Restore the saved state of the canvas
            }
        };

        // Create a new Chart instance and assign it to dashboardChart
        this.dashboardChart = new Chart(chart, {
            type: 'doughnut', // Set the chart type to doughnut
            data: data, // Assign the initial data
            options: options, // Assign the options
            plugins: [centreText, arcLabels, doughnutShadow] // Add the custom plugins
        });
    }

    // Method to update the chart with new data
    updateChart() {
        this.dashboardChart.data.labels = this.viewModel.labels; // Update the chart labels
        this.dashboardChart.data.datasets[0].data = this.viewModel.data; // Update the chart data
        this.dashboardChart.update(); // Redraw the chart with the updated data
    }
}