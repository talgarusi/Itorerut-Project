angular.module('contactsApp')
     .controller('listCtrl' ,['$http', '$scope','$location','$rootScope', function($http, $scope, $location, $rootScope){
               
         var contacts = localStorage.getItem("contacts");
         if(!contacts)
             contacts = [];
         else
             contacts = JSON.parse(contacts);
         
        $scope.contacts = contacts;
         
        $scope.fields = ['firstName', 'lastName', 'email', 'homePhone','cellPhone','birthday','website','address'];
         
        $scope.sort = function (field) {
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };
        
        $scope.sort.field = 'firstName';
        $scope.sort.order = false;
         
        $scope.show = function(id){
            $location.url('/contact/' + id);
        };
         
    }])

    .controller('newCtrl' ,['$scope','$location', '$rootScope','$filter', function($scope, $location, $rootScope, $filter){
        var contacts = localStorage.getItem("contacts");
        if(!contacts)
            contacts = [];
        else
            contacts = JSON.parse(contacts);
        
        var newid = $filter('getMaxId')(contacts) + 1;
        
        $scope.contact = {
            id: newid,
            firstName: ["", "text"],
            lastName:  ["", "text"],
            email:     ["", "email"],
            homePhone: ["", "tel"],
            cellPhone: ["", "tel"],
            birthday:  ["", "date"],
            website:   ["", "url"],
            address:   ["", "text"]
        };  
        $scope.addContact = function(){
                                
            contacts.push($scope.contact);
            localStorage.setItem("contacts" , JSON.stringify(contacts));
            
            $location.url('/contacts');
        };
        
    }])

    .controller('editCtrl' ,['$scope','$location','$routeParams','$filter', function($scope, $location , $routeParams, $filter){
        var contacts = localStorage.getItem("contacts");
         if(!contacts)
             contacts = [];
         else
             contacts = JSON.parse(contacts);
        
        var id = parseInt($routeParams.id, 10);
        $scope.contact = $filter('getById')(contacts, id);
            
        $scope.delete = function(){
            var index = contacts.indexOf($scope.contact);
            contacts.splice(index, 1);
            localStorage.setItem("contacts" , JSON.stringify(contacts));
            $location.url('/contacts');
        };
        
        $scope.save = function(){ 
            localStorage.setItem("contacts" , JSON.stringify(contacts));
            $location.url('/contacts');
        };
        
    }])

    .controller('todoCtrl' ,['$scope','$location','$routeParams','$filter', function($scope, $location , $routeParams, $filter){
        $scope.currentList = null;
        $scope.lists = lists;
        
        $scope.newTask = ["",false];
        
        $scope.show = function(list){
            $scope.currentList = list;
        };
        
        $scope.newList = function(){
            var list = {
                name: "New List",
                tasks: []
            }
            $scope.lists.push(list);
            $scope.currentList = list;
        };
        
        $scope.removeList = function(){
            var index = $scope.lists.indexOf($scope.currentList);
            $scope.lists.splice(index, 1);
            $scope.currentList = null;
        };
        
        $scope.insertNewTask = function(){
            if($scope.newTask[0] != "")
            {
                $scope.currentList['tasks'].push($scope.newTask);
                $scope.newTask = ["",false];
            }      
        };
        
        $scope.removeTask = function(task){
            var index = $scope.currentList['tasks'].indexOf(task);
            $scope.currentList['tasks'].splice(index, 1);
        };
        
        
    }]);


var lists = [
    {
        name: "Meteor Principles",
        tasks: [
            ["task 1", false],
            ["task 2", false],
            ["task 3", false],
            ["task 4", false],
            ["task 5", false],
            ["task 6", false]
        ]
    },
    {
        name: "Languages",
        tasks: [
            ["task 1", false],
            ["task 2", false],
            ["task 3", false],
            ["task 4", false],
            ["task 5", false],
            ["task 6", false]    
        ]
    },
    {
        name: "Favorite Scientists",
        tasks: [
            ["task 1", false],
            ["task 2", false],
            ["task 3", false],
            ["task 4", false],
            ["task 5", false],
            ["task 6", false]    
        ]
    },
    {
        name: "Shopping List",
        tasks: [
            ["task 1", false],
            ["task 2", false],
            ["task 3", false],
            ["task 4", false],
            ["task 5", false],
            ["task 6", false]   
        ]
    }
];

