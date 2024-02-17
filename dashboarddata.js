let websocket = null;

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cosmosdbmistyvisiontrafficdatatrigger.azurewebsites.net/api/getWebPubSubToken?code=FZtORSBboR2pNdLFU6RAwHmcXistCf1RPJAiNP_FnVAtAzFuM34AiQ==')
    .then(response => response.text())
    .then(url => {
        websocket = new WebSocket(url);

        websocket.onopen = () => {
            console.log('Connection established');

        };

        websocket.onmessage = event => {
            const message = JSON.parse(event.data);
            console.log('Message received:', message);
            // add code here Victor
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

x = 10;
document.getElementById("videoRate").innerHTML=x + " fps";

console.log()