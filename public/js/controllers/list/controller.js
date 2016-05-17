angular.module('contactsApp')
    /* 
        controller of the contacts list page(the table)
    */
    .controller('listCtrl' ,['$http', '$scope','$location','$rootScope', function($http, $scope, $location, $rootScope){
       
        $scope.h = window.innerHeight-100-113-22 +'px'; // h = height of the page
        
        $scope.query = "";

        $http.get("/contactsDB").
            then(function(response) {
                $scope.contacts = response.data;
                $scope.contact = "";
            }, 
            function(response) {
                console.log("Error retrieving contacts.");
            });
        
        /*
            the fields which will be displyed
            on the head of the table.
        */
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

    }]);