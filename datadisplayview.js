import DashboardDataModel from './dashboarddatamodel.js';

export default class DataDisplayView {
    pstDateTime;
    videoRate;
    drpaiRate;
    liveVideo;
    messageStatus;
    deviceStatus;

    constructor(model, videoPlayer) {
        this.model = model;
        this.videoPlayer = videoPlayer;
        this.model.subscribe(this.updateDashboardDisplay.bind(this));
    }

    updateDashboardDisplay() {
        if (this.videoPlayer.liveVideo) {
            if (this.model.messageStatus) {
                this.deviceStatus = "ON";
                this.pstDateTime = new Date(this.model.timestamp).toLocaleString('en-US', {
                    timeZone: 'America/Vancouver',
                    hour12: false,
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
                if (this.pstDateTime.startsWith('24')) {
                    this.pstDateTime = '00' + this.pstDateTime.slice(2);
                }
            } else {
                this.deviceStatus = "NO LIVE DATA";
                this.pstDateTime = "";
                this.model.videoRate = null;
                this.model.drpaiRate = null;
            }
        } else {
            if (this.model.messageStatus) {
                this.deviceStatus = "NO LIVE VIDEO";
                this.pstDateTime = new Date(this.model.timestamp).toLocaleString('en-US', {
                    timeZone: 'America/Vancouver',
                    hour12: false,
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
                if (this.pstDateTime.startsWith('24')) {
                    this.pstDateTime = '00' + this.pstDateTime.slice(2);
                }
            } else {
                this.deviceStatus = "OFFLINE";
                this.pstDateTime = "";
                this.model.videoRate = null;
                this.model.drpaiRate = null;
            }
        }

        document.getElementById("device-status").classList.remove("device-status-on", "device-status-no-vid-no-data", "device-status-offline");

        if (this.deviceStatus === "ON") {
            document.getElementById("device-status").classList.add("device-status-on");
        } else if (this.deviceStatus == "NO LIVE DATA" || this.deviceStatus == "NO LIVE VIDEO") {
            document.getElementById("device-status").classList.add("device-status-no-vid-no-data");
        } else {
            document.getElementById("device-status").classList.add("device-status-offline");
        }

        document.getElementById("device-status").innerHTML = this.deviceStatus;
        document.getElementById("timePortion").innerHTML = this.pstDateTime;
        document.getElementById("videoRate").innerHTML = this.model.videoRate ? this.model.videoRate + " FPS" : '';
        document.getElementById("drpaiRate").innerHTML = this.model.drpaiRate ? this.model.drpaiRate + " FPS" : '';
    }
}