Office.initialize = function (reason) {
    // Checks for the DOM to load using the jQuery ready function.
    //var words = new Array("Einstein","Physics","German","Nobel Prize","Relativity","Theory","Atoms","Albert","Energy","Quantum","Science","Current","Particle","E=MC^2");
    $(document).ready(function () {
      //drawText(words);
      getFileAsyncInternal();
      console.log("Office API ready");
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
    Office.context.document.getFileAsync("text", { sliceSize: 10240 }, function (asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
            //document.getElementById("status").textContent = JSON.stringify(asyncResult);
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
                //document.getElementById("status").textContent = JSON.stringify(asyncResult);

            }
        });
    };
    getSlice();
}

function utf8_to_b64(str) {
    return window.btoa(escape(encodeURIComponent(str)));
}

// Upload the docx file to server after obtaining all the bits from host.
function onGetAllSlicesSucceeded(docxData) {
    console.log("Making request to python server");
    console.log(docxData);
    console.log(docxData[0]);
    var stringToSend = btoa(docxData[0]);
    console.log(stringToSend);
    $.ajax({
        type: "POST",
        url: "https://inspiremetcdapi.azurewebsites.net/api",
        data: {q: stringToSend},
    }).done(function (data) {
        console.log(data);
        parseResponse(data);
    }).fail(function (jqXHR, textStatus) {
    });
}

function drawText(words,links){
    for( var i = 0; i < words.length;i++) {   
        document.getElementById("list").innerHTML += '<li><button class="buttonlink"type="button" onclick="window.open(\'https://en.wikipedia.org/'+ links[i] + '\');" >' + words[i] + '</button></li>'
    }
}

function parseResponse(data){
    var db = data;
    var links = [];
    var words = [];

    for(var X = 0; X < db.words.length;X++)
    {
        links.push(db.words[X][2]);
        words.push(db.words[X][0]);
    }
    console.log(links);
    console.log(words);
    drawText(words,links);
}
