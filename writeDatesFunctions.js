//adds a day to the selected day
/** Date is a standard object
	prototype is the keyword, saying we'd like to add something to the Date object
	addDays is the method name (the method created?)
	days is the parameter, how many days to add to the current date
    var jdate = new Date();
    console.log(jdate.toDateString());
    console.log(jdate.addDays(60).toDateString());
*/
Date.prototype.addDays = function(days)
{
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);		//setDate & getDate are methods of the Date object
	return dat;
};

//gfv = get field value
function gfv(fieldName)
{
	return document.params.fieldName.value;
}

//which weekday are we taking lessons? uses the radio button to pass the parameter
function getWeekday()
{
	return document.params.weekday.value;
}// end getWeekDay();

/** checkSkipDates() checks to see if a specified date is part of the skip date array
	commented out parts are modeled after a function found here:  
		(http://stackoverflow.com/questions/7793048/javacript-best-way-to-find-if-value-is-inside-an-object-in-an-array?lq=1)
	
	@param paramArray, the array holding the skip dates
	@param theDate, the date we want to check against the array of skip dates
	@return boolean true if it IS skip date
					false if it is NOT a skip date
*/
function checkSkipDates(theDate, parameterArray)
{
	theDate = convertToDefaultDate(theDate);		//the missing piece of the puzzle!
	var isSkipDate = false;
	
	for (i = 0; i < parameterArray.length; i++)
	{
		if (theDate.valueOf() == parameterArray[i].valueOf())
		{
			isSkipDate = true;
			break;
		}
	}
	return isSkipDate;
}

//creates TWO arrays and returns the last one
function createMatchingWeekdays(startDate, endDate, lessonDay)
{
	startDate = new Date(startDate);
	endDate = new Date(endDate);
	
	//alert(startDate + endDate);
	var dateArray = new Array();

	var currentDate = new Date(startDate);
	
	while (currentDate <= endDate) 
	{
		dateArray.push(currentDate)
		currentDate = currentDate.addDays(1);
	}

	var matchingWeekdays = new Array();
	var currentDate = dateArray[0];
	var currentWeekDay;
	
	for (i = 0; i < dateArray.length; i++)
	{
		currentWeekDay = dateArray[i].getDay();		//remember to also update the weekday of each iteration in the loop
		currentDate = dateArray[i];					//remember to update the currentDate with every iteration! otherwise, it will stick to dateArray[0]	

		if (lessonDay == currentWeekDay)
		{
			matchingWeekdays.push(currentDate);
			currentDate = currentDate.addDays(7);
		}
	}

	return matchingWeekdays;
}

function filterHolidays(element, index, array)
{
	return !(checkSkipDates(element, skipDatesArray));
}

//creates THREE arrays and returns the last one
function createLessonDatesArray(startDate, endDate, lessonDay)
{
	startDate = new Date(startDate);
	var dateArray = new Array();
	var currentDate = startDate;
	
	while (currentDate <= endDate) 
	{
		dateArray.push(currentDate)
		currentDate = currentDate.addDays(1);
	}
	
	var matchingWeekdays = new Array();
	var currentDate = dateArray[0];
	var currentWeekday;
	
	for (i = 0; i < dateArray.length; i++)
	{
		currentWeekday = dateArray[i].getDay();		//remember to also update the weekday of each iteration in the loop
		currentDate = dateArray[i];					//remember to update the currentDate with every iteration! otherwise, it will stick to dateArray[0]	

		if (lessonDay == currentWeekday)
		{
			matchingWeekdays.push(currentDate);
			currentDate = currentDate.addDays(7);
		}
	}
	
	var lessonDatesArray = matchingWeekdays.filter(filterHolidays); 
	return lessonDatesArray;
}

//turns a date (no matter its format) into a default date
function convertToDefaultDate(theDate)
{
	theDate = new Date(theDate);
	return theDate;
}

//uses convertToDefaultDate() against each element in an array. Asides from that, it's identical to convertArray()
function convertArrayToDefaultDates(paramArray)
{
	var convertedArray = new Array(paramArray.length);
	
	for (i = 0; i < paramArray.length; i++)
	{
		convertedArray[i] = paramArray[i];
		convertedArray[i] = convertToDefaultDate(convertedArray[i]);
	}
	return convertedArray;
}

//switches a date between the formats of dateString and a default date
function convertDate(theDate)
{
	if (theDate.getMonth)	//if the parameter in question is of the Date object, then do this.
	{
		theDate = theDate.toDateString();
		return theDate;
	}
	else					//if the parameter in question is a string, then do this.
	{
		theDate = new Date(theDate);
		return theDate;
	}

}//end toFormatted(theDate)

//copies an array of dates, taken as parameter, and switches each value from (proper date to formatted date) or (formatted date to proper date)
function convertArray(paramArray)
{
	var convertedArray = new Array(paramArray.length);
	
	for (i = 0; i < paramArray.length; i++)
	{
		convertedArray[i] = paramArray[i];
		convertedArray[i] = convertDate(convertedArray[i]);
	}
	return convertedArray;
}

//simple function which writes the array, each element at a time. uses "document.write"
function documentWriteArray(paramArray)
{
	var formattedDate;
	document.write("the array is this long: " + paramArray.length + br + br);
	
	for (var i in paramArray)
	{
		formattedDate = i + ") " + paramArray[i].toDateString();
		document.write(formattedDate + br);
	}
}

//a function which attempts to write to the textArea of the form. Will write the entire array!
function writeToTextArea(paramArray)
{
	document.getElementById("outputArea").innerHTML = paramArray.join("\n");
}

//testing whether or not these parameters can work when inputted through the form
function testParam()
{
	var dateStart = new Date(document.params.dateStart.value);
	var dateEnd = new Date(document.params.dateEnd.value);
	
	var weekday = getWeekday();
	
	var output = "dateStart is: " + dateStart + "\n\ndateEnd is " + dateEnd + "\n\nthe weekday you chose is: " + weekday;
	alert(output);
}
