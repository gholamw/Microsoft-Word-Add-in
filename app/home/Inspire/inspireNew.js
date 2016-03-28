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

function drawText(words){
                
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
}

//    var voc = [];
//    var links = [];

function parseJson(jsonData){
    //data = jsonData;
    data = '{"query": "wrote the origin of the species", "words": [["Charles Darwin Biography", "http://kids.britannica.com/comptons/article-9273921/Charles-Darwin"], ["Introduction to evolution and natural selection", "https://www.khanacademy.org/science/biology/her/evolution-and-natural-selection/v/introduction-to-evolution-and-natural-selection"]], "mClass": "charles darwin", "alternativeSpellings": "7 Wonders Of The World", "prob": 2.046264554869276e-09}';

    var parsed = JSON.parse(data);
    var arr = [];
    var category = [];
    var z = 0;
    var k =0; 
    var voc = [];
    var links = [];

    for(var x in parsed){
        arr.push(parsed[x]);
    }

    for(var x = 0; x< arr.length; x++){
        category[x] = arr[1];
    }


    while(z < parsed.words.length){
        var temp = arr[1][z][0];
        var temp1 = arr[1][z][1];
        voc[z] = temp;
        links[z] = temp1;
        z++;
    }

// For testing 
for(var p =0; p<voc.length; p++){
    console.log(voc[p]);
    console.log(links[p]);
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
    drawText(words);
}
