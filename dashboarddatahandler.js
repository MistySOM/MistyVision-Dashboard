export function handleWebSocketMessage(event) {
    try {
        const message = JSON.parse(event.data);
        console.log('Message received:', message);

        const videoRate = parseInt(message["video_rate"]) || -1;
        const drpaiRate = parseInt(message["drpai_rate"]) || -1;
        const timestamp = message.timestamp || "N/A";
        const trackedPerHour = parseInt(message["tracked_per_hour"]) || -1;

        const timePortion = timestamp ? timestamp.split('T')[1] ? timestamp.split('T')[1].split('.')[0] : "N/A" : "N/A";

        const pstDateTime = new Date(timestamp).toLocaleString('en-US', {
            timeZone: 'America/Vancouver',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

    document.getElementById("videoRate").innerHTML = videoRate + " FPS";
    document.getElementById("drpaiRate").innerHTML = drpaiRate + " FPS";
    document.getElementById("timePortion").innerHTML = pstDateTime;
    document.getElementById("trackedRate").innerHTML = trackedPerHour + " VEHICLES / DAY";

    } catch (error) {
            console.error('Error parsing WebSocket message:', error);
    }
}