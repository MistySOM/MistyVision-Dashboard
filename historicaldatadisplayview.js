import HistoricalDataModel from './historicaldatamodel.js';

export default class HistoricalDataDisplayView {
    pstDate;
    pstTime;
    year;
    month;
    day;
    carCount;
    truckCount;
    busCount;
    carLabel;
    truckLabel;
    busLabel;
    downloadURL;
    fileName;
    dataLength;
    dateId;
    timeId;
    carId;
    truckId;
    busId;

    constructor(model) {
        this.model = model;
        this.model.subscribe(this.updateHistoricalDataDisplay.bind(this));
    }

    updateHistoricalDataDisplay() {
        for (let i = 0; i < this.model.dataLength; i++) {
            this.pstDate = new Date(this.model.timestamps[i]).toLocaleDateString('en-US', {
                timeZone: 'America/Vancouver',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            this.year = this.pstDate.substring(6);
            this.month = this.pstDate.substring(0, 2);
            this.day = this.pstDate.substring(3, 5);
            this.pstDate = this.year + "/" + this.month + "/" + this.day;

            this.pstTime = new Date(this.model.timestamps[i]).toLocaleTimeString('en-US', {
                timeZone: 'America/Vancouver',
                hour: 'numeric'
            });

            this.carCount = this.model.carCounts[i];
            this.truckCount = this.model.truckCounts[i];
            this.busCount = this.model.busCounts[i];

            this.carLabel = this.carCount == 1 ? " Car" : " Cars";
            this.truckLabel = this.truckCount == 1 ? " Truck" : " Trucks";
            this.busLabel = this.busCount == 1 ? " Bus" : " Buses";

            this.downloadURL = "https://mistyvisionfunctionapp.azurewebsites.net/api/" + this.model.downloadURLs[i];
            this.fileName = "MistyVisionData_" + this.model.timestamps[i].replace(/[^\w\s-]/g, '-');

            this.dateId = "date" + (i + 1);
            this.timeId = "time" + (i + 1);
            this.carId = "car" + (i + 1);
            this.truckId = "truck" + (i + 1);
            this.busId = "bus" + (i + 1);
            this.downloadURLId = "url" + (i + 1);

            document.getElementById(this.dateId).innerHTML = this.pstDate;
            document.getElementById(this.timeId).innerHTML = this.pstTime;
            document.getElementById(this.carId).innerHTML = this.carCount + this.carLabel;
            document.getElementById(this.truckId).innerHTML = this.truckCount + this.truckLabel;
            document.getElementById(this.busId).innerHTML = this.busCount + this.busLabel;
            document.getElementById(this.downloadURLId).setAttribute('href', this.downloadURL);
            document.getElementById(this.downloadURLId).setAttribute('download', this.fileName);
        }
    }
}