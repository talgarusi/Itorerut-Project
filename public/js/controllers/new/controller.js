angular.module('contactsApp')
     /* 
        controller of new contacts page 
    */
    .controller('newCtrl' ,['$http', '$scope','$location', '$rootScope','$filter', function($http, $scope, $location, $rootScope, $filter){
        
        /*
            new contact object
        */
        $scope.contact = {
            firstName: ["", "text"],
            lastName:  ["", "text"],
            email:     ["", "email"],
            homePhone: ["", "tel"],
            cellPhone: ["", "tel"],
            birthday:  ["", "date"],
            website:   ["", "url"],
            address:   ["", "text"]
        };  
        
        /*
            adding function when 
            clicking on the create button
        */
        $scope.addContact = function(){
            /*
                1. update the DB.
                2. redirect to the list table.
            */
                    
            $http.post("/contacts", $scope.contact).
                then(function(response) {
                    console.log("Contact added");
                }, 
                function(response) {
                    console.log("Error adding contact.");
                });
            $location.url('/contacts');
        };    
    }]);