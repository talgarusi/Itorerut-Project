angular.module('contactsApp' , ['ngRoute', 'ngMessages'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/contacts', {
                controller: 'listCtrl',
                templateUrl: '/views/list.html'
            })
            .when('/contacts/new', {
                controller: 'newCtrl',
                templateUrl: '/views/new.html'
            })
            .when('/contact/:id', {
                controller: 'editCtrl',
                templateUrl: '/views/edit.html'
            })
            .when('/todos', {
                controller: 'todoCtrl',
                templateUrl: '/views/noteslist.html'
            });
    
          //  .otherwise({redirectTo: '/contacts'});
        $locationProvider.html5Mode(true);
    });