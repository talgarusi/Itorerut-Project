angular.module('contactsApp')
	/* 
        controller of the home page
    */
    .controller('homeCtrl' ,['$scope', function($scope){
        /*
            h = the height of the page
        */ 
        $scope.h = window.innerHeight-100 +'px';        
     }]);  