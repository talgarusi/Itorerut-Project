angular.module('contactsApp')
     /* 
        controller of the to do list page
    */
    .controller('todoCtrl' ,['$scope','$http','$location','$routeParams','$filter', function($scope, $http, $location , $routeParams, $filter){
        
        /*
            h2 = height of the contact page -> spisefic list
            h = the height of the lists side bar
        */        
        $scope.h = window.innerHeight-100 +'px';
        $scope.h2 = window.innerHeight-100-164 +'px';
        $scope.newTask = new task(0, "" , false);
        $scope.currentList = null;
        $scope.listname = {};
        $scope.listname.name = null;

        $http.get("/listsDB").
            then(function(response) {
                $scope.lists = response.data;
            }, 
            function(response) {
                console.log("Error retrieving lists.");
            });    
          
        /*
            when clicking on a list from the sidebar
            assign the clicked list to the current lst property.
        */
        $scope.show = function(list){
            $scope.currentList = list;
        };
                
        /*
            new list function when
            clicking on the create new list icon
        */
        $scope.newList = function(listname){   
            var list = {
                name: listname,
                tasks: []
            }
            $http.post("/listsDB", list).
                then(function(response) {
                    console.log("lists added");
                    list = response.data;
                    $scope.lists.push(list);
                    $scope.currentList = list;
                }, 
                function(response) {
                    console.log("Error adding list.");
                });  
            
        };
        
        /*
            remove list function when
            clicking on the trash icon
        */
        $scope.removeList = function(){
            /*
                1. find the index of the current list
                2. update the DB
                3. delete it from the lists array
                4. set the current list to null
                
            */
            var index = $scope.lists.indexOf($scope.currentList);
            $http.delete("/listsDB/" + $scope.currentList._id).
                then(function(response) {
                    console.log("List deleted");
                }, 
                function(response) {
                    console.log("Error deleteing list.");
                });     
            $scope.lists.splice(index, 1);
            $scope.currentList = null;
        };
        
         /*
            insert new task to the current list when
            clicking on the plus icon on the input
        */
        $scope.insertNewTask = function(){ 
            if($scope.newTask.name != "")
            {
                 /*
                    1. find new free id for task
                    2. push it to the tasks array
                    3. set a new empty task 
                    4. update the local storage
                */ 
                $scope.newTask.id = $filter('getMaxId')($scope.currentList.tasks) + 1;
                $scope.currentList['tasks'].push($scope.newTask);
                $scope.newTask = new task(0, "" , false);
                $scope.update();
            }      
        };
        
        /*
            remove task from the current list when
            clicking on the trash icon
        */
        $scope.removeTask = function(task){
            /*
                1. find index of the task in the tasks array
                2. remove it from the array
                3. update the local storage
            */
            var index = $scope.currentList['tasks'].indexOf(task);
            $scope.currentList['tasks'].splice(index, 1);
            $scope.update();
        };
        
        /*
            update local storage function
        */
        $scope.update = function(){
            $http.put("/listsDB", $scope.currentList).
                then(function(response) {
                    console.log("List updated");
                }, 
                function(response) {
                    console.log("Error update list.");
                });    
        };
        
        /* 
            task object constractor
        */
        function task(id, name, status) {
            this.id = id;
            this.name = name;
            this.status = status;
        };
        
        /* 
            function the getting list and return
            how much tasks that list have.
        */
        $scope.numOfTasks = function(list){
            var tasks = list.tasks;
            var num = 0;
            var i=0, len = tasks.length;
            for (; i<len; i++) {
                if (tasks[i].status === false) {
                    num++;
                }
            }
            return num;
        }
         
        $scope.hideNewModel = function(status){
            if(status === "create")
                $scope.newList($scope.listname.name);  
            $('#newlistmodal').modal('hide');
            $scope.listname.name = null;
        };   
        
        $scope.hideEditModel = function(status){
            if(status === "save"){
                $scope.currentList.name = $scope.listname.name;
                $scope.update();
            }
            $('#editlistmodal').modal('hide');
            $scope.listname.name = null;
        };   
            
    }]);
    
     
