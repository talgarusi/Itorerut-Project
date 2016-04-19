angular.module('contactsApp')
	/* 
        controller of the calendar
    */
    .controller('calendarCtrl' ,['$scope', function($scope){
        /*
            h = the height of the page
        */ 
        $scope.h = window.innerHeight-100 +'px';
		$scope.gros = "Hello Garus";
     }]);  