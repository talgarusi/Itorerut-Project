var date = new Date();

var monthArray = getDaysArray(date.getYear(),date.getMonth());


angular.module('contactsApp')
	/* 
        controller of the calendar
    */
    .controller('calendarCtrl' ,['$scope', function($scope){
        $scope.days = monthArray;
        $scope.month = getMonthName(date.getMonth());
        $scope.year = date.getFullYear();
     }]);


function getDaysArray(year, month) {
    var numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray;
    numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(year%4 == 0) numDaysInMonth[1] = 29;
    daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    daysIndex = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
    index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];
    daysArray = [];

    for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
        daysArray.push((i + 1) + '. ' + daysInWeek[index++]);
        if (index == 7) index = 0;
    }
    alert(daysArray.length);
    return daysArray;
}

function getMonthName(monthNumber) { //1 = January
        var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[monthNumber - 1];
    }
