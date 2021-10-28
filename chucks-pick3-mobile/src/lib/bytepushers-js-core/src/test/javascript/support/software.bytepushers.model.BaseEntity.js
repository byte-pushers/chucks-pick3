/* jshint -W108, -W109 */
(function(window, document, BytePushers) {
  BytePushers = BytePushers || {};
  BytePushers.models = BytePushers.models ||  BytePushers.namespace("software.bytepushers.models");

  /**
   * A convenient function that can be used for any abstract method
   */
  BytePushers.models.abstractMethod = function () {
    throw new Error("abstract method");
  };

  BytePushers.models.BaseEntity = function BaseEntity(baseEntityJsonConfig) {
    var self = this,
        id = (Object.isDefined(baseEntityJsonConfig) && Object.isNumeric(baseEntityJsonConfig.id))?
          baseEntityJsonConfig.id: null,
        createdDate = (Object.isDefined(baseEntityJsonConfig) && Object.isDefined(baseEntityJsonConfig.createdDate)) ?
          new Date(baseEntityJsonConfig.createdDate): new Date(),
        lastModifiedDate = (Object.isDefined(baseEntityJsonConfig) && Object.isDefined(baseEntityJsonConfig.lastModifiedDate)) ?
          new Date(baseEntityJsonConfig.lastModifiedDate): createdDate,
        createdBy = (Object.isDefined(baseEntityJsonConfig) && Object.isDefined(baseEntityJsonConfig.createdBy))?
          baseEntityJsonConfig.createdBy: null,
        lastModifiedBy = (Object.isDefined(baseEntityJsonConfig) && Object.isDefined(baseEntityJsonConfig.lastModifiedBy)) ?
          baseEntityJsonConfig.lastModifiedBy: null,
        setIdAgain = function(someId) {
          id = someId;
        };

    function setId(someId) {
      id = someId;
    }

    this.getId = function() {
      return id;
    };

    this.getCreatedDate = function() {
      return createdDate;
    };

    this.getLastModifiedDate = function() {
      return lastModifiedDate;
    };

    this.getCreatedBy = function() {
      return createdBy;
    };

    this.getLastModifiedBy = function() {
      return lastModifiedBy;
    };

    this.formatJsonCreatedDateProperty = function() {
      return (Object.isDate(this.getCreatedDate()))? "\"" + this.getCreatedDate().toJSON() + "\"" : null;
    };

    this.formatJsonLastModifiedDateProperty = function() {
      return (Object.isDate(this.getLastModifiedDate()))?"\""+this.getLastModifiedDate().toJSON()+"\"":null;
    };

    this.formatJsonCreatedByProperty = function() {
      return (Object.isDefined(this.getCreatedBy()))? "\"" + this.getCreatedBy() + "\"" : null;
    };

    this.formatJsonLastModifiedByProperty = function() {
      return (Object.isDefined(this.getLastModifiedBy()))? "\"" + this.getLastModifiedBy() + "\"" : null;
    };

    BytePushers.models.BaseEntity.prototype.formatJsonIdProperty = function() {
      return (Object.isNumeric(this.getId()))? this.getId() : (Object.isString(this.getId()))? "\"" + this.getId() + "\"" : null;
    };

    BytePushers.models.BaseEntity.prototype.useSerializeUIProperties = function(serializeUIProperties) {
      return (Object.isBoolean(serializeUIProperties))? serializeUIProperties : false;
    };

    BytePushers.models.BaseEntity.prototype.shouldUseWapper = function(useWrapper) {
      return (Object.isBoolean(useWrapper))? useWrapper : true;
    };

    BytePushers.models.BaseEntity.prototype.shouldIncludeId = function(includeId) {
      return (Object.isBoolean(includeId))? includeId : true;
    };

    BytePushers.models.BaseEntity.prototype.toJSON = function (serializeUIProperties, useWrapper, includeId) {
      serializeUIProperties = this.useSerializeUIProperties(serializeUIProperties);
      useWrapper = this.shouldUseWapper(useWrapper);
      includeId = this.shouldIncludeId(includeId);
      var jsonId = this.formatJsonIdProperty(),
          jsonCreatedDate = this.formatJsonCreatedDateProperty(),
          jsonLastModifiedDate = this.formatJsonLastModifiedDateProperty(),
          jsonCreatedBy = this.formatJsonCreatedByProperty(),
          jsonLastModifiedBy = this.formatJsonLastModifiedByProperty(),
          json =  ((useWrapper)? "{": "") +
              ((includeId)? "\"id\": " + jsonId + "," : "") +
              "\"createdDate\": " + jsonCreatedDate + "," +
              "\"lastModifiedDate\": " + jsonLastModifiedDate + "," +
              "\"createdBy\": " + jsonCreatedBy + "," +
              "\"lastModifiedBy\": " + jsonLastModifiedBy +
          ((useWrapper)? "}": "");
      return (useWrapper)? JSON.parse(json) : json;
    };

    BytePushers.models.BaseEntity.prototype.toString = function (useWrapper, includeId) {
      useWrapper = (Object.isBoolean(useWrapper))? useWrapper : true;
      includeId = (Object.isBoolean(includeId))? includeId : true;
      return  ((useWrapper)? "Base Entity {": "") +
          ((includeId)? "id: " + this.getId() + ", " : "") +
          "createdDate: \"" + this.getCreatedDate().toJSON() + "\", " +
          "lastModifiedDate: \"" + this.getLastModifiedDate().toJSON() + "\", " +
          "createdBy: \"" + this.getCreatedBy() + "\", " +
          "lastModifiedBy: \"" + this.getLastModifiedBy() + "\"" +
      ((useWrapper)? "}": "");
    };
  };

})(window, document, BytePushers);
