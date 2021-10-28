/**
 * Created by tonte on 7/18/16.
 */
(function(window, document, BytePushers) {
    BytePushers = BytePushers || {};
    BytePushers.models = BytePushers.models ||  BytePushers.namespace("software.bytepushers.models");

    BytePushers.models.Person = function Person (personJsonConfig) {
        BytePushers.models.Person.prototype.superclass.apply(this, [personJsonConfig]);

        var self = this;
        var firstName = (Object.isDefined(personJsonConfig) && Object.isString(personJsonConfig.firstName))?
            personJsonConfig.firstName: null;
        var middleName = (Object.isDefined(personJsonConfig) && Object.isString(personJsonConfig.middleName))?
            personJsonConfig.middleName: null;
        var lastName = (Object.isDefined(personJsonConfig) && Object.isString(personJsonConfig.lastName))?
            personJsonConfig.lastName: null;
        var birthDate = (Object.isDefined(personJsonConfig) && Object.isDate(personJsonConfig.birthDate))? personJsonConfig.birthDate :
            (Object.isDefined(personJsonConfig) && Object.isString(personJsonConfig.birthDate))? new Date(personJsonConfig.birthDate): null;

        var socialSecurityNumber = 3334455555,
            setSocialSecurityNumber = function (ssn) {
                socialSecurityNumber = ssn;
            };

        function setFirstName (name) {
            firstName = name;
        }

        this.getSocialSecurityNumber = function () {
            return socialSecurityNumber;
        };

        this.getFirstName = function() {
            return firstName;
        };

        this.getMiddleName = function() {
            return middleName;
        };

        this.getLastName = function() {
            return lastName;
        };

        this.getBirthDate = function() {
            return birthDate;
        };

        BytePushers.models.Person.prototype.toJSON = function(serializeUIProperties) {
            serializeUIProperties = this.useSerializeUIProperties(serializeUIProperties);
            var jsonId = this.formatJsonIdProperty(),
                jsonFirstName = (Object.isString(this.getFirstName()))? "\"" + this.getFirstName() + "\"" : null,
                jsonMiddleName = (Object.isString(this.getMiddleName()))? "\"" + this.getMiddleName() + "\"" : null,
                jsonLastName = (Object.isString(this.getLastName()))? "\"" + this.getLastName() + "\"" : null,
                jsonBirthDate = (Object.isDate(this.getBirthDate()))? "\"" + this.getBirthDate().toJSON() + "\"" : null,
                json = "{" +
                    "\"id\": " + jsonId + "," +
                    "\"firstName\": " + jsonFirstName + "," +
                    "\"middleName\": " + jsonMiddleName+ "," +
                    "\"lastName\": " + jsonLastName + "," +
                    "\"birthDate\": " + jsonBirthDate + "," +
                    BytePushers.models.Person.prototype.superclass.prototype.toJSON.apply(this, [serializeUIProperties, false, false]) +
                "}";
            return JSON.parse(json);
        };

        BytePushers.models.Person.prototype.toString = function () {
            return  "Work Order {" +
                "id: " + this.getId() + ", " +
                "firstName: \"" + this.getFirstName() + "\", " +
                "middleName: " + this.getMiddleName() + ", " +
                "lastName: \"" + this.getLastName() + "\", " +
                "birthDate: \"" + this.getBirthDate() + "\", " +
                BytePushers.models.Person.prototype.superclass.prototype.toString.apply(this, [false, false]) +
            "}";
        };
    };

    Object.defineProperty(BytePushers.models.Person, 'prototype', {
        enumerable: false,
        value: BytePushers.inherit(BytePushers.models.BaseEntity.prototype)
    });
    //BytePushers.models.Person.prototype = BytePushers.inherit(BytePushers.models.BaseEntity.prototype);
    Object.defineProperty(BytePushers.models.Person.prototype, 'constructor', {
        enumerable: false,
        value: BytePushers.models.Person
    });
    //BytePushers.models.Person.prototype.constructor = BytePushers.models.Person;
    Object.defineProperty(BytePushers.models.Person.prototype, 'superclass', {
        enumerable: false,
        value: BytePushers.models.BaseEntity
    });
    //BytePushers.models.Person.prototype.superclass = BytePushers.models.BaseEntity;
})(window, document, BytePushers);
