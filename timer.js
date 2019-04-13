class Timer {
    constructor(starter) {
        this.starter = starter;
        this.startnumberElement = null;
        this.timeElement = null;
        this.displayingFinishTime = false;
    }

    get hasDisplaySpace() {
        return this.startnumberElement != null && this.timeElement != null;
    }

    assignDisplaySpace(startnumberElement, timeElement) {
        this.startnumberElement = startnumberElement;
        this.timeElement = timeElement;
        this.interval = setInterval(this.updateHTML, 100, this);
    }

    updateHTML(o) {
        o.startnumberElement.innerHTML = Timer.getFormattedStartnumber(o.starter.startnumber);
        o.timeElement.innerHTML = Timer.getFormattedTime(o.starter.startTime);
    }

    stop(time, callback) {
        this.starter.finishTime = time;
        clearInterval(this.interval);
    }

    displayFinishTime(callback) {
        if (this.starter.finishTime != null) {
            this.timeElement.innerHTML = Timer.getFormattedFinishTime(this.starter.startTime, this.starter.finishTime);
            setTimeout(callback, 3000, this);
        } else {
            console.log("no finishTime set for startnumber " + this.starter.startnumber);
        }
    }

    reset() {
        this.isDisplayingFinishTime = false;
        this.startnumberElement.innerHTML = "000";
        this.timeElement.innerHTML = "---.--";
    }

    updateDisplaySpace(startnumberElement, timeElement) {
        this.startnumberElement = startnumberElement;
        this.timeElement = timeElement;
        this.startnumberElement.innerHTML = Timer.getFormattedStartnumber(this.starter.startnumber);
        if (this.interval == null) {
            this.timeElement.innerHTML = Timer.getFormattedFinishTime(this.starter.startTime, this.starter.finishTime);
        }
    }


    //------------ UTILS -----------

    static getFormattedStartnumber(startnumber) {
        var s = startnumber + "";
        while (s.length < 3) s = " " + s;
        return s;
    }

    static getFormattedTime(time) {
        var timeDiff = (Math.round(new Date().getTime() / 100 - time / 10)) / 10;
        timeDiff = timeDiff + "";
        var timeStrings = timeDiff.split(".");
        if (timeStrings.length < 2) timeStrings.push("0");
        while (timeStrings[0].length < 3) timeStrings[0] = "0" + timeStrings[0];
        while (timeStrings[1].length < 2) timeStrings[1] = timeStrings[1] + " ";
        return timeStrings[0] + "." + timeStrings[1];
    }

    static getFormattedFinishTime(startTime, finishTime) {
        var timeDiff = (finishTime - startTime) / 100;
        timeDiff = timeDiff + "";
        var timeStrings = timeDiff.split(".");
        if (timeStrings.length < 2) timeStrings.push("0");
        while (timeStrings[0].length < 3) timeStrings[0] = "0" + timeStrings[0];
        while (timeStrings[1].length < 2) timeStrings[1] = timeStrings[1] + "0";
        return timeStrings[0] + "." + timeStrings[1];
    }
}
