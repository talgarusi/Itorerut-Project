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
    $http.get("/eventsDB").
    then(function(response) {
        $scope.events = response.data;
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
    $scope.getRemainingTasks = function(list) {

        if (list.tasks.length == 0) 
            return 0;

        var remaining=0;
        for (var j=0; j<list.tasks.length; j++)
            if (!list.tasks[j].status)
                remaining++;

        var result = remaining/list.tasks.length*100;
        if (result % 1 === 0)
            return result;
        else
            return result.toFixed(2);
    };
    
    $scope.getCompletedTasks = function(list) {

        if (list.tasks.length == 0) 
            return 0;

        var completed=0;
        for (var j=0; j<list.tasks.length; j++)
            if (list.tasks[j].status)
                completed++;

        var result = completed/list.tasks.length*100;
        if (result % 1 === 0)
            return result;
        else
            return result.toFixed(2);
    };
    
    $scope.getTopLists = function() {
        
        var top = 5;
        var topLists = [];
                
        for (var i=0; i<$scope.lists.length; i++) {
            
            if ($scope.getRemainingTasks($scope.lists[i]) >= 33.33)
                topLists.push($scope.lists[i]);
            
            if (topLists.length == top)
                break;
        }
        
        return topLists;
    };
    
    $scope.isDanger = function(list) {
        
        if ($scope.getRemainingTasks(list) >= 66.67)
            return true;
        else
            return false;
    };
    
    // FUNCTIONS FOR GRAPH:
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawStuff);

    function drawStuff() {
        
        var topLists = $scope.getTopLists();
        var data = new google.visualization.arrayToDataTable([
          ['', 'Compleated', 'Uncompleated'],
          [topLists[0].name, $scope.getCompletedTasks(topLists[0]), $scope.getRemainingTasks(topLists[0])],
          [topLists[1].name, $scope.getCompletedTasks(topLists[1]), $scope.getRemainingTasks(topLists[1])],
          [topLists[2].name, $scope.getCompletedTasks(topLists[2]), $scope.getRemainingTasks(topLists[2])],
          [topLists[3].name, $scope.getCompletedTasks(topLists[3]), $scope.getRemainingTasks(topLists[3])],
          [topLists[4].name, $scope.getCompletedTasks(topLists[4]), $scope.getRemainingTasks(topLists[4])]
        ]);

        var options = {
            chart: {
    //        title: 'Tasks Progress',
    //        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            }
        };

        var chart = new google.charts.Bar(document.getElementById('dual_y_div'));
        chart.draw(data, options);
    };
    
}]); 