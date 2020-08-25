const player = document.querySelector('.player');

function handleSuccess(stream){
    const options = {
        mimeType: 'video/webm'
        };
    const mediaRecorder = new MediaRecorder(stream,options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
        if (e.data.size > 0) {
            // e.data = blob
            console.log('ok');
            var fd = new FormData();
            fd.append('video',e.data,Date.now());
            fetch('/stream/upload',{
                method: 'post',
                body: fd
            });
            mediaRecorder.stop();
        }
    });
    mediaRecorder.start(5000);
}

function init(){
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(handleSuccess);
}

init();