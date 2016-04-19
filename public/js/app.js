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
            .when('/calendar', {
                controller: 'calendarCtrl',
                templateUrl: 'partials/calendar.ejs'
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
                controller: 'dashCtrl',
                templateUrl: 'partials/dashboard.ejs'
            })
            .otherwise({redirectTo: '/'});
    });

