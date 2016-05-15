var date = new Date();

var week;

var monthArray;

var miniString;

var boxColorArray;

Init(date);

InitMonth(date);

var normal=0;//offset to the calendar array.help us to know how many elemnts on the array are not real


angular.module('contactsApp')

    .controller('calendarCtrl' ,['$scope', function($scope){

            update($scope,null);
        
        
    


        $scope.nextWeekClick = function() {
            
            date.setDate(date.getDate() + 7);
            
            update($scope,date);

        }
        
        $scope.nextMonthClick = function() {

            var tempM = date.getMonth();
            
            var tempY = date.getFullYear();
            
            if(tempM == 11)
                {
                    tempM = 0;
                    tempY++;
                }

            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            
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

            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            
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
                InitMonth(date)
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


