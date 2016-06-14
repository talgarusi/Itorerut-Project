var express = require('express');
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var validation = require('./../validation/validator');


describe('Server posts requests', function() {
    
    it('Contact post', function() {  
        var contact1 = {};
        var valid = validation.validateContactPost(contact1);
        expect(valid).to.be.eql(false);
        
        var contact2 = null;
        valid = validation.validateContactPost(contact2);
        expect(valid).to.be.eql(false);
        
        var contact3 = {
            firstName: ["", "text"],
            lastName:  ["", "text"],
            email:     ["", "email"],
            homePhone: ["", "tel"],
            cellPhone: ["", "tel"],
            address:   ["", "text"]    
        };
        valid = validation.validateContactPost(contact3);
        expect(valid).to.be.eql(false);
        
        var contact4 = {
            test: ["", "text"],
            lastName:  ["", "text"],
            email:     ["", "email"],
            homePhone: ["", "tel"],
            cellPhone: ["", "tel"],
            birthday:  ["", "date"],
            website:   ["", "url"],
            address:   ["", "text"] 
        };
        valid = validation.validateContactPost(contact4);
        expect(valid).to.be.eql(false);
        
        var contact5 = {
            test: ["", "text"],
            lastName:  ["", "text"],
            email:     ["", "email"],
            homePhone: ["", "tel"],
            cellPhone: ["", "tel"],
            birthday:  ["", "date"],
            website:   ["", "url"],
            address:   ["", "text"],
            aaa: []
        };
        valid = validation.validateContactPost(contact5);
        expect(valid).to.be.eql(false);
        
        var contact6 = {
            firstName: ["", "text"],
            lastName:  ["", "text"],
            email:     ["", "email"],
            homePhone: ["", "tel"],
            cellPhone: ["", "tel"],
            birthday:  ["", "date"],
            website:   ["", "url"],
            address:   ["", "text"] 
        };
        valid = validation.validateContactPost(contact6);
        expect(valid).to.be.eql(true);
        
        
    });
    
    it('List post', function() {  
        var list1 = {};
        var valid = validation.validateListPost(list1);
        expect(valid).to.be.eql(false);
        
        var list2 = null;
        valid = validation.validateListPost(list2);
        expect(valid).to.be.eql(false);
        
        var list3 = {
                name: ""
        };
        valid = validation.validateListPost(list3);
        expect(valid).to.be.eql(false);
        
        var list4 = {
                name: "",
                test: []
        };
        valid = validation.validateListPost(list4);
        expect(valid).to.be.eql(false);
        
        var list5 = {
                name: "",
                test: [],
                aaa: ""
        };
        valid = validation.validateListPost(list5);
        expect(valid).to.be.eql(false);
            
        var list6 = {
                name: "",
                tasks: []
        };
        valid = validation.validateListPost(list6);
        expect(valid).to.be.eql(true);
    });
    
    it('Event post', function() {  
        var event1 = {};
        var valid = validation.validateEventPost(event1);
        expect(valid).to.be.eql(false);
        
        var event2 = null;
        valid = validation.validateEventPost(event2);
        expect(valid).to.be.eql(false);
        
        var event3 = {
            name: "",
            toDate: "",
            description: ""
        };
        valid = validation.validateEventPost(event3);
        expect(valid).to.be.eql(false);
        
        var event4 = {
            name: "",
            test: "",
            fromDate: "",
            description: ""
        };;
        valid = validation.validateEventPost(event4);
        expect(valid).to.be.eql(false);
        
        var event5 = {
            name: "",
            toDate: "",
            fromDate: "",
            description: "",
            aaa: ""
        };;
        valid = validation.validateEventPost(event5);
        expect(valid).to.be.eql(false);
        
        var event6 = {
            name: "",
            toDate: "",
            fromDate: "",
            description: ""
        };;
        valid = validation.validateEventPost(event6);
        expect(valid).to.be.eql(true);
    });
});
