const player = document.querySelector('.lw-player');
const videoInputChannel = document.querySelector('.lw-input-channel');

let videoId = 1;
const videoChannel = videoInputChannel.innerHTML;
var sources = [];

// mediasource
const mediaSource = new MediaSource();
player.src = window.URL.createObjectURL(mediaSource);
mediaSource.addEventListener("sourceopen",function(){
    var sourceBuffer = mediaSource.addSourceBuffer(
        'video/webm; codecs="vorbis,vp8"'
    );
    setInterval(playbuffer(sourceBuffer),500);
});

function playbuffer(sourceBuffer){
    console.log(sources.length);
    if(sources.length > 0){
        sourceBuffer.appendBuffer(sources.shift());
    }
}

function connectVideoServer(){
    fetch('/stream/connect',{
        method:'POST'
    }).then(function(res){
        return res.text();
    }).then(function(data){
        const parsedData = JSON.parse(data);
        videoId = parsedData.id;
    });
}
function videoUpdate(sourceBuffer){
    const chatInfo = {
        id : videoId,
        channel : currentChannel
    };
    fetch('/stream/update',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatInfo)
    }).then(function(res){
        return res.text();
    }).then(function(data){
        const parsedData = JSON.parse(data);
        if(parsedData.video.length !=0){
            parsedData.video.forEach(function(vid){
                // player.src = `https://onstudy.s3.ap-northeast-2.amazonaws.com/${vid.content}`;
                // console.log(vid.content);
                fetch(`https://onstudy.s3.ap-northeast-2.amazonaws.com/${vid.content}`,{
                    method:'GET'
                }).then(function(res){
                    return res.arrayBuffer();
                }).then(function(buffer){
                    sources.push(buffer);
                });
            });
            videoId = parsedData.video[parsedData.video.length-1].id;
        }
    });
}

function init(){
    connectVideoServer();
    setInterval(videoUpdate,500);
}
init();