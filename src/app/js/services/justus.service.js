'use strict';

angular.module('JustusService', [])
.service('JustusService', ['$log', '$http', '$rootScope', function ($log, $http, $rootScope) {
  // in justus we keep data to be stored in database
  this.justus = {};
  this.filedata = {};

  this.updatePublicationFormData = function(data) {
    this.justus = data;
  };

  this.getPublicationFormData = function() {
    return this.justus;
  };

  this.clearPublicationForm = function() {
    this.justus = {
      "julkaisu": {},
      "organisaatiotekija": []
    };
  };

  this.clearFileData = function() {
      delete $rootScope.filedata;
      $rootScope.filedata = {};
      this.file = null;
  }

  this.file = function (file) {
      this.file = file;
  };


  // Returns true if the provided field is configured to be visible, false if not
  this.isFieldVisible = function(field) {

    let visible = false;

    if (field_default_config[field] && field_default_config[field].visibleInPublicationTypes.indexOf(this.justus.julkaisu['julkaisutyyppi']) !== -1) {

      visible = true;
    }

    // If the field is visible for the current publication type, it
    // can still be hidden by the active organization
    if (visible === true || !field_default_config[field]) {
      let organizationConfig = angular.copy($rootScope.user.visibleFields);
      visible = organizationConfig.indexOf(field) !== -1;
    }
    return visible;
  };

  this.isFieldRequired = function(fieldName) {

    // If the field is missing from the configuration, it cannot be mandatory unless made mandatory by organization config
      if (!field_default_config[fieldName]) {
      if (this.isFieldRequiredByOrganization(fieldName) === true) {
        return true;
      }
      return false;
    }


      let fieldRequired = field_default_config[fieldName].requiredInPublicationTypes.indexOf(this.justus.julkaisu['julkaisutyyppi']) !== -1 &&
          this.isFieldRequiredByOrganization(fieldName);

    // If the field was required we need to check if the field required attribute depends on another filled field
    if (fieldRequired === true) {
      angular.forEach(field_default_config[fieldName].optionalWithFields, function(field) {
        if (this.fieldIsEmpty(this.justus.julkaisu[field]) === false) {
          fieldRequired = false;
        }
      }, this);
    }
    // Otherwise the field can be made mandatory by another filled field
    else {
      angular.forEach(field_default_config[fieldName].requiredWithFields, function(field) {
        if (this.fieldIsEmpty(this.justus.julkaisu[field]) === false && this.justus.julkaisu[field] !== '0') {
          fieldRequired = true;
        }
      }, this);
    }

    return fieldRequired;
  };

  this.isFieldRequiredByOrganization = function(fieldName) {
    let organizationConfig = angular.copy($rootScope.user.requiredFields);
    return organizationConfig.indexOf(fieldName) !== -1;
  };

      this.fieldIsEmpty = function(fieldValue) {
        let fieldIsEmpty;

          if (angular.isArray(fieldValue)) {
               fieldIsEmpty = (
                  fieldValue[0] === '' ||
                  fieldValue[0] === undefined ||
                  fieldValue[0] === null );
          } else {
              fieldIsEmpty = (fieldValue === '' ||
                  fieldValue === {} ||
                  fieldValue === [] ||
                  fieldValue === undefined ||
                  fieldValue === null );
          }
          return fieldIsEmpty;
      };


   this.getListOfVisibleFields = function () {

        let visibleFields = angular.copy($rootScope.user.visibleFields);
        let indexes = [];

        for (var i = 0; i <visibleFields.length; i++) {
          if (this.isFieldVisible(visibleFields[i]) === false) {
              indexes.push(i);
          }
        }
        // remove from array if not visible in current publication type
        for (var j = indexes.length -1; j >= 0; j--) {
             visibleFields.splice(indexes[j], 1);
         }

        return visibleFields;
  };

  this.isTekijatEmpty = function (tekijatList) {
    let empty = false;

    if (!tekijatList || !tekijatList[0]) {
      empty = true;
      return empty;
    }

    for (let i = 0; i < tekijatList.length; i++) {
      if (!tekijatList[i].nimi || tekijatList[i].nimi === "" || tekijatList[i].nimi === null ) {
        empty = true;
      }
    }
    return empty;
  }

    this.isPatternValid = function (fieldName, list = undefined) {
      // Assume the field is valid, for performance we will continue validating until the field is first decided as invalid
      let valid = true;
      let fieldIsFilled = false;

      if (!field_default_config[fieldName]) {
        return true;
      }

      if (this.isFieldVisible(fieldName) === false) {
        return true;
      }

      if (list) {
        for (let key in list) {
          let value = list[key].nimi;
          if (!value.match(this.pattern['tekijat'])) {
            return false;
          }
        }
      }

      fieldIsFilled = !this.fieldIsEmpty(this.justus.julkaisu[fieldName]);

      // Validate the field has against a possible validation pattern
      if (field_default_config[fieldName].pattern !== null && valid === true && fieldIsFilled === true) {

        // If trying to pattern match something else than a string the value is invalid
        if (typeof this.justus.julkaisu[fieldName] === 'string') {
          valid = this.justus.julkaisu[fieldName].match(field_default_config[fieldName].pattern) !== null;
        }

        // Field that contains pattern may also be array
        if (typeof this.justus.julkaisu[fieldName] === 'object') {
            let i = 0;
            while (valid && i < this.justus.julkaisu[fieldName].length ) {
                valid = this.justus.julkaisu[fieldName][i].match(field_default_config[fieldName].pattern) !== null;
                i++;
            }
        }
      }
      return valid;
    }

    this.isValid = function(fieldName) {

    // Assume the field is valid, for performance we will continue validating until the field is first decided as invalid
    let valid = true;
    let orcidValid = true;
    let reason = '';
    let fieldIsFilled = false;

    if (!field_default_config[fieldName]) {
      return true;
    }

    if (this.isFieldVisible(fieldName) === false) {
      return true;
    }


    if (field_default_config[fieldName].childnode) {
        if (this.fieldIsEmpty(this.justus.julkaisu[fieldName])) {
            valid = this.isFieldRequired(fieldName) === true ? false : true;
            reason = valid === false ? `Field is empty: ${fieldName}` : '';
        }
        else {
            fieldIsFilled = true;
        }
    } else {
        if (this.fieldIsEmpty(this.justus[fieldName])) {
            valid = this.isFieldRequired(fieldName) === true ? false : true;
            reason = valid === false ? `Field is empty: ${fieldName}` : '';
        }
        else {
            fieldIsFilled = true;
        }
    }


    // Validate a field that contains a list of values
    if (field_default_config[fieldName].requiredAmount > 0 && valid === true) {
      valid = angular.isArray(this.justus[fieldName]) === true &&
      this.justus[fieldName].length >= field_default_config[fieldName].requiredAmount;
      reason = valid === false ? 'At least ' + field_default_config[fieldName].requiredAmount + ' value is required' : '';
    }

    // Validate a field which consists of multiple subfields
    if (field_default_config[fieldName].subfields.length > 0 && valid === true && fieldIsFilled === true) {
      valid = this.validateNestedField(fieldName);
      if (fieldName === 'organisaatiotekija') {
          orcidValid = this.validateOrcid(fieldName);
      }

      if (!orcidValid && valid) {
          reason = orcidValid === false ? `Orcid field is invalid ` : '';
      } else {
          reason = valid === false ? `One or more subfield value is invalid for field: ${fieldName}` : '';
      }
    }

    if (!orcidValid) {
      valid = false;
    }

    if (valid === false && reason) {
      $log.error(reason);
    }
    return valid;
  };

    this.validateOrcid = function (fieldName) {

      let validArray = [];
      let valid = true;

        if (angular.isArray(this.justus[fieldName])) {
          for (let i = 0; i < this.justus[fieldName].length; i++) {
            if (this.justus[fieldName][i].orcid === undefined || !this.justus[fieldName][i].orcid || this.justus[fieldName][i].orcid === '') {
                validArray.push(true);
            } else {
              if (this.justus[fieldName][i].orcid === "0000-0000-0000-0000") {
                validArray.push(false);
              } else {
                validArray.push(this.justus[fieldName][i].orcid.match(this.pattern["orcid"]) !== null);
              }
            }
          }
        }

        if (validArray.indexOf(false) >= 0) {
          valid = false;
        }
        return valid;
    };

  this.validateNestedField = function(fieldName) {
    let valid = true;

    angular.forEach(field_default_config[fieldName].subfields, function(subfieldName) {
      const subfieldIsRequired = this.isFieldRequired(subfieldName);

      // If the field consists of a list of objects, we need to validate each index
      if (angular.isArray(this.justus[fieldName]) && subfieldIsRequired === true) {
        angular.forEach(this.justus[fieldName], function(fieldIndex, index) {

          if (this.fieldIsEmpty(fieldIndex[subfieldName]) === true) {
            valid = false;
          }
          else if (angular.isArray(fieldIndex[subfieldName])) {
            if (fieldIndex[subfieldName].length > 0) {
              let emptyStrings = fieldIndex[subfieldName].filter(str => str.trim().length <= 0);
              if (emptyStrings.length > 0) {
                valid = false;
              }
            }
            else {
              valid = false;
            }
          }
        }, this);
      }
      // Otherwise we can just validate the direct child field
      else {
        if (this.fieldIsEmpty(field_default_config[fieldName][subfieldName]) === true && subfieldIsRequired === true) {
          valid = false;
        }
      }
    }, this);

    return valid;
  };


  this.getInvalidFields = function(fields, tekijat) {

    const invalidFields =
      {
        "missingValue": [],
        "invalidValue": []
      };

      for (let i = 0; i < fields.length; i++) {
        if (fields[i] === "tekijat") {
          if (this.isTekijatEmpty(tekijat) === true) {
            invalidFields["missingValue"].push("tekijat");
          }
          if (this.isPatternValid("tekijat", tekijat) === false) {
            invalidFields["invalidValue"].push("tekijat");
          }
        } else {
          if (this.isValid(fields[i]) === false) {
            invalidFields["missingValue"].push(fields[i]);
          }
          if (this.isPatternValid(fields[i]) === false) {
            invalidFields["invalidValue"].push(fields[i]);
          }
        }
      }
      return invalidFields;

  };



  // pattern checkers (for validity)
  this.pattern = {
    'julkaisuvuosi': /^[0-9]{4}$/,
    'orcid': /^(|[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X])$/g,
    'isbn': /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/g,
    'issn': /^([0-9]{4}[- ][0-9]{3}[0-9X])$/g,
    'tekijat': /^[^,;]+,[^,;]+$/,
    'julkaisumaksu': /^([0-9]+|[0-9]+[,.]?[0-9]{1,2})$/,
    'julkaisumaksuvuosi': /^[0-9]{4}$/
  };

  this.checkISBN = function (isbn) {
    if (!isbn) return false;
    if (!isbn.match(this.pattern.isbn)) return false;
    // isbn regex and numbers(+X) 10 or 13! remove '-' chars
    let ret = false;
    let digits = isbn.replace(/-/g, '').replace(/ /g, '');

    let a = digits.substr(0, 1); let aa = parseInt(a);
    let b = digits.substr(1, 1); let bb = parseInt(b);
    let c = digits.substr(2, 1); let cc = parseInt(c);
    let d = digits.substr(3, 1); let dd = parseInt(d);
    let e = digits.substr(4, 1); let ee = parseInt(e);
    let f = digits.substr(5, 1); let ff = parseInt(f);
    let g = digits.substr(6, 1); let gg = parseInt(g);
    let h = digits.substr(7, 1); let hh = parseInt(h);
    let i = digits.substr(8, 1); let ii = parseInt(i);
    if (digits.length === 10) {
      let x = digits.substr(9, 1); let xx = (x === 'X' ? 10 : parseInt(x));
      let sum = (10 * aa) + (9 * bb) + (8 * cc) + (7 * dd) + (6 * ee) + (5 * ff) + (4 * gg) + (3 * hh) + (2 * ii) + (1 * xx);
      let mod = sum % 11;
      ret = mod === 0;
    }
    if (digits.length === 13) {
      let j = digits.substr(9, 1); let jj = parseInt(j);
      let k = digits.substr(10, 1); let kk = parseInt(k);
      let l = digits.substr(11, 1); let ll = parseInt(l);
      let x = digits.substr(12, 1); let xx = parseInt(x); // vain numeroita
      let sum = (1 * aa) + (3 * bb) + (1 * cc) + (3 * dd) + (1 * ee) + (3 * ff) + (1 * gg) + (3 * hh) + (1 * ii) + (3 * jj) + (1 * kk) + (3 * ll);
      let mod = sum % 10;
      if (mod !== 0) {
        ret = (10 - mod) === x;
      }
      else {
        ret = mod === x;
      }
    }
    return ret;
  };

  this.checkISSN = function (issn) {
    if (!issn) return false;
    if (!issn.match(this.pattern.issn)) return false;
    let digits = issn.replace(/-/g, '').replace(/ /g, '');
    let a = digits.substr(0, 1); let aa = parseInt(a);
    let b = digits.substr(1, 1); let bb = parseInt(b);
    let c = digits.substr(2, 1); let cc = parseInt(c);
    let d = digits.substr(3, 1); let dd = parseInt(d);
    let e = digits.substr(4, 1); let ee = parseInt(e);
    let f = digits.substr(5, 1); let ff = parseInt(f);
    let g = digits.substr(6, 1); let gg = parseInt(g);
    let x = digits.substr(7, 1); let xx = (x === 'X' ? 10 : parseInt(x));
    let sum = (8 * aa) + (7 * bb) + (6 * cc) + (5 * dd) + (4 * ee) + (3 * ff) + (2 * gg) + (xx);
    return sum % 11 === 0;
  };

  this.checkORCID = function (orcid) {
    if (!orcid) return false;
    if (!orcid.match(this.pattern.orcid)) return false;
    let a = orcid.substr(0, 1); let aa = (parseInt(a)) * 2;
    let b = orcid.substr(1, 1); let bb = (parseInt(b) + aa) * 2;
    let c = orcid.substr(2, 1); let cc = (parseInt(c) + bb) * 2;
    let d = orcid.substr(3, 1); let dd = (parseInt(d) + cc) * 2;
    let e = orcid.substr(5, 1); let ee = (parseInt(e) + dd) * 2;
    let f = orcid.substr(6, 1); let ff = (parseInt(f) + ee) * 2;
    let g = orcid.substr(7, 1); let gg = (parseInt(g) + ff) * 2;
    let h = orcid.substr(8, 1); let hh = (parseInt(h) + gg) * 2;
    let i = orcid.substr(10, 1); let ii = (parseInt(i) + hh) * 2;
    let j = orcid.substr(11, 1); let jj = (parseInt(j) + ii) * 2;
    let k = orcid.substr(12, 1); let kk = (parseInt(k) + jj) * 2;
    let l = orcid.substr(13, 1); let ll = (parseInt(l) + kk) * 2;
    let m = orcid.substr(15, 1); let mm = (parseInt(m) + ll) * 2;
    let n = orcid.substr(16, 1); let nn = (parseInt(n) + mm) * 2;
    let o = orcid.substr(17, 1); let oo = (parseInt(o) + nn) * 2;
    let remainder = oo % 11;
    let result = (12 - remainder) % 11;
    let x = orcid.substr(18, 1); let xx = (x === 'X' ? 10 : parseInt(x));
    return x === result;
  };
}]);
