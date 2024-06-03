// Import the HistoricalDataModel module
import HistoricalDataModel from './historicaldatamodel.js';

// Define and export the HistoricalDataDisplayView class
export default class HistoricalDataDisplayView {
    // Declare properties for the historical data display view
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
    videoPlayerId;

    // Constructor to initialize the model and subscribe to updates
    constructor(model) {
        this.model = model;
        this.model.subscribe(this.updateHistoricalDataDisplay.bind(this));
    }

    // Method to update historical data display
    updateHistoricalDataDisplay() {
        // Loop through each item in the historical data
        for (let i = 0; i < this.model.dataLength; i++) {
            // Convert timestamp to PST date and time
            this.pstDate = new Date(this.model.timestamps[i]).toLocaleDateString('en-US', {
                timeZone: 'America/Vancouver',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            // Extract year, month, and day from PST date
            this.year = this.pstDate.substring(6);
            this.month = this.pstDate.substring(0, 2);
            this.day = this.pstDate.substring(3, 5);
             // Format PST date
            this.pstDate = this.year + "/" + this.month + "/" + this.day;

            // Calculate PST start and end time
            this.pstStartTime = new Date(new Date(this.model.timestamps[i]).getTime() - 3600000).toLocaleTimeString('en-US', {
                timeZone: 'America/Vancouver',
                hour: 'numeric'
            })
            .split(' ')[0]; // Extract PST start time

            this.pstEndTime = new Date(this.model.timestamps[i]).toLocaleTimeString('en-US', {
                timeZone: 'America/Vancouver',
                hour: 'numeric'
            }); // Extract PST end time

            // Retrieve car, truck, and bus counts
            this.carCount = this.model.carCounts[i];
            this.truckCount = this.model.truckCounts[i];
            this.busCount = this.model.busCounts[i];

            // Set labels based on count values
            this.carLabel = this.carCount == 1 ? " Car" : " Cars";
            this.truckLabel = this.truckCount == 1 ? " Truck" : " Trucks";
            this.busLabel = this.busCount == 1 ? " Bus" : " Buses";

            // Set element IDs for DOM manipulation
            this.dateId = "date" + (i + 1);
            this.timeId = "time" + (i + 1);
            this.carId = "car" + (i + 1);
            this.truckId = "truck" + (i + 1);
            this.busId = "bus" + (i + 1);
            this.csvURLId = "csv" + (i + 1);
            this.videoURLId = "video" + (i + 1);
            this.videoPlayerId = "videoplayer" + (i + 1);

            // Update DOM elements with historical data
            document.getElementById(this.dateId).innerHTML = this.pstDate;
            document.getElementById(this.timeId).innerHTML = this.pstStartTime + "-" + this.pstEndTime;
            document.getElementById(this.carId).innerHTML = this.carCount + this.carLabel;
            document.getElementById(this.truckId).innerHTML = this.truckCount + this.truckLabel;
            document.getElementById(this.busId).innerHTML = this.busCount + this.busLabel;

            // Check for CSV and video URLs
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
                document.getElementById(this.videoURLId).setAttribute('src', 'javascript:void(0)');
            } else {
                this.videoURL = this.model.videoURLs[i];
                document.getElementById(this.videoURLId).setAttribute('src', this.videoURL);
                document.getElementById(this.videoPlayerId).load();
            }
        }
    }
}