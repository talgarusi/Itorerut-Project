angular.module('contactsApp')
    /*
        value on an array the represent all the iput types in HTML5
        and an error masseage. 
    */
    .value('FieldsTypes', {
        text: ['Text' , 'should be text'],
        email: ['Email' , 'should be an email address'],
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
    
    /*
        new directive called form-field     
    */
    .directive('formField', function($timeout, FieldsTypes){
        return{
            restrict: 'EA',
            templateUrl: 'partials/form-field.ejs',
            replace: true,
            scope: {
                record: '=record',
                field: '@',
                live: '@',
                required: '@'
            },
            link: function($scope, element, attr){  
                $scope.types = FieldsTypes;
                $scope[$scope.field].$setDirty(); 
            }
        };
    })
    
    /*
        new directive called contenteditable
        for edit text live.
    */
    .directive('contenteditable', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                // view -> model
                element.bind('blur', function() {
                    scope.$apply(function() {
                        ctrl.$setViewValue(element.html());
                    });
                    scope.update();
                });

                // model -> view
                ctrl.$render = function() {
                    element.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$render();
            }
        };
    })

    .directive('modal', function(){
        return {
            template: '<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content" ng-transclude><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div></div></div></div>', 
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:{visible:'=', onSown:'&', onHide:'&'},   
            link:function postLink(scope, element, attrs){
                
                $(element).modal({
                    show: false, 
                    keyboard: attrs.keyboard, 
                    backdrop: attrs.backdrop
                });
                
                scope.$watch(function(){return scope.visible;}, function(value){
                    
                    if(value == true){
                        $(element).modal('show');
                    }else{
                        $(element).modal('hide');
                    }
                });
                
                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                  });
                });
                
                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                      scope.onSown({});
                  });
                });

                $(element).on('hidden.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                  });
                });
                
                $(element).on('hidden.bs.modal', function(){
                  scope.$apply(function(){
                      scope.onHide({});
                  });
                });
            }
        };
    })

    .directive('modalHeader', function(){
        return {
            template:'<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h3 class="modal-title">{{title}}</h3></div>',
            replace:true,
            restrict: 'E',
            scope: {title:'@'}
        };
    })

    .directive('modalBody', function(){
        return {
            template:'<div class="modal-body" ng-transclude></div>',
            replace:true,
            restrict: 'E',
            transclude: true
        };
    })

    .directive('modalFooter', function(){
        return {
            template:'<div class="modal-footer" ng-transclude></div>',
            replace:true,
            restrict: 'E',
            transclude: true
        };
    });
