export default class VideoPlayer {

    constructor() {
        this.liveVideo = false;
        this.init();
    }

    init() {
        fetch("https://mistyvisionfunctionapp.azurewebsites.net/api/getliveeventoutputhls", {redirect:'follow'}).then(response => {
            console.log(response.url);
            const source = { src:response.url, type:'application/x-mpegURL' };
            const videojs_player = videojs('hls-video', {
                autoplay: 'muted',
                liveui: true,
                inactivityTimeout: 0,
                sources: [ source ]
            }, () => {
                console.log('Video-js is ready!');

                videojs_player.on('liveedgechange', () => {
                    if (videojs_player.liveTracker.atLiveEdge()) {
                        if (this.liveVideo == false) {
                            console.log('Video player is live.');
                        }
                        this.liveVideo = true;
                    } else if (videojs_player.liveTracker.behindLiveEdge()) {
                        if (this.liveVideo == true) {
                            console.log('Video player is not live.');
                        }
                        this.liveVideo = false;
                    }
                });
            });
        });
    };
}
