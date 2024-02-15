x = 10;

document.getElementById("videoRate").innerHTML=x + " fps";

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://mistywesttestingwebpubsub.webpubsub.azure.com/getWebPubSubToken')
    .then(response => response.text())
    .then(url => {
        const websocket = new WebSocket(url);

        websocket.onopen = () => {
            console.log('Connection established');
            websocket.send(JSON.stringify({ type: 'joinGroup', group: 'dashboard' }));
        };

        websocket.onmessage = event => {
            const message = JSON.parse(event.data);
            console.log('Message received:', message);
            // Process the message as needed
        };

        websocket.onerror = error => {
            console.error('WebSocket error:', error);
        };

        websocket.onclose = () => {
            console.log('Connection closed');
        };
    })
    .catch(error => console.error('Fetching Web PubSub token failed:', error));
});

console.log()