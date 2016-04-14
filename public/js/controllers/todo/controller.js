angular.module('contactsApp')
     /* 
        controller of the to do list page
    */
    .controller('todoCtrl' ,['$scope','$location','$routeParams','$filter', function($scope, $location , $routeParams, $filter){
        
        /*
            h2 = height of the contact page -> spisefic list
            h = the height of the lists side bar
        */        
        $scope.h = window.innerHeight-100 +'px';
        $scope.h2 = window.innerHeight-100-164 +'px';
        
        var newTaskid;
        
        /*
            tring to restore lists object
            from the local storage
        */
        var lists = localStorage.getItem("lists");
         if(!lists)
             lists = [];
         else
             lists = JSON.parse(lists);
        $scope.lists = lists;
        
        /*
            the current clicked list
        */
        $scope.currentList = null;
        
        /*
            a new task object    
        */
        $scope.newTask = new task(0, "" , false);
            
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
        $scope.newList = function(){
             /*
                1. find new free id
                2. declere of new empty list
                3. push it to the lists object
                4. update the local storage
                5. set the current list to the new list
            */    
            var newid = $filter('getMaxId')($scope.lists) + 1;
            var list = {
                id: newid, 
                name: "New List",
                tasks: []
            }
            $scope.lists.push(list);
            $scope.update();
            $scope.currentList = list;   
        };
        
        /*
            remove list function when
            clicking on the trash icon
        */
        $scope.removeList = function(){
            /*
                1. find the index of the current list
                2. delete it from the lists array
                3. set the current list to null
                4. update the local storage
            */
            var index = $scope.lists.indexOf($scope.currentList);
            $scope.lists.splice(index, 1);
            $scope.currentList = null;
            $scope.update();
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
            localStorage.setItem("lists" , JSON.stringify($scope.lists));     
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
             
    }]);
    
     
