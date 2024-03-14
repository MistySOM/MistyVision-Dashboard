export default class DashboardDataModel {
    videoRate;
    drpaiRate;
    timestamp;
    trackHistory;
    minutes;
    totalCount;
    carCount;
    busCount;
    truckCount;
    timePortion;
    pstDateTime;

    subscribe = function(listener){
        this.listeners.push(listener);
    }

    constructor() {
        this.websocket = null;
        this.initializeWebSocket();
        this.listeners = [];

        this.notify = function(){
            for(var i = 0; i < this.listeners.length; i++){
                var callback = this.listeners[i];
                callback();
            }
        };
    }

    initializeWebSocket() {
        fetch('https://mistyvisionfunctionapp.azurewebsites.net/api/getWebPubSubToken')
        .then(response => response.text())
        .then(url => {
            this.websocket = new WebSocket(url);

            this.websocket.onopen = () => {
                console.log('Connection established');
            };

            this.websocket.onmessage = this.handleWebSocketMessage.bind(this);

            this.websocket.onerror = function(event) {
                console.error('WebSocket error:', event);
            };

            this.websocket.onclose = function(event) {
                console.log('Connection closed', event.reason, 'Code:', event.code);
            };
        })
        .catch(error => console.error('Fetching Web PubSub token failed:', error));
    }

    handleWebSocketMessage(event) {
        try {
            const message = JSON.parse(event.data);
            console.log('Message received:', message);

            this.videoRate = parseInt(message["video_rate"]) || -1;
            this.drpaiRate = parseInt(message["drpai_rate"]) || -1;
            this.timestamp = message.timestamp || "N/A";
            this.trackHistory = message.track_history || {};
            this.minutes = parseInt(this.trackHistory.minutes) || -1;
            this.totalCount = parseInt(this.trackHistory.total_count) || -1;
            this.carCount = parseInt(this.trackHistory.car) || -1;
            this.busCount = parseInt(this.trackHistory.bus) || -1;
            this.truckCount = parseInt(this.trackHistory.truck) || -1;

            this.timePortion = this.timestamp ? this.timestamp.split('T')[1] ? this.timestamp.split('T')[1].split('.')[0] : "N/A" : "N/A";

            this.pstDateTime = new Date(this.timestamp).toLocaleString('en-US', {
                timeZone: 'America/Vancouver',
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });

            document.getElementById("videoRate").innerHTML = this.videoRate + " FPS";
            document.getElementById("drpaiRate").innerHTML = this.drpaiRate + " FPS";
            document.getElementById("timePortion").innerHTML = this.pstDateTime;

            this.notify();
        } catch (error) {
                console.error('Error parsing WebSocket message:', error);
        }
    }
}