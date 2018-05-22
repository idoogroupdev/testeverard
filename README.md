## Requeriments NON Funtionals
1 - Install Node.js or Javacrips
2 - Console of the system


## Problem
Write a function that takes in a string of JSON containing an array of objects each with a date and rate pair.  Each object in this array contains the pricing information for only one day.  There are an infinite number of possible rates, and the dates are not continuous. (There may be dates skipped in the array).

       Example JSON string:

[

{"date":"2013-01-01","rate":"199.99"},

{"date":"2013-01-02","rate":"199.99"},

{"date":"2013-01-03","rate":"199.99"},

{"date":"2013-01-04","rate":"199.99"},

{"date":"2013-01-05","rate":"199.99"},

{"date":"2013-01-06","rate":"115.49"},

{"date":"2013-01-07","rate":"115.49"},

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

]

This function should convert the input into a JSON string containing an array of objects that contain the information for a continuous rate "period".  For example, if there are three days in a row that have the same rate they can be combined into a single period.

An example result for the input string above would be:

[

{"period-start":"2013-01-01","period-end":"2013-01-05","rate":"199.99"},

{"period-start":"2013-01-06","period-end":"2013-01-10","rate":"115.49"},

{"period-start":"2013-01-11","period-end":"2013-01-11","rate":"200.00"},

{"period-start":"2013-01-15","period-end":"2013-01-17","rate":"115.49"},

{"period-start":"2013-01-20","period-end":"2013-01-21","rate":"115.49"},

{"period-start":"2013-01-22","period-end":"2013-01-22","rate":"200.00"}

]

Now the final step is to generate a unique color to associate with each rate.  This color should be in HEX format.  So #FF0000 = red, #00FF00 = green ....etc

They key here is that no matter what input JSON string is used, the same rate is always associated with the same color.  So as an example whenever a period is generated with a rate of 100 is it always associated with the HEX #FFFF00.

An complete example of the returned result for this input string may be something like this:

[

{"period-start":"2013-01-01","period-end":"2013-01-05","rate":"199.99", "color":"#FFFF00"},

{"period-start":"2013-01-06","period-end":"2013-01-10","rate":"115.49", "color":"#FF0000"},

{"period-start":"2013-01-11","period-end":"2013-01-11","rate":"200.00", "color":"#0000FF"},

{"period-start":"2013-01-15","period-end":"2013-01-17","rate":"115.49", "color":"#FF0000"},

{"period-start":"2013-01-20","period-end":"2013-01-21","rate":"115.49", "color":"#FF0000"},

{"period-start":"2013-01-22","period-end":"2013-01-22","rate":"200.00", "color":"#0000FF"}

]

The key point here is that there are potentially an unlimited number of rates that could be input into the function.   The colors must be algorithmically generated somehow.

The generated colors do need to be visually distinguishable from each other, so while generating 50 different shades of blue is technically correct it isn't very useful in a real world scenario.

If you have any questions feel free to ask and I'll do my best to clarify

## Solutionm of the problem

* - To order the all dates for date ASC;
* - To Find the consecutive date each date and order it;
* - To get a unique color (hexadecimal) for each inverval of dates and rate;
* - To create of the Array to output ordened by inteval of consecutive dates;
* - Input since Array colled jSon;
* - Run node . in the root of the proyect;

#### Node.js Run application
```
node .
```

contact: ernesto.mila@idoogroup.com
web: www.idoogroup.us


