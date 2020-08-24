const player = document.querySelector('.player');

function handleSuccess(stream){
    const options = {
        mimeType: 'video/webm'
        };
    const mediaRecorder = new MediaRecorder(stream,options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
        if (e.data.size > 0) {
            // e.data = blob
            e.data.text().then(function(videodata){
                console.log(videodata.length);
                fetch('/stream/upload',{
                    method:'POST',
                    body: videodata,
                    headers: { "Content-Type" : "multipart/form-data" }
                });
            });
        }
    });
    mediaRecorder.start(1000);
}

function init(){
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(handleSuccess);

}

init();