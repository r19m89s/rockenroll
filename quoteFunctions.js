function getToday(today) 
{
	var today = new Date(2013,7,26);
	var dd = today.getDate();
	var mm = today.getMonth()+1; //months is 0-indexed!
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
	return today;
}

function displayWeekDay_Text()
{
	var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var dayChoice = weekDays[document.params.weekday.value];	// pass a value to the good old, weekDays, array
	document.viewAdjustParams.weekdayChoice.value = dayChoice;
}

function getLessonCode()
{
	return document.params.whichRate.value;
}

//how long is the lesson? (20 minutes? 30? 45? 60?) Uses radio buttons in form to pass parameter to getRate()
function getLessonLength()
{
	return document.params.howLong.value;
}

function getLessonCode_Text()
{
	return rates[getLessonCode()]['name'];
}

function getLessonLength_Text()
{
	return document.params.howLong.value;
}

/** accesses one of element of the array, "rates", which is an array of arrays (~two-dimensional).
	@param code : which array?
	@length length: how long is the lesson?
	@return the specified rate
*/
function getRate(code, length)
{
	return rates(code, length);
}

function calcSub_Lessons()
{
	return document.viewAdjustParams.field_lessonQty.value * document.viewAdjustParams.field_lessonRate.value;
}

//how many full months between 2 dates? (taken from: http://stackoverflow.com/questions/2536379/difference-in-months-between-two-dates-in-javascript)
function monthDiff()
{	
	dateStart = new Date(document.params.dateStart.value);
	dateEnd = new Date(document.params.dateEnd.value);
	
    var monthsLeft = (dateEnd.getFullYear() - dateStart.getFullYear()) * 12;
    monthsLeft -= dateStart.getMonth();
    monthsLeft += dateEnd.getMonth();
    
	return monthsLeft;
}

//produces an array of string values expressing the # of the payment, the date & the amount
function ppInstances()
{
	//dateStart = new Date(document.params.dateStart.value);
	//dateEnd = new Date(document.params.dateEnd.value);
	
	var ppType = document.params.field_ppFreq.value;
	var ye = dateStart.getFullYear(); //get year of the start date
	var mo = dateStart.getMonth(); //get the month of the start date
	var da = 1;
	
	var dueDate = new Date(ye, mo, da);
	
	var len; //zero-indexed numbering of payments of the payment plan array.
	var paramArray = calcPP(calcTotal_Charges());
	
	switch (ppType) {
		case 'quarterly':
			len = Math.floor(monthDiff() / 3);
			var instances = new Array(len);
			var monthsTo2nd = (len % 3);
			for (var i in instances) {
				if (i < 1) {
					dueDate = convertDate(dueDate.addMonths(0))
				} else {
					dueDate = convertDate(dueDate.addMonths(1));
				}
				instances[i] = (i + 1) + ") " + dueDate + " $" + paramArray[i];		
				dueDate = convertToDefaultDate(dueDate);
			}
			break;
		case 'bi-annually':	
			window.alert("bi-annually");
			break;
		default: //the default case will execute the monthly frequency
			len = monthDiff();
			var instances = new Array(len);
			for (i = 0; i < len; i++) {
				if (i < 1) {
					dueDate = convertDate(dueDate.addMonths(0))
				} else {
					dueDate = convertDate(dueDate.addMonths(1));
				}
				instances[i] = (i + 1) + ") " + dueDate + " $" + paramArray[i];		
				dueDate = convertToDefaultDate(dueDate);
			}	
	}
	return instances.join("\n");
}

/** takes in payment plan parameters and calculates a payment plan
	@param freq is it: 		bi-annual, quarterly or monthly?
	@param num:			 	how many payments to make?
	@param dueDate: 		which day of the month are payments due?
	@param upFrontFees: 	any fees which are to be included in the first payment only
*/
function calcPP(total)
{
	var num = monthDiff();
	var paymentPlan = new Array(num);
	var len = paymentPlan.length;
	
	var instAmt = total / num;
	instAmt = instAmt.toFixed(2);
	
	for (i = 0; i < len; i++)
	{
		paymentPlan[i] = instAmt;
	}
	
	return paymentPlan;
}

