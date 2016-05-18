var date = new Date();

var week;

var monthArray;

var miniString;

var boxColorArray;

var weekColorArray;

var weekWordsArray;

var weekEventArray;

var eventsArray;

var hashMapHours = {};

var hoursMap = {};

InitMap();

Init(date);

InitMonth(date);

var normal=0;//offset to the calendar array.help us to know how many elemnts on the array are not real


angular.module('contactsApp')

       .controller('calendarCtrl' ,['$http', '$scope','$location','$rootScope', function($http, $scope, $location, $rootScope){
           
        $scope.validDates = false;
        
        $http.get('/calendarDB').success(function(response) {

            eventsArray = response;
            
            for(var i=0; i<eventsArray.length ; i++)
                {
                    eventsArray[i].toDate = new Date(eventsArray[i].toDate);
                    eventsArray[i].fromDate = new Date(eventsArray[i].fromDate);

                }
            weekEventConnect();
            update($scope,new Date);


        });

           

              
        $scope.change = function() {
        if($scope.event.toDate > $scope.event.fromDate) $scope.validDates = true;
            else  $scope.validDates = false;
      };


        $scope.nextWeekClick = function() {
            
            date.setDate(date.getDate() + 7);
            
            update($scope,date);

        }
        $scope.sendData = function()
        {
        $http.post('/calendarDB', $scope.event).success(function(response) {

            });
            $location.url('/calendar');
                    $http.get('/calendarDB').success(function(response) {
            
          
            eventsArray = response;
            
            for(var i=0; i<eventsArray.length ; i++)
                {
                    eventsArray[i].toDate = new Date(eventsArray[i].toDate);
                    eventsArray[i].fromDate = new Date(eventsArray[i].fromDate);

                }
            

        
            //$scope.events = JSON.parse(response);
            weekEventConnect();



        });
        }
        $scope.nextMonthClick = function() {

            var tempM = date.getMonth();
            
            var tempY = date.getFullYear();
            
            if(tempM == 11)
                {
                    tempM = 0;
                    tempY++;
                }
            else
                tempM ++;

            date = new Date(tempY, tempM, date.getDate());
            
            update($scope,date);

        }
        
        $scope.backWeekClick= function() {

            date.setDate(date.getDate() - 7);
            
            update($scope,date);


        }
        
        $scope.backMonthClick= function() {

            var tempM = date.getMonth();
            
            var tempY = date.getFullYear();
            
            if(tempM == 0)
                {
                    tempM = 11;
                    tempY--;
                }
            else
                tempM--;

            date = new Date(tempY, tempM, date.getDate());
            
            update($scope,date);


        }
        $scope.today= function() {
            
            date = new Date();
            
            update($scope,date);
        }

     }]);

function Init(date) {
    
    week = new Array(7);
    
    var numInWeek = date.getDay();
    
    for(var i=0 ; i<7; i++)
        {
            if(i<numInWeek)
                {
                var copiedDate = new Date(date.getTime());
                    copiedDate.setDate(copiedDate.getDate() + i - numInWeek);
                    week[i] = copiedDate;  


                }
            else if(i>numInWeek)
                {
                    
                var copiedDate = new Date(date.getTime());
                    copiedDate.setDate( copiedDate.getDate() + i - numInWeek);   
                    
                    week[i] = copiedDate;  

                }
            else
                {
                    week.push(date);
                    
                    week[i] = date;

                }
        }
}


function getDaysArray(year, month) {
    
    var numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray;
    numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(year%4 == 0) numDaysInMonth[1] = 29;
    daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysIndex = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
    index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];
    daysArray = [];

    for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
        
        daysArray.push((i + 1));
        
        if (index == 7) index = 0;
    }

    return daysArray;
}

function getMonthName(monthNumber) { //1 = January
        var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[monthNumber - 1];
    }

function dateString() {
    
    var strRet;
    
    
    if(week[0].getMonth() == week[6].getMonth())
        {
            strRet = getMonthName(week[0].getMonth()+1) +" "+ week[0].getDate() + " - " + week[6].getDate() + " ,                            "+week[6].getFullYear();
        }
    else
        {
           strRet = getMonthName(week[0].getMonth()+1) + " - " + getMonthName(week[6].getMonth()+1)+" "+ week[0].getDate() +           " - " +week[6].getDate() +" , "+week[6].getFullYear();
        }
    
    return strRet;

    }

