angular.module('contactsApp')
    /* 
        controller of the contacts list page(the table)
    */
    .controller('listCtrl' ,['$http', '$scope','$location','$rootScope', function($http, $scope, $location, $rootScope){
       
        /*
            the filter query
        */
        $scope.query = "";

        /*
            h = height of the page
        */
        $scope.h = window.innerHeight-100-113-22 +'px';

        /*
            tring to restore contact object
            from the local storage
        */
        
        /*
        var contacts = localStorage.getItem("contacts");
        if(!contacts)
            contacts = [];
        else
            contacts = JSON.parse(contacts);
        $scope.contacts = contacts;

        /*
            the fields which will be displyed
            on the head of the table.
        */
        
        $http.get('/contacts').success(function(response) {
            //console.log("I got the data I requested");
            $scope.contacts = response;
            $scope.contact = "";
        });
        
        $scope.fields = ['firstName', 'lastName', 'email', 'homePhone','cellPhone','birthday','website','address'];

        /*
            function which set the sorting on the incoming field.
        */
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