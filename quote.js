var skipDates = [];
skipDates = ["Sep 08 2013", "Oct 27 2013", "Nov 26 2013", "Nov 27 2013", "Nov 28 2013", "Nov 29 2013", "Nov 30 2013", "Dec 08 2013", "Dec 23 2013", "Dec 24 2013", "Dec 25 2013", "Dec 26 2013", "Dec 27 2013", "Dec 28 2013", "Dec 29 2013", "Dec 30 2013", "Dec 31 2013", "Jan 01 2014", "Jan 02 2014", "Jan 03 2014", "Jan 04 2014", "Jan 05 2014", "Feb 09 2014", "Feb 17 2014", "Mar 09 2014","Apr 14 2014", "Apr 15 2014","Apr 16 2014","Apr 17 2014","Apr 18 2014","Apr 19 2014","Apr 20 2014","May 04 2014","May 18 2014","Jun 01 2014","Jun 08 2014"];
var skipDatesArray = [];

var academyEvents = [];
academyEvents[0] = {"date": "Sep 08 2013", "name": "Encore Performance"};
academyEvents[1] = {"date": "Oct 27 2013", "name": "Halloween Recital"};
academyEvents[2] = {"date": "Dec 08 2013", "name": "Holiday Performance"};
academyEvents[3] = {"date": "Feb 09 2014", "name": "Skills Labs"};
academyEvents[4] = {"date": "Mar 09 2014", "name": "Duo Ensemble Class"};
academyEvents[5] = {"date": "May 04 2014", "name": "Optimal Performance"};
academyEvents[6] = {"date": "May 18 2014", "name": "End of the year recital 1"};
academyEvents[7] = {"date": "Jun 01 2014", "name": "End of the year recital 2"};
academyEvents[8] = {"date": "Jun 08 2014", "name": "End of the year recital 3"};

var rates = [];
var pr_co = {"name": "Program, Core", "20": 32.00, "30": 48.00, "45": 61.00, "60": 76.00};
var pr_as = {"name": "Program, Associate", "20": 28.00, "30": 41.00, "45": 52.00, "60": 65.00};
var di_co = {"name": "Drop-in, Core", "20": 34.00, "30": 50.00, "45": 64.00, "60": 80.00};
var di_as = {"name": "Drop-in, Associate", "20": 28.75, "30": 43.00, "45": 55.00, "60": 68.00};
var qu_co = {"name": "Quarterly, Core", "20": 33.00, "30": 48.50, "45": 63.00, "60": 78.00};
var qu_as = {"name": "Quarterly, Associate", "20": 29.00, "30": 42.00, "45": 54.00, "60": 67.00};

rates[0] = pr_co;
rates[1] = pr_as;
rates[2] = di_co;
rates[3] = di_as;
rates[4] = qu_co;
rates[5] = qu_as;

var regFee = 30;
var memEventsFee = 300;
var summerYes0 = new Date(2014, 7, 24);
var summerYes1 = new Date(2014, 7, 1);
var summerYes2 = new Date(2014, 7, 24);
var summerNo0 = new Date(2014, 5, 15);
var summerNo1 = new Date(2014, 5, 1);
var summerNo2 = new Date(2014, 5, 30);

var getMemEventsFee = function(enrollmentLength, monthsLeft) {
    if (enrollmentLength === 48) {
        return (300 / 12) * monthsLeft;
    } else if (enrollmentLength === 38) {
        return (300 / 10) * monthsLeft;
    } else {
        return 0;
    }
};
var lessonsFee = function() {
	rate = document.viewAdjustParams.field_lessonRate.value;
	enrollmentLength = document.viewAdjustParams.field_lessonQty.value;
    return rate * enrollmentLength;    
};
var sumQuote = function() { //not quite ready
	dateStart = new Date(document.params.dateStart.value);
	dateEnd = new Date(document.params.dateEnd.value);
	
    var enrLen = getLessonQty(lessonDatesArray);
	var monLeft = monthDiff(d1, d2);
    var rate = rates[0]["60"];
    return regFee + getMemEventsFee(enrLen, monLeft) + lessonsFee();
};

/*pro-rating section*/
var simpleQuote = function() {
	var rateType = document.getElementsByName("simpleType");
		for (var i in rateType) {       
			if (rateType[i].checked) {
				rateType = rateType[i].value;
				break;
			}
		}
	var rateLength = document.getElementsByName("simpleLength");
		for (var i in rateLength) {       
			if (rateLength[i].checked) {
				rateLength = rateLength[i].value;
				break;
			}
		}
	var numLessons = parseFloat(document.getElementsByName('simpleQuoteQty')[0].value);
	var enrName;
	var cost = (rates[rateType][rateLength] * numLessons).toFixed(2);
    
    if (rateType === '0') {
        enrName = "Program Intro, Core";
    } else if (rateType === '1'){
        enrName = "Program Intro, Associate";
    } else {
        enrName = rates[rateType]['name'];
    }
    
	if (numLessons < 2 ) {
        return numLessons + " " + enrName + " lesson for " +  rateLength + " minutes costs: $" + cost;
	} else {
        return numLessons + " " + enrName + " lessons for " +  rateLength + " minutes cost: $" + cost;
	}
};
var summer = function() {
	var x = document.params.summerToggle.value;
	if (x === 'yes') {
		document.params.dateEnd.value = '08/24/2014';
	} else {
		document.params.dateEnd.value = '06/15/2014';
	}
};
var quote = function(startDate, endDate) {
	this.summer = true;
	this.dateStart = new Date(document.params.dateStart.value);
	
};