//update the week calendar
update= function( $scope , date ) {
            
            if(date != null)
                {
                    Init(date);
                    InitMonth(date);
                    weekEventConnect();
                    $scope.colorWeekBox = weekColorArray;
                    $scope.weekWordsArray = weekWordsArray;

                }

            $scope.sunDate = week[0].getDate();
            $scope.monDate = week[1].getDate();
            $scope.tuesDate = week[2].getDate();
            $scope.wedDate = week[3].getDate();
            $scope.thDate = week[4].getDate();
            $scope.friDate = week[5].getDate();
            $scope.satDate = week[6].getDate();
    


    

            $scope.dateString = dateString();
            $scope.monthArray= monthArray;
            $scope.miniString = miniString;
            $scope.boxColorArray = boxColorArray;

        }

function InitMonth(date) {
        
    date = new Date(date.getFullYear(), date.getMonth(), 1);
        
    miniString = getMonthName(date.getMonth()+1) + " " + date.getFullYear();
    
    monthArray = new Array(42);
    
    boxColorArray = new Array(42);
    
    var afterMonth = false;
    
    var numInWeek = date.getDay();
    
    if(numInWeek ==0)
        numInWeek =7;
    
    for(var i=0 ; i<42; i++)
        {
            
            var copiedDate = new Date(date.getTime());
                copiedDate.setDate(copiedDate.getDate() + i - numInWeek);
                                
                monthArray[i] = copiedDate;
                //monthArray[i].marked= false;// need to find event in this day
                boxColorArray[i] = "";
            
            if(i<numInWeek)
                {
                    boxColorArray[i] = "grey";
                }
            else if(monthArray[i-1].getMonth() < monthArray[i].getMonth() && i>27  || afterMonth)
                { 
                    afterMonth = true;
                     boxColorArray[i] = "grey";
                }

        }
    
    
}



function weekEventConnect()
{
    console.log("1" + eventsArray);
    weekEventArray = new Array(eventsArray.length);
    console.log("2");

    weekColorArray = new Array(70);
    weekWordsArray = new Array(70);
    
    var fromHour,toHour,fromDay,toDay;
    
    
    for(var i =0 ; i< 70;i++)
        {
            weekColorArray[i] = "";
            weekWordsArray[i] = "";
        }

    for(var i =0 ; i < eventsArray.length ; i++)
        {
                        

            if(eventsArray[i].fromDate<week[6] && eventsArray[i].toDate > week[0])
                {
                    fromHour = eventsArray[i].fromDate.getHours();
                    toHour = eventsArray[i].toDate.getHours();
                    fromDay = eventsArray[i].fromDate.getDay();
                    toDay = eventsArray[i].toDate.getDay();
                    
                    if(eventsArray[i].fromDate < week[0])
                        {
                            fromHour = 0;
                            fromDay = 0
                        }
                    if(eventsArray[i].toDate > week[6])
                        {
                            toHour = 23;
                            toDay = 6
                        }
                    
                    var tempHour =  fromHour;
                    var tempDay = fromDay;
                    
                    while(tempDay < toDay || (tempDay==toDay && tempHour < toHour))
                        {
                            weekColorArray[hoursMap[tempHour]*7 + tempDay] = "green";
                            if(weekWordsArray[hoursMap[tempHour]*7 + tempDay].indexOf(eventsArray[i].name) <= -1)
                            weekWordsArray[hoursMap[tempHour]*7 + tempDay] = weekWordsArray[hoursMap[tempHour]*7 + tempDay] + " " +eventsArray[i].name;
                            tempHour++;
                            
                                if(tempHour==24) {
                                    tempDay++;
                                    tempHour=0;
                            }
                        }

                }
        }
}
function InitMap(){  
    hoursMap["0"] = 0;
    hoursMap["1"] = 0;       
    hoursMap["2"] = 0;
    hoursMap["3"] = 0;
    hoursMap["4"] = 0;
    hoursMap["5"] = 0;
    hoursMap["6"] = 0;
    hoursMap["7"] = 0;
    hoursMap["8"] = 0;
    hoursMap["9"] = 1;
    hoursMap["10"] = 2;
    hoursMap["11"] = 3;
    hoursMap["12"] = 4;
    hoursMap["13"] = 5;
    hoursMap["14"] = 6;
    hoursMap["15"] = 7;
    hoursMap["16"] = 8;
    hoursMap["17"] = 9;
    hoursMap["18"] = 9;
    hoursMap["19"] = 9;
    hoursMap["20"] = 9;
    hoursMap["21"] = 9;
    hoursMap["22"] = 9;
    hoursMap["23"] = 9;

}




