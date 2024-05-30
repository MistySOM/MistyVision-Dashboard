export default class VideoPlayer {

    constructor() {
        this.liveVideo = false; // Initialize the liveVideo flag to false
        this.init(); // Call the init method to initialize the video player
    }

    init() {
        // Fetch the HLS stream URL from the specified endpoint
        fetch("https://mistyvisionfunctionapp.azurewebsites.net/api/getliveeventoutputhls", {redirect:'follow'}).then(response => {
            console.log(response.url);
            const source = { src:response.url, type:'application/x-mpegURL' }; // Create a source object for the HLS stream

            // Initialize the Video.js player with the specified options and source
            const videojs_player = videojs('hls-video', {
                autoplay: 'muted', // Autoplay the video in muted mode
                liveui: true, // Enable live UI features
                inactivityTimeout: 0, // Disable inactivity timeout
                sources: [source] // Set the source for the video player
            }, () => {
                console.log('Video-js is ready!');

                // Initialize the LatencyCompensator and enable it
                const latencyCompensator = new LatencyCompensator(videojs_player);
                latencyCompensator.enable();

                // Add an event listener for the timeupdate event
                videojs_player.on('timeupdate', () => {
                    if (videojs_player.liveTracker.atLiveEdge()) {
                        // If the player is at the live edge and was not previously live, log the status and update the flag
                        if (this.liveVideo == false) {
                            console.log('Video player is live.');
                        }
                        this.liveVideo = true;
                    } else if (videojs_player.liveTracker.behindLiveEdge()) {
                        // If the player is behind the live edge and was previously live, log the status and update the flag
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