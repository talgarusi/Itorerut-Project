/* DASHBOARD CONTROLLER: */

angular.module('contactsApp').controller('dashCtrl' ,['$scope', '$http', function($scope, $http) {

    // SCOPES:
    $scope.h = window.innerHeight-100 +'px';
    
    $scope.lists = [];
    $scope.contacts = [];
    $scope.events = [];
    $scope.topLists = [];
    
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
        if (!result % 1 === 0)
            result = result.toFixed(2);

        return result;

    };
    
    $scope.getTopLists = function() {
        
        var top = 4;
        
        for (var i=0; i<$scope.lists.length; i++) {
            
            if ($scope.getRemainingTasks($scope.lists[i]) >= 33.33)
                $scope.topLists.push($scope.lists[i]);
            
            if ($scope.topLists.length == top)
                break;
        }
        
        return $scope.topLists;
    };
    
}]); 