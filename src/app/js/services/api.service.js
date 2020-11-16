'use strict';

angular.module('APIService', [])
.service('APIService', [

  '$http', '$location', '$log', 'API_BASE_URL', 'Upload',
  function ($http, $location, $log, API_BASE_URL, Upload) {
    this.meta = {
      tables: {
        'julkaisu': {
          name: 'julkaisu',
          pkcol: 'id',
          columns: [
            { name: 'id', default: null },
            { name: 'organisaatiotunnus', default: '' },
            { name: 'julkaisutyyppi', default: '' },
            { name: 'julkaisuvuosi', default: '' },
            { name: 'julkaisunnimi', default: '' },
            { name: 'tekijat', default: '' },
            { name: 'julkaisuntekijoidenlukumaara', default: '' },
            { name: 'konferenssinvakiintunutnimi', default: '' },
            { name: 'emojulkaisunnimi', default: '' },
            { name: 'isbn', default: null }, // array
            { name: 'emojulkaisuntoimittajat', default: '' },
            { name: 'lehdenjulkaisusarjannimi', default: '' },
            { name: 'issn', default: null }, // array
            { name: 'volyymi', default: null },
            { name: 'numero', default: null },
            { name: 'sivut', default: '' },
            { name: 'artikkelinumero', default: '' },
            { name: 'kustantaja', default: '' },
            { name: 'julkaisunkustannuspaikka', default: '' },
            { name: 'julkaisunkieli', default: '' },
            { name: 'julkaisunkansainvalisyys', default: '' },
            { name: 'julkaisumaa', default: '' },
            { name: 'kansainvalinenyhteisjulkaisu', default: '0' },
            { name: 'yhteisjulkaisuyrityksenkanssa', default: '0' },
            { name: 'doitunniste', default: '' },
            { name: 'pysyvaverkkoosoite', default: '' },
            { name: 'avoinsaatavuus', default: '' },
            { name: 'julkaisurinnakkaistallennettu', default: '0' },
            { name: 'rinnakkaistallennetunversionverkkoosoite', default: '' },
            { name: 'lisatieto', default: '' },
            { name: 'jufotunnus', default: '' },
            { name: 'jufoluokitus', default: '' },
            { name: 'julkaisuntila', default: '' },
            { name: 'julkaisumaksu', default: null },
            { name: 'julkaisumaksuvuosi', default: null },
            { name: 'username', default: ''},
            { name: 'modified', default: null },
            { name: 'projektinumero', default: null } // array
          ]
        },
        // 'avainsana': {
        //   name: 'avainsana',
        //   ui: 'avainsana', // lista
        //   pkcol: 'id',
        //   columns: [
        //     { name: 'id', default: null },
        //     { name: 'julkaisuid', default: null },
        //     { name: 'avainsana', default: '' }
        //   ]
        // },
        'organisaatiotekija': {
          name: 'organisaatiotekija',
          ui: 'organisaatiotekija', // lista
          pkcol: 'id',
          columns: [
            { name: 'id', default: null },
            // { name: 'julkaisuid', default: null },
            { name: 'etunimet', default: '' },
            { name: 'sukunimi', default:'' },
            { name: 'orcid', default: '' },
            { name: 'hrnumero', default: null },
            { name: 'rooli', default: null }
          ]
        },
        'alayksikko': {
          name: 'alayksikko',
          ui: 'alayksikko', // lista
          pkcol: 'id',
          columns: [
            { name: 'id', default: null },
            { name: 'organisaatiotekijaid', default: null },
            { name: 'alayksikko', default: '' }
          ]
        },
        'tieteenala': {
          name: 'tieteenala',
          ui: 'tieteenala', // lista
          pkcol: 'id',
          columns: [
            { name: 'id', default: null },
            { name: 'julkaisuid', default: null },
            { name: 'tieteenalakoodi', default: '' },
            { name: 'jnro', default: null }
          ]
        },
        'taiteenala': {
          name: 'taiteenala',
          ui: 'taiteenala', // lista
          pkcol: 'id',
          columns: [
            { name: 'id', default: null },
            { name: 'julkaisuid', default: null },
            { name: 'taiteenalakoodi', default: '' },
            { name: 'jnro', default: null }
          ]
        },
          "julkaisuarkisto": {
              columns: [
                  { name: 'abstract', default: undefined },
                  { name: 'embargo', default: undefined },
                  { name: 'filename', default: undefined },
                  { name: 'julkaisuid', default: undefined },
                  { name: 'oikeudet', default: undefined },
                  { name: 'urn', default: undefined },
                  { name: 'versio', default: undefined, },
                  { name: 'julkaisusarja', default: undefined, }
              ]
          }
        // 'lisatieto': {
        //   name: 'lisatieto',
        //   ui: 'lisatieto',
        //   pkcol: 'id',
        //   columns: [
        //     { name: 'id', default: null },
        //     { name: 'julkaisuid', default: null },
        //     { name: 'julkaisuvuodenlisatieto', default: '' },
        //     { name: 'tapahtuma', default: '' },
        //     { name: 'julkistamispaikkakunta', default: '' },
        //     { name: 'muutunniste', default: '' }
        //   ]
        // }
      }
    };


    /* CREATE :: POST */
    this.post = function(api, str) {
      return $http({
        method: 'POST',
        url: API_BASE_URL + api,
        data: str,
        headers: { 'Content-Type': 'application/json' }
      })
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        console.log(response);
        $log.error('post ERROR ' + response.status + ' ' + response.data);
        return response;
      });
    };

    /* READ :: GET */
    this.get = function (api, id) {

      return $http({
        method: 'GET',
        url:  API_BASE_URL + 'julkaisut' + '/' + api + (id ? '/' + id : ''),
      })
      .then(function (response) {
        return response.data;
      });
    };

      this.getPublicationList = function (api, code, odottavat, currentPage) {

      /*
          Organisation code is optional, if missing return data from all organisations.
          This functionality is possible for owners only
       */

      return $http({
          method: 'GET',
          url:  API_BASE_URL + 'julkaisut' + '/' + api + (code ? '/' + code : ''),
          params: { odottavat: odottavat, currentPage: currentPage }
      })
          .then(function (response) {
              let ret = {
                data: response.data.data,
                count:  response.headers('TotalCount')
              };
              return ret
          });
      };


      this.getSearchResults = function (api, code, currentPage, searchParameters) {

          /*
              Organisation code is optional, if missing return data from all organisations.
              This functionality is possible for owners only
           */

          return $http({
              method: 'GET',
              url:  API_BASE_URL + 'julkaisut' + '/' + api + (code ? '/' + code : ''),
              params: { currentPage: currentPage,
                        nimiTekija: searchParameters.vapaasanahaku,
                        julkaisuVuosi: searchParameters.julkaisuvuosi,
                        julkaisunTila: searchParameters.julkaisuntila }
          })
              .then(function (response) {
                  let ret = {
                      data: response.data.data,
                      count:  response.headers('TotalCount')
                  };
                  return ret
              });
      };

    /* UPDATE :: PUT */
    this.put = function (path, id, data, filedata) {

      if (filedata) {
        data["filedata"] = filedata;
      }
      return $http({
        method: 'PUT',
        url: API_BASE_URL + path + '/' + id,
        data: data,
        headers: { 'Content-Type': 'application/json' }
      })
      .then(function (response) {
          return response;
      })
      .catch(function (response) {
        $log.error('put ERROR ' + response.status + ' ' + response.data);
        return response;
      });
    };



    /* DELETE :: DELETE */
    this.delete = function (id) {
      return $http({
        method: 'DELETE',
        url: API_BASE_URL + 'julkaisu/poista/' + id
      })
      .then(function (response) {
        return response;
      })
      .catch(function (response) {
        // $log.error('delete ERROR ' + response.status + ' ' + response.data);
        return response;
      });
    };

    this.postJulkaisu = function(data, file) {

        console.log(data);
          return Upload.upload({
              url: API_BASE_URL + 'julkaisu/upload',
              data: { file: file, data: data },
              method: 'POST',
              headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then(function (resp) {
             return resp;
          }, function (resp) {
              console.log(resp.status);
              // $log.error('Error status: ' + resp.status);
              // $log.error('Error message: ' + resp.data);
              return resp;
          });

    };
  }
]);
