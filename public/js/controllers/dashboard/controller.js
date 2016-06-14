/* DASHBOARD CONTROLLER: */

angular.module('contactsApp').controller('dashCtrl' ,['$scope', '$http', function($scope, $http) {

    // SCOPES:
    $scope.h = window.innerHeight-100 +'px';

    $scope.lists = [];
    $scope.contacts = [];
    $scope.events = [];

    // GET TASKS LISTS FROM DB:
    $http.get("/listsDB").
    then(function(response) {
        $scope.lists = response.data;
        $scope.lists.sort(function(a,b) { 
            return $scope.getRemainingTasksPercents(a) - $scope.getRemainingTasksPercents(b);
        });
        google.charts.setOnLoadCallback(drawStuff);
    }, 
         function(response) {
        console.log("Error retrieving lists.");

    });

    // GET CONTACTS FROM DB:
    $http.get("/contactsDB").
    then(function(response) {
        $scope.contacts = response.data;
    }, 
         function(response) {
        console.log("Error retrieving contacts.");
    });

    // GET EVENTS FROM DB:
    $http.get("/calendarDB").
    then(function(response) {
        $scope.events = response.data;
        $scope.events.sort(function(a,b) { 
            return new Date(a.fromDate) - new Date(b.fromDate);
        });
    }, 
         function(response) {
        console.log("Error retrieving events.");
    });

    // FUNCTIONS FOR TASK STATISTICS BOX:
    $scope.tasksStatistics = function() {

        if ($scope.lists.length == 0)
            return 0;

        var listIsComplete = function(list) {

            for (var i=0; i<list.tasks.length; i++)
                if (!list.tasks[i].status)
                    return false;
            return true;
        };

        var completedTasksCounter = 0;
        for (var i=0; i<$scope.lists.length; i++) {

            if (listIsComplete($scope.lists[i]))
                completedTasksCounter++;
        }

        var statsResult = completedTasksCounter/$scope.lists.length*100;
        if (statsResult % 1 === 0) // statistics result is Integer:
            return statsResult;
        else
            return statsResult.toFixed(2);
    };

    // FUNCTIONS FOR TOP TODO LISTS:
    function getRemainingTasks(list) {

        var remaining = 0;
        for (var j=0; j<list.tasks.length; j++)
            if (!list.tasks[j].status)
                remaining++;

        return remaining;
    }

    $scope.getRemainingTasksPercents = function(list) {

        if (list.tasks.length == 0)
            return 0;

        var remaining = getRemainingTasks(list);
        var result = remaining/list.tasks.length*100;
        if (result % 1 === 0)
            return result;
        else
            return result.toFixed(2);
    };

    function getCompletedTasks(list) {

        var completed = 0;
        for (var j=0; j<list.tasks.length; j++)
            if (list.tasks[j].status)
                completed++;

        return completed;
    }

    $scope.getCompletedTasksPercents = function(list) {

        if (list.tasks.length == 0)
            return 0;

        var completed = getCompletedTasks(list);
        var result = completed/list.tasks.length*100;
        if (result % 1 === 0)
            return result;
        else
            return result.toFixed(2);
    };

    $scope.getTopLists = function() {

        var top = 6;
        var topLists = [];

        for (var i=$scope.lists.length-1; i>=0; i--) {

            topLists.push($scope.lists[i]);

            if (topLists.length == top)
                break;
        }

        return topLists;
    };

    $scope.isDanger = function(list) {

        if ($scope.getRemainingTasksPercents(list) >= 66.67)
            return true;
        else
            return false;
    };

    // FUNCTIONS FOR GRAPH:

    function drawStuff() {

        var topLists = $scope.getTopLists();
        var data = [];
        data.push(['', 'Compleated', 'Uncompleated']);

        if (topLists.length == 0)
            data.push([' ', 0, 0]);

        for (var i=0; i<topLists.length; i++)
            data.push([topLists[i].name, getCompletedTasks(topLists[i]), getRemainingTasks(topLists[i])]);

        var data = new google.visualization.arrayToDataTable(data);
        var chart = new google.charts.Bar(document.getElementById('graph'));

        var options = {
            colors: ['#00ADD8', '#DD4B39']
        };

        chart.draw(data, options);
    };

    // FUNCTIONS FOR EVENTS LIST:

    $scope.getTopEvents = function() {

        var top = 3;
        var topEvents = [];

        // FUNCTION FOR CHECKING IF EVENT DATE IS PASSED:
        var isPassed = function(event) {

            var now  = new Date();
            var eventDate = new Date(event.fromDate);

            if (now >= eventDate)
                return true;

            return false;
        }

        for (var i=0; i<$scope.events.length; i++) {

            if (!isPassed($scope.events[i]))
                if(topEvents.indexOf($scope.events[i]) < 0)
                    topEvents.push($scope.events[i]);

            if (topEvents.length == top)
                break;
        }

        return topEvents;
    };

    $scope.getEventDay = function(event) {

        var eventDate = new Date(event.fromDate);
        return eventDate.getDate();
    };

    $scope.getEventMonth = function(event) {

        var months = ["Jan", "Feb", "Mar", "Apr",
                      "May", "Jun", "Jul", "Aug",
                      "Sep", "Oct", "Nov", "Dec"
                     ];

        var eventDate = new Date(event.fromDate);
        return months[eventDate.getMonth()];
    };

    $scope.getEventTime = function(event) {

        var eventDate = new Date(event.fromDate);
        return ("0" + eventDate.getHours()).slice(-2) + ":" + ("0" + eventDate.getMinutes()).slice(-2);
    };

}]); 