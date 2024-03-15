import DashboardDataModel from './dashboarddatamodel.js';

export default class DataDisplayView {
    pstDateTime = '';
    videoRate = 0;
    drpaiRate = 0;

    constructor(model) {
        this.model = model;
        this.model.subscribe(this.updateDisplay.bind(this));
    }

    updateDisplay() {
        this.pstDateTime = new Date(this.model.timestamp).toLocaleString('en-US', {
            timeZone: 'America/Vancouver',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        document.getElementById("timePortion").innerHTML = this.pstDateTime;
        document.getElementById("videoRate").innerHTML = this.model.videoRate + " FPS";
        document.getElementById("drpaiRate").innerHTML = this.model.drpaiRate + " FPS";
    }
}