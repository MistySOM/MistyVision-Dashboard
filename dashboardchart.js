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
        cutout: '80%',
        legend: {
            position: 'bottom'
        }



    };

    const dashboardChart = new Chart(chart, {
        type: 'doughnut',
        data: data,
        options: options
    });
}

window.addEventListener('load', initializeDashboardChart);