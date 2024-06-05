// Import the DashboardDataModel module
import DashboardDataModel from './dashboarddatamodel.js';

// Define and export the DataDisplayView class
export default class DataDisplayView {
    // Declare properties for the data display view
    pstDateTime;
    videoRate;
    drpaiRate;
    liveVideo;
    messageStatus;
    deviceStatus;

    // Constructor to initialize the data display view with the model and video player
    constructor(model, videoPlayer) {
        this.model = model;
        this.videoPlayer = videoPlayer;
        this.model.subscribe(this.updateDashboardDisplay.bind(this));
    }

    // Method to update the dashboard display based on the model and video player state
    updateDashboardDisplay() {
        // Check if the video player is live
        if (this.videoPlayer.liveVideo) {
            // If live video and message status is true, set device status to ON
            if (this.model.messageStatus) {
                this.deviceStatus = "ON";
                // Convert the timestamp to PST date and time string
                this.pstDateTime = new Date(this.model.timestamp).toLocaleString('en-US', {
                    timeZone: 'America/Vancouver',
                    hour12: false,
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
                // Adjust the time format if it starts with 24 (midnight case)
                if (this.pstDateTime.startsWith('24')) {
                    this.pstDateTime = '00' + this.pstDateTime.slice(2);
                }
            } else {
                // If no live data, set device status and clear data values
                this.deviceStatus = "NO LIVE DATA";
                this.pstDateTime = "";
                this.model.videoRate = null;
                this.model.drpaiRate = null;
            }
        } else {
            // If not live video, check the message status
            if (this.model.messageStatus) {
                // If message status is true, set device status to NO LIVE VIDEO
                this.deviceStatus = "NO LIVE VIDEO";
                // Convert the timestamp to PST date and time string
                this.pstDateTime = new Date(this.model.timestamp).toLocaleString('en-US', {
                    timeZone: 'America/Vancouver',
                    hour12: false,
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
                // Adjust the time format if it starts with 24 (midnight case)
                if (this.pstDateTime.startsWith('24')) {
                    this.pstDateTime = '00' + this.pstDateTime.slice(2);
                }
            } else {
                // If offline, set device status and clear data values
                this.deviceStatus = "OFFLINE";
                this.pstDateTime = "";
                this.model.videoRate = null;
                this.model.drpaiRate = null;
            }
        }

        // Remove previous status classes from the device status element
        document.getElementById("device-status").classList.remove("device-status-on", "device-status-no-vid-no-data", "device-status-offline");

        // Add the appropriate class based on the current device status
        if (this.deviceStatus === "ON") {
            document.getElementById("device-status").classList.add("device-status-on");
        } else if (this.deviceStatus == "NO LIVE DATA" || this.deviceStatus == "NO LIVE VIDEO") {
            document.getElementById("device-status").classList.add("device-status-no-vid-no-data");
        } else {
            document.getElementById("device-status").classList.add("device-status-offline");
        }

        // Update the HTML elements with the current data
        document.getElementById("device-status").innerHTML = this.deviceStatus;
        document.getElementById("timePortion").innerHTML = this.pstDateTime;
        document.getElementById("videoRate").innerHTML = this.model.videoRate ? this.model.videoRate + " FPS" : '';
        document.getElementById("drpaiRate").innerHTML = this.model.drpaiRate ? this.model.drpaiRate + " FPS" : '';
    }
}