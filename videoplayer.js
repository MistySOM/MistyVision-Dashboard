export default class VideoPlayer {

    constructor() {
        this.liveVideo = false;
        this.init();
    }

    init() {
        fetch("https://mistyvisionfunctionapp.azurewebsites.net/api/getliveeventoutputhls", {redirect:'follow'}).then(response => {
            console.log(response.url);
            const source = { src:response.url, type:'application/x-mpegURL' }; // Create a source object for the HLS stream

            // Initialize the Video.js player with the specified options and source
            const videojs_player = videojs('hls-video', {
                autoplay: 'muted',
                liveui: true,
                inactivityTimeout: 0, // Disable inactivity timeout
                sources: [source]
            }, () => {
                console.log('Video-js is ready!');

                const change = () => {
                    if (videojs_player.liveTracker.atLiveEdge() || (videojs_player.duration() === Infinity && videojs_player.playing())) {
                        // If the player is at the live edge and was not previously live, log the status and update the flag
                        if (this.liveVideo == false) {
                            console.log('Video player is live.');
                        }
                        this.liveVideo = true;
                    } else if (videojs_player.liveTracker.behindLiveEdge() || !(videojs_player.duration() === Infinity && videojs_player.playing())) {
                        // If the player is behind the live edge and was previously live, log the status and update the flag
                        if (this.liveVideo == true) {
                            console.log('Video player is not live.');
                        }
                        this.liveVideo = false;
                    }
                }                
                videojs_player.on('timeupdate', change);
                videojs_player.on('durationchange', change);
                videojs_player.on('play', change);
                videojs_player.on('pause', change);
            });
        });
    };
}