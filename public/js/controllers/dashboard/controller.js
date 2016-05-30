angular.module('contactsApp')
	/* 
        controller of the home page
    */
    .controller('dashCtrl' ,['$scope', '$http', function($scope, $http){
        /*
        */ 
        $scope.h = window.innerHeight-100 +'px';
        $scope.lists = [];
        $scope.contacts = [];
        $scope.events = [];
        
        $http.get("/listsDB").
        then(function(response) {
                $scope.lists = response.data;
            }, 
            function(response) {
                console.log("Error retrieving lists.");
        });  
        
        $http.get("/contactsDB").
        then(function(response) {
                $scope.contacts = response.data;
            }, 
            function(response) {
                console.log("Error retrieving contacts.");
        });
        
        $http.get("/eventsDB").
        then(function(response) {
                $scope.events = response.data;
            }, 
            function(response) {
                console.log("Error retrieving events.");
        });
        
        // FUNCTIONS FOR TASK STATISTICS BOX:
        var listIsComplete = function(list) {
            
            for (var i=0; i<list.tasks.length; i++)
                if (!list.tasks[i].status)
                    return false;
            return true;
        };
        
        $scope.getTasksStatistics = function() {
            
            var completedTasksCounter = 0;
            for (var i=0; i<$scope.lists.length; i++) {
                
                if (listIsComplete($scope.lists[i]))
                    completedTasksCounter++;
            }
            
            return (completedTasksCounter/$scope.lists.length)*100;
        };
        
        
        
        
        
     }]);  