let websocket = null;

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://mistyvisionfunctionapp.azurewebsites.net/api/getWebPubSubToken')
    .then(response => response.text())
    .then(url => {
        websocket = new WebSocket(url);

        websocket.onopen = () => {
            console.log('Connection established');

        };

        websocket.onmessage = event => {
            const message = JSON.parse(event.data);
            console.log('Message received:', message);

            const videoRate = parseInt(message["video_rate"]);
            const drpaiRate = parseInt(message["drpai_rate"]);
            const timestamp = message.timestamp;
            const timePortion = timestamp.split('T')[1].split('.')[0];
            const trackedPerHour = parseInt(message["tracked_per_hour"]);

            const pstDateTime = new Date(timestamp).toLocaleString('en-US', {
                    timeZone: 'America/Vancouver',
                    hour12: false,
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });

            document.getElementById("videoRate").innerHTML= videoRate + " fps";
            document.getElementById("drpaiRate").innerHTML= drpaiRate + " fps";
            document.getElementById("timePortion").innerHTML= pstDateTime;
            document.getElementById("trackedRate").innerHTML = trackedPerHour

        };

        websocket.onerror = function(event) {
            console.error('WebSocket error:', event);
        };

        websocket.onclose = function(event) {
            console.log('Connection closed', event.reason, 'Code:', event.code);
        };
    })
    .catch(error => console.error('Fetching Web PubSub token failed:', error));
});


console.log()