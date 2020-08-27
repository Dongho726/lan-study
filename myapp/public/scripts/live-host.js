const onAirBtn = document.querySelector('.lh-onAir');

let nowLive = false;

const ONAIRDISABLE_CN = 'lh-onAir-disabled';
const ONAIRABLE_CN = 'lh-onAir-abled';

function handleSuccess(stream){
    const options = {
        mimeType: 'video/webm'
        };
    const mediaRecorder = new MediaRecorder(stream,options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
        if (e.data.size > 0) {
            var fd = new FormData();
            fd.append('video',e.data,Date.now());
            fetch('/stream/upload',{
                method: 'post',
                body: fd
            });
        }
    });
    onAirBtn.addEventListener('click',function(){
        if(nowLive == false){
            nowLive = true;
            onAirBtn.classList.add(ONAIRABLE_CN);
            onAirBtn.classList.remove(ONAIRDISABLE_CN);
            mediaRecorder.start(1000);
        }else{
            nowLive = false;
            onAirBtn.classList.add(ONAIRDISABLE_CN);
            onAirBtn.classList.remove(ONAIRABLE_CN);
            mediaRecorder.stop();
        }
    });
}

function init(){
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(handleSuccess);
}

init();