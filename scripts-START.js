//to stop timer on a global scale
let countdown;

const timerDisplay = document.querySelector('.display__time-left');

const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

const alarm = document.querySelector('.alarm');

function timer(seconds) {
  //clear any existing timers
  clearInterval(countdown);

  //archaic  //const now = (new Date()).getTime();

  //now = current time
  const now = Date.now();
  //then = now + seconds instructed //*1000 bcos of ms
  const then = now + seconds * 1000;
  
  //run once then,(2nd below)
  displayTimeLeft(seconds);
  //then is end time
  displayEndTime(then);
  

  
  
  //countdown for global clearing
  countdown = setInterval(() => {
    //counting down seconds
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // stop when it gets to zero
    if (secondsLeft < 0) {
      //so it stops totally, not hide and continue
      clearInterval(countdown);
      alarm.currentTime = 0;
      alarm.play();
      return;//stop
      
    }

    //display it (2nd)
    //console.log(secondsLeft);
    displayTimeLeft(secondsLeft);
    
  }, 1000 ); //interval
}


function stopAlarm() {
  if (!alarm.paused) {
    alarm.pause();
    alarm.currentTime = 0;
  }
}


//display__time-left
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  //format //if rem sec is less than 10 then return zero, else nothing
  const display = `${minutes}:${remainderSeconds  < 10 ? '0' : '' }${remainderSeconds}`;
  //set display format as text content
  timerDisplay.textContent = display;
  //display timer in tab
  document.title = display;

  //console.log({minutes, remainderSeconds}); 
  //console.log(seconds); 
}

//display__end-time
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  //hour gotten from timestamp
  const hour = end.getHours();
  //15:00  to 3:00
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  //minute gotten from timestamp
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}


//start timer with buttons
function startTimer() {
  //console.log(this);

  //turn data-time attr to seconds in numbers
  const seconds = parseInt(this.dataset.time);
  //console.log(seconds);
  timer(seconds);
  
}

buttons.forEach(button => button.addEventListener('click', startTimer));

//textarea
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  //document.name.name
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
})