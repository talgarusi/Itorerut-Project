angular.module('contactsApp')
    /* 
        controller of edit contacts page
        --> familiar with the new controller 
    */
    .controller('editCtrl' ,['$scope','$location','$routeParams','$filter', function($scope, $location , $routeParams, $filter){
        
        /*
            tring to restore contact object
            from the local storage
        */
        var contacts = localStorage.getItem("contacts");
         if(!contacts)
             contacts = [];
         else
             contacts = JSON.parse(contacts);
        
        /*
            getting the contact id from the URL
            and find the contact from the contacts array
            and place it on $scope.contact
        */
        var id = parseInt($routeParams.id, 10);
        $scope.contact = $filter('getById')(contacts, id);
        if($scope.contact.birthday[0] != "")
            $scope.contact.birthday[0] = new Date($scope.contact.birthday[0]);
            
        /*
            deleting function when 
            clicking on the delete button
        */
        $scope.delete = function(){
            /*
                1. remove the contact from the array.
                2. update the local storage.
                3. redirect to the list table.
            */
            var index = contacts.indexOf($scope.contact);
            contacts.splice(index, 1);
            localStorage.setItem("contacts" , JSON.stringify(contacts));
            $location.url('/contacts');
        };
        
        /*
            saving function when 
            clicking on the save button
        */
        $scope.save = function(){ 
            /*
                1. update the local storage (we already update the pointer).
                2. redirect to the list table.
            */
            localStorage.setItem("contacts" , JSON.stringify(contacts));
            $location.url('/contacts');
        };
        
    }]);