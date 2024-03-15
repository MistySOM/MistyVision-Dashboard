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
        document.getElementById("timePortion").innerHTML = this.model.pstDateTime;
        document.getElementById("videoRate").innerHTML = this.model.videoRate + " FPS";
        document.getElementById("drpaiRate").innerHTML = this.model.drpaiRate + " FPS";
    }
}