//DEPRECATED: which quarter of the month is the current date in? returns a percentage of the month which remains
function getRemainingMonth(d1)
{
	var n = d1.getDate();
	
	if (n < 8){
		return 1;
	} else if (n >= 8 && n < 15) {
		return 0.75;
	} else if (n >= 15 && n < 22) {
		return .5;
	} else if (n >= 22 && n < 32) {
		return .25;
	} else {
		return 1;
	}
}

function calcSub_ProgramEvents()
{
    var summer = document.params.summerToggle.value;
    var programEvents_Monthly;
    if (summer === 'yes') {
        programEvents_Monthly = (memEventsFee / 12); 
    } else {
        programEvents_Monthly = (memEventsFee / 10);
    }
	
	var programEvents_ProRated = (programEvents_Monthly * monthDiff());

	//limit the values between $0 and $300
	if (programEvents_ProRated > memEventsFee) {
		return memEventsFee;
	} else if (programEvents_ProRated < 0) {
		return 0;
	} else {
		return programEvents_ProRated;
	}
}

function calcSub_RegFee()
{
	return regFee;
}

function calcTotal_Charges()
{	
	var tuition = calcSub_Lessons() + calcSub_ProgramEvents() + calcSub_RegFee();
	tuition -= calcCredits();
	return tuition;
}

function calcCredits()
{
	var creditAmt;
	var credDesc = document.params.field_creditDescr.value;
	
	if (credDesc == "reg") {
		creditAmt = mmaRegFee;
		document.params.field_creditAmt.value = creditAmt;
	} else if (credDesc == "tuition") {
		creditAmt = document.params.field_creditAmt.value;
	} else {
		creditAmt = 0;
		document.params.field_creditAmt.value = creditAmt;
	}

	return creditAmt;
}

/** creates a payment plan due date function ppInstances()
	//payment #, dueDate, amount
	//1) 09/05/12 $240

function ppInstances()
{
	var ye = document.params.field_ppStartY.value;
	var mo = document.params.field_ppStartM.value;
	var da = 1;
	
	var dueDate = new Date(ye, mo, da);
	
	var len = document.params.field_NumOfPayments.value;
	var paramArray = calcPP(calcTotal_Charges());
	
	var instances = new Array(len);
	
	for (i = 0; i < len; i++) {
		if (i < 1) {
			dueDate = convertDate(dueDate.addMonths(0))
		} else {
			dueDate = convertDate(dueDate.addMonths(1));
		}
		
		instances[i] = (i + 1) + ") " + dueDate + " $" + paramArray[i];		
		dueDate = convertToDefaultDate(dueDate);
	}
	return instances.join("\n");
}
*/

/**OUTPUT FUNCTIONS**/
//writes the selected rate to the text field named, "field_lessonRate"
function printOneRate(code, length)
{
	if (isNaN(rates[code][length])) {
		document.viewAdjustParams.field_lessonRate.value = rates[code][length];
	} else {
		document.viewAdjustParams.field_lessonRate.value = rates[code][length].toFixed(2);
	}
}

function printLessonQty(paramArray)
{
	document.viewAdjustParams.field_lessonQty.value = paramArray.length;
}

function printSub_ProgramEvents()
{
	document.viewAdjustParams.field_programEventFees.value = calcSub_ProgramEvents().toFixed(2);
}

