angular.module('contactsApp')
    .value('FieldsTypes', {
        text: ['Text' , 'should be text'],
        emaill: ['Email' , 'should be an email address'],
        number: ['Number' , 'should be a number'],
        date: ['Date' , 'should be a date'],
        datetime: ['Datetime' , 'should be a datetime'],
        time: ['Time' , 'should be a time'],
        month: ['Month' , 'should be a month'],
        week: ['Week' , 'should be a week'],
        url: ['URL' , 'should be a URL'],
        tel: ['Phone Number' , 'should be a phone number'],
        color: ['Color' , 'should be a color']
    })
    .directive('formField', function($timeout, FieldsTypes){
        return{
            restrict: 'EA',
            templateUrl: '/views/form-field.html',
            replace: true,
            scope: {
                record: '=record',
                field: '@',
                live: '@',
                required: '@'
            },
            link: function($scope, element, attr){
               
                $scope.types = FieldsTypes;
            
                 /*$scope.$on('record:invalid', function(){
                   $scope[$scope.field].$setDirty(); 
                });*/
                
            }
        };
    })

    .directive('contenteditable', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                // view -> model
                element.bind('blur', function() {
                    scope.$apply(function() {
                    ctrl.$setViewValue(element.html());
                    });
                });

                // model -> view
                ctrl.$render = function() {
                    element.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$render();
            }
        };
    });
