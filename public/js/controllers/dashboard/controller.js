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
        
        var top = 5;
        var topLists = [];
                
        for (var i=0; i<$scope.lists.length; i++) {
            
            if ($scope.getRemainingTasksPercents($scope.lists[i]) >= 33.33)
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
    google.charts.setOnLoadCallback(drawStuff);

    function drawStuff() {
        
        var topLists = $scope.getTopLists();
        var data = [];
        data.push(['', 'Compleated', 'Uncompleated']);
        
        if (topLists.length == 0)
            data.push([' ', 0, 0]);
        
        for (var i=0; i<topLists.length; i++)
            data.push([topLists[i].name, getCompletedTasks(topLists[i]), getRemainingTasks(topLists[i])]);
        
        var data = new google.visualization.arrayToDataTable(data);
        var chart = new google.charts.Bar(document.getElementById('dual_y_div'));
        
        var options = {
            colors: ['#00ADD8', '#DD4B39']
        };
        
        chart.draw(data, options);
    };
    
//    $scope.dateIsPassed = function(){
//        
//        
//        var date = str.slice(0, 10);
//    }
    $scope.getTopEvents = function() {
        
        var top = 3;
        var topEvents = [];
                
        for (var i=0; i<$scope.events.length; i++) {
            
            topEvents.push($scope.events[i]);    
            
            if (topEvents.length == top)
                break;
        }
        
        return topEvents;
    };
    
    
}]); 