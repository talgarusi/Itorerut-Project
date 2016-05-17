var date = new Date();

var week;

var monthArray;

var miniString;

var boxColorArray;

var weekColorArray;

var weekArray;

var eventsArray;

var hashMapHours = {};

Init(date);

InitMonth(date);

var normal=0;//offset to the calendar array.help us to know how many elemnts on the array are not real


angular.module('contactsApp')

       .controller('calendarCtrl' ,['$http', '$scope','$location','$rootScope', function($http, $scope, $location, $rootScope){
           
            $scope.validDates = false;
            update($scope,null);
           
        
        $http.get('/calendarDB').success(function(response) {
            $scope.events = response;
            eventsArray = response;

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
                }

            $scope.sunDate = week[0].getDate();
            $scope.monDate = week[1].getDate();
            $scope.tuesDate = week[2].getDate();
            $scope.wedDate = week[3].getDate();
            $scope.thDate = week[4].getDate();
            $scope.friDate = week[5].getDate();
            $scope.satDate = week[6].getDate();
    
            //weekEventConnect();

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
    weekColorArray = new Array(70);
    weekArray = new Array(70);

    var day;
    
    for(var i =0 ; i < 70 ; i++)
        {
            day =getDateByBoxNum(i);
            
            for(var j=0;j<eventsArray.length;j++)
                {
                    if(day > eventsArray[j].fromDate && day > eventsArray[j].toDate)
                        {
                            weekColorArray[i].push(j);
                            
                            weekArray[i] = "green";
                        }
                }
        }
}


function getDateByBoxNum(num) {
    
    var time = Math.floor( num/7);
    var day = new Date(week[num%7].getTime);
    
    if(time ==0) time =0;
    if(time ==1) time =9;
    if(time ==2) time =10;
    if(time ==3) time =11;
    if(time ==4) time =12;
    if(time ==5) time =13;
    if(time ==6) time =14;
    if(time ==7) time =15;
    if(time ==8) time =16;
    if(time ==9) time =17;
    
    day.setHours(time);   
    
    return day;
}



