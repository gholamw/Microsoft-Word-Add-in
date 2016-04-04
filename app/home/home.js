window.onload = function() {
   startCountDown(10, 1000, myFunction);
}

function startCountDown(i, p, f) {
   var pause = p;
   var fn = f;
   var countDownObj = document.getElementById("countDown");

   countDownObj.count = function(i) {
      //write out count
      var Seconds = i;
      var Minutes = Math.floor(Seconds / 60);
      Seconds -= Minutes * (60);
      var TimeStr = LeadingZero(Minutes) + ":" + LeadingZero(Seconds)
      countDownObj.innerHTML = TimeStr;
      if (i == 0) {
      //execute function
      fn();
      //stop
      return;
   }
   setTimeout(function() {
      // repeat
      countDownObj.count(i - 1);
      },
      pause  
      );
   }
   //set it going
   countDownObj.count(i);
}

function myFunction(){
    document.getElementById("redButton").src="../../images/ControllerSmallGreen.png";
    document.getElementById("rewardMe").onclick="return true";
};

function UpdateTimer(TotalSeconds) {
    var Seconds = TotalSeconds;
    var Minutes = Math.floor(Seconds / 60);
    Seconds -= Minutes * (60);
    var TimeStr = LeadingZero(Minutes) + ":" + LeadingZero(Seconds)
    Timer.innerHTML = TimeStr;
    if(count==3){
        clearInterval(Timer);
    }
}

function LeadingZero(Time) {

return (Time < 10) ? "0" + Time : + Time;

}