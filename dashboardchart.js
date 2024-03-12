function initializeDashboardChart() {
    const chart = document.getElementById('dashboardChart');

    const data = {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: ['#1400FA', '#7857F7', '#5CFDC6']
        }],

        labels: [
            'CARS',
            'TRUCKS',
            'BUSES'
        ]
    };

    const options = {
        cutout: '90%',
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true, // Use point style for legend
            },
        },
        elements: {
            arc: {
                borderRadius: 10,
                borderWidth: 0,
            },
        },
        plugins: {
            afterDraw: function (chart) {
                const ctx = chart.ctx;
                const canvas = chart.canvas;

                const text = 'Center Text'; // Replace with your desired text
                const fontSize = 16; // Set your desired font size
                const fontFamily = 'Arial'; // Set your desired font family

                ctx.font = fontSize + 'px ' + fontFamily;
                ctx.fillStyle = 'white'; // Set your desired text color
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.fillText(text, centerX, centerY);
            }
        },
        center: {
        // Set the center coordinates
        x: '50%',
        y: '50%',
        },
    };


    const dashboardChart = new Chart(chart, {
        type: 'doughnut',
        data: data,
        options: options
    });

}
window.addEventListener('load', initializeDashboardChart);