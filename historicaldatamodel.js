// Define and export the HistoricalDataModel class
export default class HistoricalDataModel {
    // Declare properties for the historical data model
    timestamps = [];
    carCounts = [];
    busCounts = [];
    truckCounts = [];
    csvURLs = [];
    videoURLs = [];
    dataLength;

    // Method to subscribe listeners for data updates
    subscribe = function(listener){
        this.listeners.push(listener);
    }

    // Constructor to initialize the model and fetch historical data
    constructor() {
        this.fetchHistoricalData();
        this.listeners = [];

        // Method to notify all listeners about data updates
        this.notify = function(){
            for(var i = 0; i < this.listeners.length; i++){
                var callback = this.listeners[i];
                callback();
            }
        };
    }

    // Method to fetch historical data from the server
    fetchHistoricalData() {
        fetch('https://mistyvisionfunctionapp.azurewebsites.net/api/getHourlyVideoMetaData?count=8')
        .then(response => response.json()) // Convert response to JSON format
        .then(data => {
            this.handleHistoricalDataMessage(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    // Method to handle the received historical data
    handleHistoricalDataMessage(data) {
        try {
            this.dataLength = data.length;

            // Loop through each item in the data
            data.forEach(item => {
//                console.log('Timestamp:', item.timestamp);
//                console.log('Total count:', item.track_history && item.track_history.total_count !== undefined ? item.track_history.total_count : 'Does Not Exist');
//                console.log('Car count:', item.track_history && item.track_history.car !== undefined ? item.track_history.car : 'Does Not Exist');
//                console.log('Bus count:', item.track_history && item.track_history.bus !== undefined ? item.track_history.bus : 'Does Not Exist');
//                console.log('Truck count:', item.track_history && item.track_history.truck !== undefined ? item.track_history.truck : 'Does Not Exist');
//                console.log('CSV URL:', item.csv_url !== undefined ? item.csv_url : 'Does Not Exist');
//                console.log('Video URL:', Array.isArray(item.video_url) && item.video_url.length > 0 ? item.video_url[0] : 'Does Not Exist');
//                console.log('---------------------------------------');

                // Populate arrays with timestamps, counts, and URLs
                this.timestamps.push(item.timestamp);
                this.carCounts.push(item.track_history && item.track_history.car !== undefined ? item.track_history.car : 0);
                this.busCounts.push(item.track_history && item.track_history.bus !== undefined ? item.track_history.bus : 0);
                this.truckCounts.push(item.track_history && item.track_history.truck !== undefined ? item.track_history.truck : 0);
                this.csvURLs.push(item.csv_url !== undefined ? item.csv_url : '');
                this.videoURLs.push(Array.isArray(item.video_url) && item.video_url.length > 0 ? item.video_url[0] : '');
            });
            this.notify();
        } catch (error) {
            console.log('Data received:', data);
            console.error('Error parsing Historical Data message:', error);
        }
    }
}