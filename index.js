/**
* @autor Ernesto Mila Garcia - idooGROUP Company
* @version 1.0.0
* @date 2018/05/21
* @starHour 14:40PM - GTM - TijuanPacifico
* @finishHour 9:40AM - GTM - TijuanPacifico
* Hours to finish the Work 12 hours
**/

//Example jSON input
var jSon = [

{"date":"2013-01-01","rate":"199"},

{"date":"2013-01-02","rate":"199"},

{"date":"2013-01-03","rate":"199.99"},

{"date":"2013-01-04","rate":"199.99"},

{"date":"2013-01-05","rate":"199.99"},

{"date":"2013-01-06","rate":"199.98"},

{"date":"2013-01-07","rate":"199.98"},

{"date":"2013-01-08","rate":"115.49"},

{"date":"2013-01-09","rate":"115.49"},

{"date":"2013-01-10","rate":"115.49"},

{"date":"2013-01-11","rate":"200.00"},

{"date":"2013-01-15","rate":"115.49"},

{"date":"2013-01-16","rate":"115.49"},

{"date":"2013-01-17","rate":"115.49"},

{"date":"2013-01-20","rate":"115.49"},

{"date":"2013-01-21","rate":"115.49"},

{"date":"2013-01-22","rate":"200.00"}

];

//Example jSON output
var outjSon = [

{"period-start":"2013-01-01","period-end":"2013-01-05","rate":"199.99"},

{"period-start":"2013-01-06","period-end":"2013-01-10","rate":"115.49"},

{"period-start":"2013-01-11","period-end":"2013-01-11","rate":"200.00"},

{"period-start":"2013-01-15","period-end":"2013-01-17","rate":"115.49"},

{"period-start":"2013-01-20","period-end":"2013-01-21","rate":"115.49"},

{"period-start":"2013-01-22","period-end":"2013-01-22","rate":"200.00"}

];

/**
* @param {integer} year is a year of the date
* @return {integer} day
* 
* @description return the final day of the February month depend of the year that you input
**/

function daysInFebruary (year){
	return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}

/**
* @month {integer} month is a month of the date
* @year {integer} year is a year of the date
* 
* @description Get the final day of the month depend of the year that you input
* @return {Integer} Final day of the month 
**/
function finalDayOfMonth(month, year) {
	var response = 31;
	if (month==4 || month==6 || month==9 || month==11) {response = 30;}
	if (month==2) {response = daysInFebruary(year);}
	return response;
}

/**
* @date {String} to get his consecutive day
*
* @description Get a consecutive day of a day
* @return {String}
**/
function consecutiveDay(date) {
	date = date.split("-");
	var day = date[2]; 
	var month = date[1]; 
	var year = date[0];
	var consecutiveDate = date;
	var finalDay = finalDayOfMonth(parseInt(month), parseInt(year));
	if(day == finalDay){
		consecutiveDate[2] = "01";
		if(month == "12"){
			consecutiveDate[1] = "01";consecutiveDate[0] = parseInt(year)+1;
		}else{
			consecutiveDate[1] = parseInt(month)+1;
		}
	}else{
		consecutiveDate[2] = (parseInt(day)+1) < 10 ? "0" + (parseInt(day)+1) : (parseInt(day)+1);
	}

	return new Date(consecutiveDate[0] + "-" + consecutiveDate[1] + "-" + consecutiveDate[2]);

}

/**
* @dateArray {Array} Array of the dates
*
* @description Organize the array from lower to higher
* @return {Array} Array of the dates organized lower to higher
**/

function orderDate(dateArray) {
	var dateOrganized = [];
	var rowLess = [];
	for (var i = 0; i < dateArray.length; i++) {
		var lessDateAuxIn = new Date(dateArray[i].date);
		rowLess = dateArray[i];
		var possiJ = i;
		for (var j = i+1; j < dateArray.length-1; j++) {
			var curretDateIn =  new Date(dateArray[j].date);
			if(lessDateAuxIn > curretDateIn){
				rowLess = dateArray[j];
				var auxD1 = dateArray[i];
				var auxD2 = dateArray[j];
				dateArray.splice(j, 1);
				dateArray.splice(j, 0, auxD1);

				dateArray.splice(i, 1);
				dateArray.splice(i, 0, auxD2);
				lessDateAuxIn = curretDateIn;
			}
		}
		dateOrganized.push(rowLess);	
	}
	return dateOrganized;
}

