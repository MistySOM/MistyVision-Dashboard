import HistoricalDataModel from './historicaldatamodel.js';

export default class HistoricalDataDisplayView {
    pstDate;
    pstStartTime;
    pstEndTime;
    year;
    month;
    day;
    carCount;
    truckCount;
    busCount;
    carLabel;
    truckLabel;
    busLabel;
    csvURL;
    videoURL;
    fileName;
    dataLength;
    dateId;
    timeId;
    carId;
    truckId;
    busId;
    csvURLId;
    videoURLId;

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

            this.pstStartTime = new Date(new Date(this.model.timestamps[i]).getTime() - 3600000).toLocaleTimeString('en-US', {
                timeZone: 'America/Vancouver',
                hour: 'numeric'
            })
            .split(' ')[0];
            console.log(this.pstStartTime);

            this.pstEndTime = new Date(this.model.timestamps[i]).toLocaleTimeString('en-US', {
                timeZone: 'America/Vancouver',
                hour: 'numeric'
            });

            this.carCount = this.model.carCounts[i];
            this.truckCount = this.model.truckCounts[i];
            this.busCount = this.model.busCounts[i];

            this.carLabel = this.carCount == 1 ? " Car" : " Cars";
            this.truckLabel = this.truckCount == 1 ? " Truck" : " Trucks";
            this.busLabel = this.busCount == 1 ? " Bus" : " Buses";

            this.dateId = "date" + (i + 1);
            this.timeId = "time" + (i + 1);
            this.carId = "car" + (i + 1);
            this.truckId = "truck" + (i + 1);
            this.busId = "bus" + (i + 1);
            this.csvURLId = "csv" + (i + 1);
            this.videoURLId = "video" + (i + 1);

            document.getElementById(this.dateId).innerHTML = this.pstDate;
            document.getElementById(this.timeId).innerHTML = this.pstStartTime + "-" + this.pstEndTime;
            document.getElementById(this.carId).innerHTML = this.carCount + this.carLabel;
            document.getElementById(this.truckId).innerHTML = this.truckCount + this.truckLabel;
            document.getElementById(this.busId).innerHTML = this.busCount + this.busLabel;

            if (this.model.csvURLs[i] == '') {
                this.csvURL = '';
                this.fileName = '';
                document.getElementById(this.csvURLId).setAttribute('href', 'javascript:void(0)');
                document.getElementById(this.csvURLId).removeAttribute('download');
            } else {
                this.csvURL = this.model.csvURLs[i];
                this.fileName = "MistyVisionData_" + this.model.timestamps[i].replace(/[^\w\s-]/g, '-');
                document.getElementById(this.csvURLId).setAttribute('href', this.csvURL);
                document.getElementById(this.csvURLId).setAttribute('download', this.fileName);
            }

            if (this.model.videoURLs[i] == '') {
                this.videoURL = '';
                document.getElementById(this.videoURLId).setAttribute('href', 'javascript:void(0)');
            } else {
                this.videoURL = this.model.videoURLs[i];
                document.getElementById(this.videoURLId).setAttribute('href', this.videoURL);
            }
        }
    }
}