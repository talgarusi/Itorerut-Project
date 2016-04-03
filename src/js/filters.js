angular.module('contactsApp')
     .filter('labelCase', function(){
        return function(input){
            input = input.replace(/([A-Z])/g, ' $1');
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
    })

    .filter('keyFilter', function(){
        return function(obj, query){
            var result = {};
            angular.forEach(obj, function(val, key){
                if(key !== query)
                    result[key] = val;
            });
            return result;
        };
    })

    .filter('getById', function() {
        return function(input, id) {
            var i=0, len=input.length;
            for (; i<len; i++) {
                if (+input[i].id == +id) {
                    return input[i];
                }
            }
            return null;
        }
    })

    .filter('getMaxId', function() {
        return function(input) {
            if(input.length <= 0)
                return 0;
            var max = input[0].id;
            var i=1, len=input.length;
            for (; i<len; i++) {
                if (input[i].id > max) {
                    max = input[i].id;
                }
            }
            return max;
        }
    })

    .filter('numofTasks', function(){
        return function(input){
            var tasks = input['tasks'];
            var num = 0;
            var i=0, len=tasks.length;
            for (; i<len; i++) {
                if (tasks[i][1] == false) {
                    num++;
                }
            }
            return num;
        };
    });


        