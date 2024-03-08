import {handleWebSocketMessage} from './dashboarddatahandler.js';

let websocket = null;

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://mistyvisionfunctionapp.azurewebsites.net/api/getWebPubSubToken')
    .then(response => response.text())
    .then(url => {
        websocket = new WebSocket(url);

        websocket.onopen = () => {
            console.log('Connection established');
        };

        websocket.onmessage = handleWebSocketMessage;

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