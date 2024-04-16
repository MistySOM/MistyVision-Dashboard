export default class HistoricalDataModel {
    timestamps = [];
    carCounts = [];
    busCounts = [];
    truckCounts = [];
    csvURLs = [];
    videoURLs = [];
    dataLength;

    subscribe = function(listener){
        this.listeners.push(listener);
    }

    constructor() {
        this.fetchHistoricalData();
        this.listeners = [];

        this.notify = function(){
            for(var i = 0; i < this.listeners.length; i++){
                var callback = this.listeners[i];
                callback();
            }
        };
    }

    fetchHistoricalData() {
        fetch('https://mistyvisionfunctionapp.azurewebsites.net/api/getHourlyVideoMetaData?count=8')
        .then(response => response.json())
        .then(data => {
            this.handleHistoricalDataMessage(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    handleHistoricalDataMessage(data) {
        try {
            console.log('Data received:', data);
            this.dataLength = data.length;

            data.forEach(item => {
                console.log('Timestamp:', item.timestamp);
                console.log('Total count:', item.track_history && item.track_history.total_count !== undefined ? item.track_history.total_count : 'Does Not Exist');
                console.log('Car count:', item.track_history && item.track_history.car !== undefined ? item.track_history.car : 'Does Not Exist');
                console.log('Bus count:', item.track_history && item.track_history.bus !== undefined ? item.track_history.bus : 'Does Not Exist');
                console.log('Truck count:', item.track_history && item.track_history.truck !== undefined ? item.track_history.truck : 'Does Not Exist');
                console.log('CSV URL:', item.csv_url !== undefined ? item.csv_url : 'Does Not Exist');
                console.log('Video URL:', Array.isArray(item.video_url) && item.video_url.length > 0 ? item.video_url[0] : 'Does Not Exist');
                console.log('---------------------------------------');

                this.timestamps.push(item.timestamp);
                this.carCounts.push(item.track_history && item.track_history.car !== undefined ? item.track_history.car : 0);
                this.busCounts.push(item.track_history && item.track_history.bus !== undefined ? item.track_history.bus : 0);
                this.truckCounts.push(item.track_history && item.track_history.truck !== undefined ? item.track_history.truck : 0);
                this.csvURLs.push(item.csv_url !== undefined ? item.csv_url : '');
                this.videoURLs.push(Array.isArray(item.video_url) && item.video_url.length > 0 ? item.video_url[0] : '');
            });
            this.notify();
        } catch (error) {
            console.error('Error parsing Historical Data message:', error);
        }
    }
}