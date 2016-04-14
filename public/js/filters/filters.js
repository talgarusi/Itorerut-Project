angular.module('contactsApp')
    /*
        filter which get an text -> field name in contact
        and label the first letter
        and fing the next upper letter and canel it and put space between the words.
    */
    .filter('labelCase', function(){
        return function(input){
            input = input.replace(/([A-Z])/g, ' $1');
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
    })
    
    /*
        filter which get an Object->contact and query->field
        the function return and array of the fileds witout the query.
    */
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
    
    /*
        filter which get array and id of object in the array
        the filter return the object with that id.
        otherwise return null.
    */
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
    
    /*
        filter which get array.
        the filter return the max id on object in the array.
    */
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
    });


        