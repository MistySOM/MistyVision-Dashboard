// Define and export the DashboardDataModel class
export default class DashboardDataModel {
    // Declare properties for the dashboard data model
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
    messageStatus;

    // Method to subscribe listeners for data updates
    subscribe = function(listener){
        this.listeners.push(listener); // Add listener to the list
    }

    // Constructor to initialize the data model and start timeout
    constructor() {
        this.websocket = null;
        this.messageStatus = false;
        this.initializeWebSocket();
        this.listeners = [];

        this.startTimeout();

        // Method to notify all listeners about data updates
        this.notify = function() {
            for (var i = 0; i < this.listeners.length; i++) {
                var callback = this.listeners[i];
                callback();
            }
        };
    }

    // Method to initialize WebSocket connection
    initializeWebSocket() {
        fetch('https://mistyvisionfunctionapp.azurewebsites.net/api/getWebPubSubToken')
        .then(response => response.text()) // Get the token as text
        .then(url => {
            // Create a new WebSocket connection using the token URL
            this.websocket = new WebSocket(url);

            // Set up event listener for WebSocket connection open
            this.websocket.onopen = () => {
                console.log('Connection established');
            };

            // Bind the message handler to the WebSocket onmessage event
            this.websocket.onmessage = this.handleWebSocketMessage.bind(this);

            // Set up event listener for WebSocket errors
            this.websocket.onerror = function(event) {
                console.error('WebSocket error:', event);
            };

            // Set up event listener for WebSocket connection close
            this.websocket.onclose = function(event) {
                console.log('Connection closed', event.reason, 'Code:', event.code);
            };
        })
        .catch(error => console.error('Fetching Web PubSub token failed:', error));
    }

    // Method to start a timeout for checking message status
    startTimeout() {
        // Start the timeout to send a timeout message after 15 seconds
        this.timeoutId = setTimeout(() => {
            this.sendTimeoutMessage();
        }, 15000);
    }

    // Method to send a timeout message indicating no new data
    sendTimeoutMessage() {
        // Notifies that there has been no new data
        this.messageStatus = false;
        this.notify();
    }

    // Method to handle incoming WebSocket messages
    handleWebSocketMessage(event) {
        try {
            // Parse the incoming message as JSON
            const message = JSON.parse(event.data);

            clearTimeout(this.timeoutId);
            this.startTimeout();

            this.messageStatus = true;

            // Update the model properties with received data
            this.videoRate = isNaN(parseInt(message["video_rate"])) ? -1 : parseInt(message["video_rate"]);
            this.drpaiRate = isNaN(parseInt(message["drpai_rate"])) ? -1 : parseInt(message["drpai_rate"]);
            this.timestamp = message.timestamp || "N/A";
            this.trackHistory = message.track_history || {};
            this.minutes = isNaN(parseInt(this.trackHistory.minutes)) ? -1 : parseInt(this.trackHistory.minutes);
            this.totalCount = isNaN(parseInt(this.trackHistory.total_count)) ? "UNKNOWN" : parseInt(this.trackHistory.total_count);
            this.carCount = isNaN(parseInt(this.trackHistory.car)) ? 0 : parseInt(this.trackHistory.car);
            this.busCount = isNaN(parseInt(this.trackHistory.bus)) ? 0 : parseInt(this.trackHistory.bus);
            this.truckCount = isNaN(parseInt(this.trackHistory.truck)) ? 0 : parseInt(this.trackHistory.truck);

            this.notify();
        } catch (error) {
            // Log the received message and error if parsing fails
            console.log('Message received:', event.data);
            console.error('Error parsing WebSocket message:', error);
        }
    }
}