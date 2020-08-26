const chatInputText = document.querySelector('.lw-input-text');
const chatInputSubmit = document.querySelector('.lw-input-submit');
const chatContent = document.querySelector('.lw-chatlog');
const chatInputChannel = document.querySelector('.lw-input-channel');

let latestId = 1;
const currentChannel = chatInputChannel.innerHTML;

function connectChatServer(){
    fetch('/chat/connect',{
        method:'POST'
    }).then(function(res){
        return res.text();
    }).then(function(data){
        const parsedData = JSON.parse(data);
        latestId = parsedData.id;
    });
}
function chatSubmit(){
    chatUpdate();
    if(chatInputText.value != ''){
        const chatData = {
            channel : currentChannel,
            content : chatInputText.value
        }
        fetch('/chat/submit',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chatData)
        }).then(function(res){
            return res.text();
        }).then(function(data){
            const parsedData = JSON.parse(data);
            chatInputText.value = '';
        });
    }
}
function chatUpdate(){
    const chatInfo = {
        id : latestId,
        channel : currentChannel
    };
    fetch('/chat/update',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatInfo)
    }).then(function(res){
        return res.text();
    }).then(function(data){
        const parsedData = JSON.parse(data);
        if(parsedData.chat.length !=0){
            parsedData.chat.forEach(function(chatting){
                chatContent.innerHTML += `<p>${chatting.username} : ${chatting.content}</p>`
            });
            latestId = parsedData.chat[parsedData.chat.length-1].id;
        }
    });
}

function init(){
    connectChatServer();
    chatInputSubmit.addEventListener('click',chatSubmit);
    setInterval(chatUpdate,500);
}
init();