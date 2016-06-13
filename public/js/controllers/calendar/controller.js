var date = new Date();//represent the date that tthe calendar look on

var week;//the week that reference to the 'date' var

var monthArray;//all month for the small calendar it`s contain 42 days 

var miniString;//string of the week

var boxColorArray;
//arrays to control the color of the calendar week and the number of the events for each box
var weekColorArray = new Array(70);

var weekWordsArray = new Array(70);

var weekHTMLArray = new Array(70);

var weekEventArray;

var eventsArray;

var hashMapHours = {};

var hoursMap = {};

var indexShowEvent = -1;

var indexShowEventArray = -1;

var currentEvent;

InitMap();//init the hash map

Init(date);//init the calendar by specific day 

InitMonth(date);//init the current month for the small calendar

var normal=0;//offset to the calendar array.help us to know how many elemnts on the array are not real


angular.module('contactsApp')

       .controller('calendarCtrl' ,['$http', '$scope','$location','$rootScope', function($http, $scope, $location, $rootScope){
           
            $scope.validDates = false;//flag for valid dates
           
           $scope.calendarMode = true;
           
           $scope.changeDetails = false;
           

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
        $scope.goBack = function(){
            $scope.calendarMode = true;
            $scope.validDates = false;

        }
        
        
        $scope.initEvent = function()
        {
            if($scope.event == null) return;
            
            $scope.event.name = "";
            $scope.event.toDate = null;
            $scope.event.fromDate = null;
        }
           
        $scope.openFields = function(){
            $scope.changeDetails = !$scope.changeDetails;
            
        }
           
        $scope.editMode = function(){
            $scope.calendarMode = false;
            $scope.validDates = true;
        }
         $scope.showEvent = function(boxNum){//show the event details in the left botton panel

             
             if(indexShowEvent != boxNum)
                 {
                        indexShowEvent = boxNum;
                        indexShowEventArray = 0;
                        var index =  weekWordsArray[indexShowEvent][indexShowEventArray];
                     if(index != null)
                         {
                            $scope.markEventName = eventsArray[index].name;
                            $scope.markEventFromDate = eventsArray[index].fromDate.toString();
                            $scope.markEventToDate = eventsArray[index].toDate.toString();
                            $scope.currentEvent = eventsArray[index];
                            $scope.existsEvent = true;
                         }
                     
                        indexShowEventArray++;
                     
                 }
             else{

                 if(weekWordsArray[indexShowEvent].length <= indexShowEventArray)
                     {
                         indexShowEventArray=0;
                     }
                        
                        var index =  weekWordsArray[indexShowEvent][indexShowEventArray];
                        $scope.markEventName = eventsArray[index].name;
                        $scope.markEventFromDate = eventsArray[index].fromDate.toString();
                        $scope.markEventToDate = eventsArray[index].toDate.toString();
                        $scope.currentEvent = eventsArray[index];
                        $scope.existsEvent = true;

                     
                        indexShowEventArray++;
                 
             }

         };
           
        $scope.change = function(num) {//check validaiton of the dates in the create event
            
            if($scope.currentEvent == null || $scope.event == null) return;

            if(0){//create event mode
                    if($scope.event.toDate > $scope.event.fromDate) $scope.validDates = true;
                    else  $scope.validDates = false;
                }
            else{//edit event mode
                if($scope.currentEvent.toDate > $scope.currentEvent.fromDate) $scope.validDates = true;
                    else  $scope.validDates = false;
            }
            
        };

        $scope.changeData = function()
        {
            $scope.calendarMode = true;
            $scope.validDates = false;

            
            $http.put("/calendarDB", $scope.currentEvent).
                then(function(response) {
                    console.log("Event updated");
                
                
                $http.get('/calendarDB').success(function(response) {
                        eventsArray = response;

                        for(var i=0; i<eventsArray.length ; i++)
                        {
                            eventsArray[i].toDate = new Date(eventsArray[i].toDate);
                            eventsArray[i].fromDate = new Date(eventsArray[i].fromDate);

                        }

                                    
                        update($scope,date);

                        $location.url('/calendar');
                    
                    
                    
                        $scope.currentEvent = null;
                        $scope.markEventName = "click on event";
                        $scope.markEventFromDate = "click on event";
                        $scope.markEventToDate = "click on event";
                        $scope.existsEvent = false;

                    });

                }, 
                function(response) {
                    console.log("Error update event.");
                });
            

        };
           
        $scope.deleteData = function()
        {
            $scope.calendarMode = true;
            var id = $scope.currentEvent._id;
            $http.delete("/calendarDB/" + id).
                then(function(response) {
                    console.log("event deleted");
                    $http.get('/calendarDB').success(function(response) {
                            eventsArray = response;

                            for(var i=0; i<eventsArray.length ; i++)
                            {
                                eventsArray[i].toDate = new Date(eventsArray[i].toDate);
                                eventsArray[i].fromDate = new Date(eventsArray[i].fromDate);

                            }

                            
                        update($scope,date);
                        $location.url('/calendar');

                        });
                


                }, 
                function(response) {
                    console.log("Error deleteing event.");
                });
            
            $scope.currentEvent = null;
            $scope.markEventName = "click on event";
            $scope.markEventFromDate = "click on event";
            $scope.markEventToDate = "click on event";
            $scope.existsEvent = false;
            $scope.validDates = false;



        };

        $scope.nextWeekClick = function() {
            
            date.setDate(date.getDate() + 7);
            
            update($scope,date);

        };
        
        $scope.moveWeek = function(newDate){
            
            date = new Date($scope.monthArray[newDate]);
            
            update($scope,date);
        };
        
        $scope.sendData = function(){
            $http.post('/calendarDB', $scope.event).then(function(response) {
                    console.log("Event added");
                
                    $http.get('/calendarDB').success(function(response) {
                            eventsArray = response;

                            for(var i=0; i<eventsArray.length ; i++)
                            {
                                eventsArray[i].toDate = new Date(eventsArray[i].toDate);
                                eventsArray[i].fromDate = new Date(eventsArray[i].fromDate);

                            }


                            update($scope,date);
                            $location.url('/calendar');

                        });
                

                }, 
                function(response) {
                    console.log("Error deleteing event.");
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
                    $scope.weekHTMLArray = weekHTMLArray;

                }
            $scope.existsEvent = false;
            $scope.currentEvent = null;
            $scope.markEventName = "click on event";
            $scope.markEventFromDate = "click on event";
            $scope.markEventToDate = "click on event";
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
    

    weekEventArray = new Array(eventsArray.length);

    
    var fromHour,toHour,fromDay,toDay;
    
    
    for(var i =0 ; i< 70;i++)
        {
            weekColorArray[i] = "backColor";
            weekWordsArray[i] = [];
            weekHTMLArray[i] = "";
        }
    
    for(var i =0 ; i < eventsArray.length ; i++)
        {
                        
            week[6].setHours(23);
            week[0].setHours(0);

            if(eventsArray[i].fromDate<=week[6] && eventsArray[i].toDate >= week[0])
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
                            if(!numInArray(weekWordsArray[hoursMap[tempHour]*7 + tempDay] , i))
                                {
                                    weekWordsArray[hoursMap[tempHour]*7 + tempDay].push(i);
                                }
                            tempHour++;
                            
                                if(tempHour==24) {
                                    tempDay++;
                                    tempHour=0;
                            }
                        }

                }
        }
    
    for(var j=0 ; j< 70;j++)
        {
            if(weekWordsArray[j].length > 0)
                {
                    weekHTMLArray[j] =  weekWordsArray[j].length;
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

function numInArray(array , num){
    var size = array.length;

    for(var i =0; i< size;i++ )
        {
            if(array[i]==num)
                return true;
        }
    
    return false;
    
}






//                    $scope.event.name = currentEvent.name;
        //            $scope.event.toDate = currentEvent.toDate;
       //             $scope.event.fromDate = currentEvent.fromDate;
           //         $scope.event.description = currentEvent.description;
