var Timer;
var TotalSeconds;

function CreateTimer(TimerID, Time) {
    Timer = document.getElementById(TimerID);
    TotalSeconds = Time;
    UpdateTimer()
    window.setTimeout("Tick()", 1000);
}

function Tick() {
    TotalSeconds -= 1;
    UpdateTimer()
    window.setTimeout("Tick()", 1000);
}

function UpdateTimer() {
    var Seconds = TotalSeconds;
    var Minutes = Math.floor(Seconds / 60);
    Seconds -= Minutes * (60);
    var TimeStr = LeadingZero(Minutes) + ":" + LeadingZero(Seconds)
    Timer.innerHTML = TimeStr;
}


function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : + Time;
}

(function(){
  'use strict';

  // The initialize function must be run each time a new page is loaded
  Office.initialize = function(reason){
    jQuery(document).ready(function(){
      app.initialize();

      jQuery('#get-data-from-selection').click(getDataFromSelection);
    });
  };

  // Reads data from current document selection and displays a notification
  function getDataFromSelection(){
    Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
      function(result){
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          app.showNotification('The selected text is:', '"' + result.value + '"');
          var newResult = result.value.split(' ').join('+');
          print(newResult);
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "GET", "http://inspiremetcd.azurewebsites.net/api?q=" + newResult, false ); // false for synchronous request
          xmlHttp.send( null );
    return xmlHttp.responseText;
        } else {
          app.showNotification('Error:', result.error.message);
        }
      }
    );
  }

})();
