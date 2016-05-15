angular.module('contactsApp')
     /* 
        controller of new contacts page 
    */
    .controller('newCtrl' ,['$http', '$scope','$location', '$rootScope','$filter', function($http, $scope, $location, $rootScope, $filter){
        
        /*
            tring to restore contact object
            from the local storage
        */
        /*var contacts = localStorage.getItem("contacts");
        if(!contacts)
            contacts = [];
        else
            contacts = JSON.parse(contacts);

        /*
            getting the next available id number
            for the new contact
        */  
        //var newid = $filter('getMaxId')(contacts) + 1;
        var newid = 1;
        /*
            new contact object
        */
        $scope.contact = {
            id: "",
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
                1. push the new contact to the array.
                2. update the local storage.
                3. redirect to the list table.
            */
            /*contacts.push($scope.contact);
            localStorage.setItem("contacts" , JSON.stringify(contacts));
            */
            $http.post('/contacts', $scope.contact).success(function(response) {
                console.log(response);
            });
            
            $location.url('/contacts');
        };
        
        
        
    }]);