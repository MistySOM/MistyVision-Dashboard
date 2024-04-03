import HistoricalDataModel from './historicaldatamodel.js';

export default class HistoricalDataDisplayView {
    date = '';
    time = 0;
    carCount = 0;
    busCount = 0;
    truckCount = 0;
    downloadURL = '';
    dataLength = 0;

    constructor(model) {
        this.model = model;
        this.model.subscribe(this.updateHistoricalDataDisplay.bind(this));

    }

    updateHistoricalDataDisplay() {
        for (let i = 0; i < this.model.dataLength; i++) {
            this.date = new Date(this.model.timestamps[i]).toLocaleString('en-US', {
                timeZone: 'America/Vancouver',
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });
        }


        document.getElementById("date1").innerHTML = this.date;
    }
}