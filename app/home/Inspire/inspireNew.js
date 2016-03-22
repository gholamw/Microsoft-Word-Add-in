Office.initialize = function (reason) {
    // Checks for the DOM to load using the jQuery ready function.
    //var words = new Array("Einstein","Physics","German","Nobel Prize","Relativity","Theory","Atoms","Albert","Energy","Quantum","Science","Current","Particle","E=MC^2");
    $(document).ready(function () {
      //drawText(words);
      getFileAsyncInternal();
      console.log("Check 1");
    });
}

// Usually we encode the data in base64 format before sending it to server.
function encodeBase64(docData) {
    var s = "";
    for (var i = 0; i < docData.length; i++)
        s += String.fromCharCode(docData[i]);
    return window.btoa(s);
}

// Call getFileAsync() to start the retrieving file process.
function getFileAsyncInternal() {
    Office.context.document.getFileAsync("compressed", { sliceSize: 10240 }, function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
            document.getElementById("status").textContent = JSON.stringify(asyncResult);
            console.log("AsyncResult Failed");
        }
        else {
            console.log("AsyncResult Passed");
            getAllSlices(asyncResult.value);
        }
    });
}

// Get all the slices of file from the host after "getFileAsync" is done.
function getAllSlices(file) {
    var sliceCount = file.sliceCount;
    var sliceIndex = 0;
    var docdata = [];
    var getSlice = function () {
        file.getSliceAsync(sliceIndex, function (asyncResult) {
            if (asyncResult.status == "succeeded") {
                docdata = docdata.concat(asyncResult.value.data);
                sliceIndex++;
                if (sliceIndex == sliceCount) {
                    file.closeAsync();
                    onGetAllSlicesSucceeded(docdata);
                }
                else {
                    getSlice();
                }
            }
            else {
                file.closeAsync();
                document.getElementById("status").textContent = JSON.stringify(asyncResult);

            }
        });
    };
    getSlice();
}

// Upload the docx file to server after obtaining all the bits from host.
function onGetAllSlicesSucceeded(docxData) {
    console.log("Making request to python server");
    console.log(docxData);
    $.ajax({
        type: "POST",
        url: "https://inspiremetcdapi.azurewebsites.net/api",
        //Access-Control-Allow-Origin: "https://inspiremetcdapi.azurewebsites.net",
        data: "q:" + encodeBase64(docxData),
        contentType: "application/json; charset=utf-8",
    }).done(function (data) {
        document.getElementById("documentXmlContent").textContent = data;
        console.log(data);
    }).fail(function (jqXHR, textStatus) {
    });
}

function drawText(array){
                
                var canvas = document.getElementById("myCanvas");
                var ctx = canvas.getContext("2d");
                
                canvas.width = 200;
                canvas.height = 200;
                
                ctx.font = "10px Proxima Nova";
                ctx.strokeStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText(words[0], canvas.width/2-32, canvas.height/2+5);
                ctx.fillText(words[1], canvas.width/2+32, canvas.height/2+5);
                ctx.fillText(words[2], canvas.width/2-32, canvas.height/2+60);
                ctx.fillText(words[3], canvas.width/2+32, canvas.height/2+60);
                ctx.fillText(words[4], canvas.width/2-32, canvas.height/2-55);
                ctx.fillText(words[5], canvas.width/2+32, canvas.height/2-55);
                ctx.fillText(words[6], canvas.width/2, canvas.height/2-85);
                ctx.fillText(words[7], canvas.width/2, canvas.height/2+90);
                ctx.fillText(words[8], canvas.width/2, canvas.height/2-25);
                ctx.fillText(words[9], canvas.width/2-65, canvas.height/2-25);
                ctx.fillText(words[10], canvas.width/2+65, canvas.height/2-25);
                ctx.fillText(words[11], canvas.width/2, canvas.height/2+32);
                ctx.fillText(words[12], canvas.width/2-65, canvas.height/2+32);
                ctx.fillText(words[13], canvas.width/2+65, canvas.height/2+32);
}

