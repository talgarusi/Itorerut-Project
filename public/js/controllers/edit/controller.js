angular.module('contactsApp')
    /* 
        controller of edit contacts page
        --> familiar with the new controller 
    */
    .controller('editCtrl' ,['$http', '$scope','$location','$routeParams','$filter', function($http, $scope, $location , $routeParams, $filter){

        /*
            getting the contact id from the URL
            and find the contact from the DB
            and place it on $scope.contact
        */ 
        var id = $routeParams.id;

        $http.get("/contact/" + id).
            then(function(response) {
                $scope.contact = response.data;
                if($scope.contact.birthday[0] != "")
                    $scope.contact.birthday[0] = new Date($scope.contact.birthday[0]);
            }, 
            function(response) {
                console.log("Error retrieving contacts.");
            });
                
        /*
            deleting function when 
            clicking on the delete button
        */
        $scope.delete = function(){
            $http.delete("/contact/" + id).
                then(function(response) {
                    console.log("Contact deleted");
                }, 
                function(response) {
                    console.log("Error deleteing contact.");
                });
            $location.url('/contacts');
        };
        
        /*
            saving contact when 
            clicking on the save button
        */
        $scope.save = function(){ 
            $http.put("/contact/" + id, $scope.contact).
                then(function(response) {
                    console.log("Contact saved");
                }, 
                function(response) {
                    console.log("Error saveing contact.");
                });
            $location.url('/contacts');
        };
        
    }]);