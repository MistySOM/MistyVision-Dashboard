export default class VideoPlayer {

    constructor() {
        this.liveVideo = false;
        this.videojs_player = null;
        this.init();
    }

    init() {
        fetch("https://mistyvisionfunctionapp.azurewebsites.net/api/getliveeventoutputhls", {redirect:'follow'}).then(response => {
            console.log(response.url);
            const source = { src:response.url, type:'application/x-mpegURL' };
            this.videojs_player = videojs('hls-video', {
                autoplay: 'muted',
                liveui: true,
                inactivityTimeout: 0,
                sources: [ source ]
            }, () => {
                console.log('Video-js is ready!');

                this.videojs_player.on('timeupdate', this.change);
                this.videojs_player.on('durationchange', this.change);
                this.videojs_player.on('play', this.change);
                this.videojs_player.on('pause', this.change);
            });
        });
    };

    change() {
        if ((this.videojs_player.liveTracker != null && this.videojs_player.liveTracker.atLiveEdge()) || this.videojs_player.liveDisplay != null) {
            if (this.liveVideo == false) {
                console.log('Video player is live.');
            }
            this.liveVideo = true;
        } else if ((this.videojs_player.liveTracker != null && this.videojs_player.liveTracker.behindLiveEdge()) || this.videojs_player.liveDisplay == null) {
            if (this.liveVideo == true) {
                console.log('Video player is not live.');
            }
            this.liveVideo = false;
        }
    }
}
