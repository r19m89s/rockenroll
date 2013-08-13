var br = "<br />";

/***********************************************
					Key Codes
************************************************/

//private or semiprivate
	var pl = "Private";	
	var sp = "Semi-Private";
	
//lesson status
	var pr = "Program";
	var di = "Drop-in";
	var dp = "Drop-In Package";
	
//teacher experience
	var co = "Core";
	var as = "Associate";
	
//lesson length (minutes)
	var length = [20, 30, 45, 60];

//punctuation
	var comma = ", ";
	var colon = ": ";
	var space = " ";
	var under = "_";

var pl_pr_co = pl + colon + pr + comma + co;
var pl_pr_as = pl + colon + pr + comma + as;

var pl_di_co = pl + colon + di + comma + co;
var pl_di_as = pl + colon + di + comma + as;

var pl_dp_co = pl + colon + dp + comma + co;
var pl_dp_as = pl + colon + dp + comma + as;

var sp_pr_co = sp + colon + pr + comma + co;
var sp_pr_as = sp + colon + pr + comma + as;

var sp_di_co = sp + colon + di + comma + co;
var sp_di_as = sp + colon + di + comma + as;

var codes = [];
codes[0] = 

/***********************************************
				Activity #'s
************************************************/
var packageNumbers = [999, 1000, 1001, 1002, 1020, 1021, 1022, 1030, 1031, 1032];
var lessonNumbers = [1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 996, 1040, 1041, 1042];

/***********************************************
				Rates/Prices
************************************************/
var theRates = 	[[28.75, 43.00, 57.25, 71.50], [23.25, 33.00, 45.25, 56.50], [31.00, 46.00, 61.00, 76.00], [25.00, 35.00, 48.00, 60.00], [30.00, 44.50, 59.25, 73.75], [24.25, 34.00, 46.75, 58.25], ["n/a", 46.50, 64.50, 80.50], ["n/a", 35.50, 48.50, 60.50], ["n/a", 50.00, 69.00, 86.00], ["n/a", 38.25, 54.50, 68.00]];

//var programEvents = 456;

var mmaRegFee = 30;

/***********************************************
			Other Variables & Constants
************************************************/
//content for td's in the table id'd as "credits"
var creditDescriptionA =	'<label for="field_creditDescr">Description</label>';
var creditPriceA =			'<label for="field_creditItemPrice">Price</label>';
var creditQtyA = 			'<label for="field_creditQty">Qty.</label>';
var creditAmtA = 			'<label for="field_creditAmt">Amt.</label>';

var creditDescriptionB = 	'<select class="field_creditDescr" >' +
								'<option value="-">-</option>' + 
								'<option value="">Installment</option>' + 
								'<option value="">Summer lessons</option>' + 
								'<option value="">MMA reg. fee</option>' + 
								'<option value="">Barter</option>' + 
								'<option value="">We F\'ed Up</option>' +
							'</select>';
var creditPriceB = 			'<input type="number" name="field_creditItemPrice" id="field_creditItemPrice" min="0.00" max="10000.00" size=\'8\' />';
var creditQtyB =			'<input type="number" name="field_creditQty" id="field_creditQty" min="0.00" max="10000.00" size=\'8\' />';
var creditAmtB = 			'<input type="number" name="field_creditAmt" id="field_creditAmt" min="0.00" max="10000.00" size=\'8\' />';