// Import the DashboardDataModel module
import DashboardDataModel from './dashboarddatamodel.js';

// Define and export the ChartViewModel class
export default class ChartViewModel {
    // Declare properties for the chart view model
    data;
    labels;
    totalCount;
    carCount;
    truckCount;
    busCount;
    messageStatus = false;

    // Method to subscribe listeners for updates
    subscribe = function(listener){
        this.listeners.push(listener);
    }

    // Constructor to initialize the chart view model with the dashboard data model
    constructor(model) {
        this.model = model;
        this.model.subscribe(this.updateChartData.bind(this));
        this.listeners = [];

        // Method to notify all listeners about data updates
        this.notify = function(){
            for (var i = 0; i < this.listeners.length; i++){
                var callback = this.listeners[i];
                callback();
            }
        };
    }

    // Method to update the chart data based on the model state
    updateChartData() {
        if (this.model.messageStatus == false) {
            // If no message status, reset data and counts
            this.totalCount = null;
            this.carCount = null;
            this.truckCount = null;
            this.busCount = null;
            this.data = [];
            this.labels = [];
            this.messageStatus = this.model.messageStatus;
        } else {
            // If message status is true, update data and counts from the model
            this.data = [this.model.carCount, this.model.truckCount, this.model.busCount];
            this.labels = ["CARS", "TRUCKS", "BUSES"];
            this.totalCount = this.model.totalCount;
            this.carCount = this.model.carCount;
            this.truckCount = this.model.truckCount;
            this.busCount = this.model.busCount;
            this.messageStatus = this.model.messageStatus;
        }

        this.notify();
    }
}