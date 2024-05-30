// Import the HistoricalDataModel module
import HistoricalDataModel from './historicaldatamodel.js';

// Define and export the HistoricalDisplayView class
export default class HistoricalDataViewModel {
    // Declare properties for the historical data display view
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

    // Constructor to initialize the model and subscribe to updates
    constructor(model) {
        this.model = model; // Assign the historical data model
        this.model.subscribe(this.updateHistoricalDataDisplay.bind(this)); // Subscribe to updates from the model
        this.listeners = []; // Initialize listeners array

        // Method to notify listeners
        this.notify = function(){
            for(var i = 0; i < this.listeners.length; i++){
                var callback = this.listeners[i];
                callback();
            }
        };
    }

    // Method to update historical data display
    updateHistoricalData() {
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

            // Convert timestamp to PST time
            this.pstTime = new Date(this.model.timestamps[i]).toLocaleTimeString('en-US', {
                timeZone: 'America/Vancouver',
                hour: 'numeric'
            });

            // Retrieve car, truck, and bus counts
            this.carCount = this.model.carCounts[i];
            this.truckCount = this.model.truckCounts[i];
            this.busCount = this.model.busCounts[i];

            // Set labels based on count values
            this.carLabel = this.carCount == 1 ? " Car" : " Cars";
            this.truckLabel = this.truckCount == 1 ? " Truck" : " Trucks";
            this.busLabel = this.busCount == 1 ? " Bus" : " Buses";

            // Construct download URL and file name
            this.downloadURL = "https://mistyvisionfunctionapp.azurewebsites.net/api/" + this.model.downloadURLs[i];
            this.fileName = "MistyVisionData_" + this.model.timestamps[i].replace(/[^\w\s-]/g, '-');

            // Set element IDs for DOM manipulation
            this.dateId = "date" + (i + 1);
            this.timeId = "time" + (i + 1);
            this.carId = "car" + (i + 1);
            this.truckId = "truck" + (i + 1);
            this.busId = "bus" + (i + 1);
            this.downloadURLId = "url" + (i + 1);

            // Update DOM elements with historical data
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