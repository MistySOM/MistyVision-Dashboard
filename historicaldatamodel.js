export default class HistoricalDataModel {
    timestamps = [];
    carCounts = [];
    busCounts = [];
    truckCounts = [];
    downloadURLs = [];
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
//            console.log('Data received:', data);
            this.dataLength = data.length;

            data.forEach(item => {
//                console.log('Timestamp:', item.timestamp);
//                console.log('Total count:', item.track_history.total_count);
//                console.log('Car count:', item.track_history.car);
//                console.log('Bus count:', item.track_history.bus);
//                console.log('Truck count:', item.track_history.truck);
//                console.log('Download URL:', item.download_url);
//                console.log('---------------------------------------');

                this.timestamps.push(item.timestamp);
                this.carCounts.push(item.track_history.car);
                this.busCounts.push(item.track_history.bus);
                this.truckCounts.push(item.track_history.truck);
                this.downloadURLs.push(item.download_url);
            });
            this.notify();
        } catch (error) {
            console.error('Error parsing Historical Data message:', error);
        }
    }
}