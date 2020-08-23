const li_watchBtn = document.querySelector('.li-watchBtn');
const li_hostBtn = document.querySelector('.li-hostBtn');
const li_watchUsername = document.querySelector('.li-watchUsername');

function init(){
  li_watchBtn.addEventListener('click',function(){
    username = li_watchUsername.value;
    location.href = `/live/watch?username=${username}`;
  });
  li_hostBtn.addEventListener('click',function(){
    location.href = `/live/host`
  });
}
init();