/**
* @dateArray {Array} Array of the dates organized lower to higher
*
* @description Create the array with the ordered by consecutive days with the same rate format { "period-start":X,"period-end":Y, "rate":Z }
* @return {Array} Array with the intervals
**/

function orderConsecutiveDate(dateArray) {
	//Get array organized
	var dateArray = orderDate(dateArray);

	/*Inicializing formated list 
	* { "period-start":X,"period-end":Y, "rate":Z };
	*/
	var formatedList = [];

	//Count consecutive
	var found_consecutive = 0;

	//Count the row formated added
	var cantTupla = 0;

	//Count the row formated added
	var period_start = "";
	var period_end = "";	
	var tupla = "";
	var color = "";
	var numberEx = getNumberForColors(dateArray[0].rate);

	for (var i = 0; i < dateArray.length-1; i++) {
		if(found_consecutive == 0){
			cantTupla++;
			numberEx = getNumberForColors(dateArray[i].rate);
			color = getColor(dateArray[i].rate, numberEx+0.8, numberEx+0.5);
			period_start = dateArray[i].date;
			period_end = dateArray[i].date;
			tupla = {"period-start":dateArray[i].date,"period-end":dateArray[i].date, "rate":dateArray[i].rate, "color":color };
			formatedList.push(tupla);
		}
		
		//Get a consecutive day of the initial date
		var dayConsecutive = consecutiveDay(dateArray[i].date);

		//Get a consecutive day of the next date
		var curretDateIn =  new Date(dateArray[i+1].date);

		//Validating consecutive date and same rate
		if((dayConsecutive.getTime() === curretDateIn.getTime()) && (dateArray[i].rate == dateArray[i+1].rate)){
			// Consecutive found
			found_consecutive++;	
			tupla = {"period-start":period_start,"period-end":dateArray[i+1].date, "rate":dateArray[i].rate, "color":color };			
			formatedList.splice(cantTupla-1, 1);
			formatedList.splice(cantTupla-1, 0, tupla);			
		} else {
			// Consecutive NOT found
			found_consecutive = 0;
			if(i == (dateArray.length-2)){
				// Final element NOT consecutive
				numberEx = getNumberForColors(dateArray[i+1].rate);
				color = getColor(dateArray[i+1].rate, numberEx+0.8, numberEx+0.5);
				tupla = {"period-start":dateArray[i+1].date,"period-end":dateArray[i+1].date, "rate":dateArray[i+1].rate, "color":color };
				formatedList.push(tupla);			
			}
		}	
	}

	console.log("Resultado");
	console.log(formatedList);
	return formatedList;
}

/**
* @rate {Intener} Rate to validate
*
* @description Create a unique color number for to get a unique color for rate
* @return {Integer} 
**/

function getNumberForColors(rate) {
	var numbers =  rate.toString();
	var splitN = numbers.split(".");
	var numberResult = 0;
	var dV = "1";
	var plusS = 1;
	splitN[1] = splitN[1] == undefined ? "00" : splitN[1];
	var joinS = splitN[0] + splitN[1];
	var j = joinS.length-1;
	if(splitN!=""){
		for (var i = 0; i < joinS.length; i++) {
			dV += "0";
			plusS*=parseInt(joinS[i]);
		}
		dV = parseInt(dV);
	}
	return (rate/dV) * plusS;
}

//Get the pad for the color it is a prototype function in javascrip
String.prototype.pad = function( n, p ) {
    var s = '', n = Math.max( 0, n - this.length );
    while( n-- ) {
        s = p.toString() + s;
    }
    return s + this;
};

/**
* @rate {Array} Rate to validate
*
* @description Get a color for the diferent inverval of rate
* @return {String} Unique Hexadecimal color
**/
function getColor(rate, colorR, colorExtra) {
    var red = parseInt(Math.floor((colorR * 256)));
    var green = parseInt(Math.floor((colorExtra * 256)));
    var blue = parseInt(Math.floor((colorExtra * 256)));

    red = red.toString( 16 ).pad( 2, 0 ).toUpperCase();
    green = green.toString( 16 ).pad( 2, 0 ).toUpperCase();
    blue = blue.toString( 16 ).pad( 2, 0 ).toUpperCase();
    var colorIs = "#" + red + green + blue;
    colorIs = colorIs.substr(0,7);

	if(rate > 150 && rate < 200){
		return colorIs;
	}else if(rate > 100 && rate <= 150){
		return colorIs;
	}else if(rate >= 200){
		return colorIs;
	}
}

orderConsecutiveDate(jSon);