function printQuote()
{
	var lessonQty = document.viewAdjustParams.field_lessonQty.value;
	var summer = function() {
		var x = document.params.summerToggle.value;
		if (x === 'yes') {
			return 'includes';
		} else {
			return 'does NOT include';
		}
	};
	
	var numPayments = monthDiff(); //this is faulty design, only provides good data for monthly payment plans.
    var getAcademyEvents = function(paramArray) {
        for (var key in paramArray) {
            var obj = paramArray[key];
            for (var prop in obj) {
                // important check that this is objects own property 
                // not from prototype prop inherited
                if(obj.hasOwnProperty(prop)){
                    document.quoteOutput.alsoincludes.value = prop + " = " + obj[prop] + "\n";
                }
            }
        }
    };
	
	/*var alsoIncludes = function() {
		dateStart = new Date(document.params.dateStart.value);
		var eventDate;
		var academyEventsProRated = [];
		for (var i in academyEvents) {
			eventDate = new Date(academyEvents[i]['date']);
			if (dateStart.isBefore(eventDate)) {
				academyEventsProRated[i] = {"date": eventDate, "name": academyEvents[i]['name']};
			}
		}
		return academyEventsProRated.join("\n");
	};*/
    
	document.quoteOutput.quotePonents.value =  (getLessonLength_Text() + " minute lessons" + 
												"\n" + getLessonCode_Text() + 
												"\n" + lessonQty + " total lessons in this enrollment" + 
												"\n" + "(This " + summer() + " summer 2014 lessons)" + 
												"\n\n" +				
												"$" + calcTotal_Charges().toFixed(2) + " Grand Total" +
												"\n\n" + 
												"$" + (calcTotal_Charges() / numPayments).toFixed(2) + " per installment for " + numPayments + " installments");
    
	//document.quoteOutput.alsoIncludes.value = alsoIncludes();
	
	document.quoteOutput.alsoIncludes.value =   "Sunday " + academyEvents[0]['date'] + ": " + academyEvents[0]['name'] + 
                                                "\nSunday " + academyEvents[1]['date'] + ": " + academyEvents[1]['name'] + 
                                                "\nSunday " + academyEvents[2]['date'] + ": " + academyEvents[2]['name'] +
                                                "\nThe week of " + "Jan 06 2014 - Jan 12 2014: Academy Wide Themed Workshops" + 
                                                "\nSunday " + academyEvents[3]['date'] + ": " + academyEvents[3]['name'] +
                                                "\nSunday " + academyEvents[4]['date'] + ": " + academyEvents[4]['name'] +
                                                "\nSunday " + academyEvents[5]['date'] + ": " + academyEvents[5]['name'] +
                                                "\n\n" + "and one of the following End of the year Recital dates:" +
                                                "\nSunday " + academyEvents[6]['date'] + ": " + academyEvents[6]['name'] +
                                                "\nSunday " + academyEvents[7]['date'] + ": " + academyEvents[7]['name'] +
                                                "\nSunday " + academyEvents[8]['date'] + ": " + academyEvents[8]['name'];
												
}

function printPP()
{	
	document.quoteOutput.ppOutput.value = ppInstances();
	
	//document.getElementById("ppOutput").innerHTML = "this does not work yet. \n\nDonate to get it working. \n\nRafael accepts cash, guitar lessons, health insurance or food.\n\nThx!";	
}

function printSkips(paramArray)
{
	document.getElementById("skipsExcluded").innerHTML = paramArray.join("\n");
}

//prints a table of all the rates
function printRatesTable()
{
	document.write("<tr><th> </th> <th>20 min</th> <th>30 min</th> <th>45 min</th> <th>60 min</th> </tr>");
	for (var i = 0; i < rates.length; i++) 
	{
        if (i === 0){
            document.write("<tr><td class='leftCells'><strong>" + "Program Intro, Core" + "</strong></td>");
        } else if (i === 1) {
            document.write("<tr><td class='leftCells'><strong>" + "Program Intro, Associate" + "</strong></td>");
        } else {
            document.write("<tr><td class='leftCells'><strong>" + rates[i]['name'] + "</strong></td>");
        }
		document.write("<td>$" + rates[i]['20'].toFixed(2) + "</td>");
        document.write("<td>$" + rates[i]['30'].toFixed(2) + "</td>");
        document.write("<td>$" + rates[i]['45'].toFixed(2) + "</td>");
        document.write("<td>$" + rates[i]['60'].toFixed(2) + "</td>");
		document.write("</tr>");
	}
}
