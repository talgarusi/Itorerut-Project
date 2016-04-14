angular.module('contactsApp' , ['ngRoute', 'ngMessages'])
    /*
        ROUTE configuration
        when href is... do...
    */
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/contacts', {
                controller: 'listCtrl',
                templateUrl: 'partials/list.ejs'
            })
            .when('/contacts/new', {
                controller: 'newCtrl',
                templateUrl: 'partials/new.ejs'
            })
            .when('/contact/:id', {
                controller: 'editCtrl',
                templateUrl: 'partials/edit.ejs'
            })
            .when('/todos', {
                controller: 'todoCtrl',
                templateUrl: 'partials/noteslist.ejs'
            })
            .when('/', {
                controller: 'homeCtrl',
                templateUrl: 'partials/home.ejs'
            })
            .otherwise({redirectTo: '/'});
    });

