fetch("https://stream-hls.mistysom.com", {redirect:'follow'}).then(response => {
    console.log(response.url);
    const source = { src:response.url, type:'application/x-mpegURL' };
    const videojs_player = videojs('hls-video', {
        autoplay: 'muted',
        liveui: true,
        inactivityTimeout: 0,
        sources: [ source ],
        plugins: {
            dvrseekbar: {}
        }
    }, function() {
        console.log('Video-js is ready!');
        const latencyCompensator = new LatencyCompensator(videojs_player);
        latencyCompensator.enable();

        videojs_player.on('timeupdate', function () {
            if (videojs_player.atLiveEdge()) {
            console.log('Player is at the live edge.');
            } else if (videojs_player.behindLiveEdge()) {
            console.log('Player is behind the live edge.');
            } else {
            console.log('Player is ahead of the live edge.');
            }
        });
    });
});