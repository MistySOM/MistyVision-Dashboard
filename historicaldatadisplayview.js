import DashboardDataModel from './dashboarddatamodel.js';

export default class HistoricalDataDisplayView {
    pstDateTime = '';
    videoRate = 0;
    drpaiRate = 0;

    constructor(model) {
        this.model = model;
        this.model.subscribe(this.updateHistoricalDataDisplay.bind(this));
    }

    updateHistoricalDataDisplay() {

    }
}