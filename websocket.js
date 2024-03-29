var webSocketStart = new WebSocket("ws://127.0.0.1:1001");
var webSocketFinish = new WebSocket("ws://127.0.0.1:1002");

webSocketStart.onopen = function(event) {
    console.log("Connection to Startkiste established");
}

webSocketFinish.onopen = function(Eevent) {
    console.log("Connection to Zielkiste established");
}

webSocketStart.onclose = function(event) {
    console.log("Connection to Startkiste closed");
}

webSocketFinish.onclose = function(event) {
    console.log("Connection to Zielkiste closed");
}

webSocketStart.onmessage = function(event) {
    var message = event.data;
    console.log("Message from Startkiste: " + message);
    var starter = parseMessage(message);
    if(starter) {
        start(starter.startnumber, starter.time);
    } else {
        // IGNORE
        // message probably broken
    }
}

webSocketFinish.onmessage = function(event) {
    var message = event.data;
    console.log("Message from Zielkiste: " + message);
    var starter = parseMessage(message);
    if(starter) {
        stop(starter.startnumber, starter.time);
    } else {
        // IGNORE
        // message probably broken
    }
}


function parseMessage(message) {
    var match;
    if(match = message.match(/(\d+)\/(\d{12})/)) {
        return {
            startnumber: parseInt(match[1]),
            time: parseFloat(match[2])
        };
    } else {
        return null;
    }
}
