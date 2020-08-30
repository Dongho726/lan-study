const jsdDay = document.querySelector(".js-dDay");
const doFormDate = document.querySelector(".dDayDate");
const doName = doFormDate.querySelector("#name");
const doDate = doFormDate.querySelector("#date");
const dDayButton = doFormDate.querySelector("#button");

const dDayName = "dDay";
let days = [];
// You're gonna need this

function getTime(paintName, paintDate) {
  // Don't delete this.
  const xmasDay = new Date(`${paintDate}:00:00:00`);
  const presentDay = new Date();
  const dDay = xmasDay.getTime() - presentDay.getTime();
  const dDate = Math.floor(dDay / 60 / 60 / 24 / 1000 + 1);
  /*const dHours = Math.floor((dDay % (60 * 60 * 24 * 1000)) / 60 / 60 / 1000);
  const dMin = Math.floor(
    ((dDay % (60 * 60 * 24 * 1000)) % (60 * 60 * 1000)) / 60 / 1000
  );
  const dSec = Math.floor(
    (((dDay % (60 * 60 * 24 * 1000)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000
  );*/

  const dayDay = `${
    dDate < 10 ? `D-0${dDate}` : ` D- ${dDate}`
  }`; /* `${
    dHours < 10 ? `0${dHours}` : dHours
  }h ${dMin < 10 ? `0${dMin}` : dMin}m ${dSec < 10 ? `0${dSec}` : dSec}s`*/
  paintRealDDay(paintName, dayDay);
}

function delBtnHandler(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const cleanToDDay = days.filter(function (toDay) {
    return toDay.id !== parseInt(li.id);
  });
  days = cleanToDDay;
  jsdDay.removeChild(li);
  saveToDDay();
}

function saveToDDay() {
  localStorage.setItem(dDayName, JSON.stringify(days));
}
function paintRealDDay(paintName, dayDay) {
  const li = document.createElement("li");
  const spanName = document.createElement("span");
  const spanDDay = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = days.length + 1;
  spanName.innerText = paintName;
  spanDDay.innerText = dayDay;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delBtnHandler);
  li.appendChild(spanName);
  li.appendChild(spanDDay);
  li.appendChild(delBtn);
  jsdDay.appendChild(li);
  li.id = newId;
  console.log(li.id);
}

function paintToDay(paintName, paintYear, paintMonth, paintDay) {
  const newId = days.length + 2;
  const dDayObj = {
    id: newId,
    name: paintName,
    year: paintYear,
    month: paintMonth,
    day: paintDay,
  };
  days.push(dDayObj);
  saveToDDay();
  getTime(dDayObj.name, dDayObj.year, dDayObj.month, dDayObj.day);
}
/*function moveFinishTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.childNodes[0].innerText;
  RemoveLocalStorage(li);
  if (li.parentNode === toDoPending) {
    paintToFinished(text);
    toDoPending.removeChild(li);
  } else {
    paintToPanding(text);
    toFinished.removeChild(li);
  }
}*/
/*
function handle() {
  const name = function handleName(event) {
    event.preventDefault();
    const paintName = doName.value;
    return paintName;
  };

  const year = function handleYear(event) {
    event.preventDefault();
    const paintYear = doYear.value;
    return paintYear;
  };
  const month = function handleMonth(event) {
    event.preventDefault();
    const paintMonth = doMonth.value;
    return paintMonth;
  };
  const day = function handleDay(event) {
    event.preventDefault();
    const paintDay = doDay.value;
    return paintDay;
  };
  getTime(name, year, month, day);
}
*/

function handle(event) {
  event.preventDefault();

  function handleName() {
    const paintName = doName.value;
    doName.value = "";
    return paintName;
  }

  function handleDate() {
    const paintDate = doDate.value;
    doDate.value = "";
    return paintDate;
  }
  paintToDay(handleName(), handleDate());
}

function loadToDay() {
  const loadedToDay = localStorage.getItem(dDayName);
  if (loadedToDay !== null) {
    const parsedToDDay = JSON.parse(loadedToDay);
    parsedToDDay.forEach(function (toDay) {
      paintToDay(toDay.name, toDay.year, toDay.month, toDay.day);
    });
  }
}

function init() {
  loadToDay();
  doFormDate.addEventListener("submit", handle);
}
init();
