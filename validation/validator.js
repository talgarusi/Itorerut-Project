exports.validateContactPost = function(contact){
    if(contact == null || contact == {})
        return false;
    if(Object.keys(contact).length != 8)
        return false;
    
    if(!contact.hasOwnProperty("firstName"))
        return false;
    if(!contact.hasOwnProperty("lastName"))
        return false;
    if(!contact.hasOwnProperty("email"))
        return false;
    if(!contact.hasOwnProperty("homePhone"))
        return false;
    if(!contact.hasOwnProperty("cellPhone"))
        return false;
    if(!contact.hasOwnProperty("birthday"))
        return false;
    if(!contact.hasOwnProperty("website"))
        return false;
    if(!contact.hasOwnProperty("address"))
        return false;
    
    return true;
};

exports.validateListPost = function(list){
    if(list == null || list == {})
        return false;
    if(Object.keys(list).length != 2)
        return false;
    
    if(!list.hasOwnProperty("name"))
        return false;
    if(!list.hasOwnProperty("tasks"))
        return false;
    
    return true;
};

exports.validateEventPost = function(event){
    if(event == null || event == {})
        return false;
    if(Object.keys(event).length != 4)
        return false;
    
    if(!event.hasOwnProperty("name"))
        return false;
    if(!event.hasOwnProperty("toDate"))
        return false;
    if(!event.hasOwnProperty("fromDate"))
        return false;
    if(!event.hasOwnProperty("description"))
        return false;
    
    return true;
    
};