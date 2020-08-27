const player = document.querySelector('.lw-player');
const videoInputChannel = document.querySelector('.lw-input-channel');

let videoId = 1;
const videoChannel = videoInputChannel.innerHTML;
const mediaSource = new MediaSource();
const vidSource = mediaSource.addSourceBuffer("video/webm\;codecs=vp8");
const url = URL.createObjectURL(mediaSource);
player.src = url;

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
function videoUpdate(){
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
                fetch(`https://onstudy.s3.ap-northeast-2.amazonaws.com/${vid.content}`,{
                    method:'POST'
                }).then(function(res){
                    console.log(res);
                    return res.arrayBuffer();
                }).then(function(buffer){
                    console.log(buffer);
                    vidSource.appendBuffer();
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