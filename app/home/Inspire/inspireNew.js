//Initialise Office.js and begin getting text from wrod document
Office.initialize = function (reason) {
    // Checks for the DOM to load using the jQuery ready function.
    //var words = new Array("Einstein","Physics","German","Nobel Prize","Relativity","Theory","Atoms","Albert","Energy","Quantum","Science","Current","Particle","E=MC^2");
    $(document).ready(function () {
      //drawText(words);
      getFileAsyncInternal();
      console.log("Office API ready");
    });
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

// Usually we encode the data in base64 format before sending it to server.
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}


// Upload the docx file to server after obtaining all the bits from host.
function onGetAllSlicesSucceeded(docxData) {
    console.log("Making request to python server");
    //console.log(docxData);
    //console.log(docxData[0]);
    //var stringToSend = btoa(docxData[0]);
    var stringToSend = b64EncodeUnicode(docxData[0]);
    //console.log(stringToSend);
    //Request made to server
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

//add buttons to <ul> as list elements
function drawText(words,links){
    for( var i = 0; i < words.length;i++) {   
        document.getElementById("list").innerHTML += '<li><button class="buttonlink"type="button" onclick="window.open(\'https://en.wikipedia.org'+ links[i] + '\');" >' + words[i] + '</button></li>'
    }
}

//Parses the response from server getting a list of word and a list of corresponding links, then calls the drawText function
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
