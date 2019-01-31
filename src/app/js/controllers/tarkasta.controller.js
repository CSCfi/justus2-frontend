'use strict'

angular.module('TarkastaController', [])
    .controller('TarkastaController', [
        '$rootScope', '$scope', '$http', '$state', '$location', '$log', '$timeout', 'APIService', 'KoodistoService', 'DataStoreService',
        function ($rootScope, $scope, $http, $state, $location, $log, $timeout, APIService, KoodistoService, DataStoreService) {
            $scope.meta = APIService.meta;
            $scope.data = [];
            $scope.colOrder = 'modified';
            $scope.colOrderReverse = true;
            $scope.totalItems = 0;
            $scope.query = APIService.restoreQuery();
            $scope.loading = {};

            $scope.setPageSize = function (pageSize) {
                $scope.query.pageSize = pageSize;
            };

            $scope.csvExportHeader = [
                'Julkaisun ID',
                'Organisaatiotunnus',
                'Julkaisutyyppi',
                'Julkaisun tila',
                'Julkaisuvuosi',
                'Julkaisun nimi',
                'Julkaisun tekijöiden lukumäärä',
                'Tekijätiedot',
                'Lehden/sarjan nimi',
                'Kustantaja',
                'Julkaisun kustannuspaikka',
                'Julkaisumaa',
                'Julkaisun kieli',
                'Volyymi',
                'Numero',
                'Sivut',
                'Artikkelinumero',
                'ISSN',
                'ISBN',
                'Konferenssin vakiintunut nimi',
                'Emojulkaisun nimi',
                'Emojulkaisun toimittajat',
                'Julkistamispaikkakunta',
                'Tapahtuma',
                'Julkaisun kansainvälisyys',
                'Kansainvälinen yhteisjulkaisu',
                'DOI-tunniste',
                'Muu tunniste',
                'Pysyvä verkko-osoite',
                'Rinnakkaistallennetun version verkko-osoite',
                'Avoin saatavuus',
                'Avainsanat',
                'Lisätieto',
                'Julkaisuvuoden lisätieto',
                'Julkaisun tieteenala 1',
                'Julkaisun tieteenala 2',
                'Julkaisun tieteenala 3',
                'Julkaisun tieteenala 4',
                'Julkaisun tieteenala 5',
                'Julkaisun tieteenala 6',
                'Julkaisun taiteenalat',
                'Taidealan tyyppikategoriat',
                'Organisaation tekijä 1',
                'Alayksikkö 1',
                'ORCID 1',
                'Rooli 1',
                'Organisaation tekijä 2',
                'Alayksikkö 2',
                'ORCID 2',
                'Rooli 2',
                'Organisaation tekijä 3',
                'Alayksikkö 3',
                'ORCID 3',
                'Rooli 3',
                'Organisaation tekijä 4',
                'Alayksikkö 4',
                'ORCID 4',
                'Rooli 4',
                'Organisaation tekijä 5',
                'Alayksikkö 5',
                'ORCID 5',
                'Rooli 5',
                'Organisaation tekijä 6',
                'Alayksikkö 6',
                'ORCID 6',
                'Rooli 6',
                'Organisaation tekijä 7',
                'Alayksikkö 7',
                'ORCID 7',
                'Rooli 7',
                'Organisaation tekijä 8',
                'Alayksikkö 8',
                'ORCID 8',
                'Rooli 8',
                'Organisaation tekijä 9',
                'Alayksikkö 9',
                'ORCID 9',
                'Rooli 9',
                'Organisaation tekijä 10',
                'Alayksikkö 10',
                'ORCID 10',
                'Rooli 10',
                'Organisaation tekijä 11',
                'Alayksikkö 11',
                'ORCID 11',
                'Rooli 11',
                'Organisaation tekijä 12',
                'Alayksikkö 12',
                'ORCID 12',
                'Rooli 12',
                'Organisaation tekijä 13',
                'Alayksikkö 13',
                'ORCID 13',
                'Rooli 13',
                'Organisaation tekijä 14',
                'Alayksikkö 14',
                'ORCID 14',
                'Rooli 14',
                'Organisaation tekijä 15',
                'Alayksikkö 15',
                'ORCID 15',
                'Rooli 15',
                'Organisaation tekijä 16',
                'Alayksikkö 16',
                'ORCID 16',
                'Rooli 16',
                'Organisaation tekijä 17',
                'Alayksikkö 17',
                'ORCID 17',
                'Rooli 17',
                'Organisaation tekijä 18',
                'Alayksikkö 18',
                'ORCID 18',
                'Rooli 18',
                'Organisaation tekijä 19',
                'Alayksikkö 19',
                'ORCID 19',
                'Rooli 19',
                'Organisaation tekijä 20',
                'Alayksikkö 20',
                'ORCID 20',
                'Rooli 20'
            ];

            // Hide button from My publications
            $scope.getCsvExportFile = function () {

                $scope.loading.csv = true;

                return APIService.get("lista/all")
                    .then(function (response) {
                        $scope.all = response.data;
                        return response.data;
                    }).catch(function (error) {
                    console.log(error)
                }).then(function (value) {
                    return Promise.map(value, function (publication) {
                        return {
                        'Julkaisun ID': publication.julkaisu.id,
                        'Organisaatiotunnus': publication.julkaisu.organisaatiotunnus,
                        'Julkaisutyyppi': publication.julkaisu.julkaisutyyppi,
                        'Julkaisun tila': publication.julkaisu.julkaisuntila,
                        'Julkaisuvuosi': publication.julkaisu.julkaisuvuosi,
                        'Julkaisun nimi': publication.julkaisu.julkaisunnimi,
                        'Julkaisun tekijöiden lukumäärä': publication.julkaisu.julkaisuntekijoidenlukumaara,
                        'Tekijätiedot': publication.julkaisu.tekijat,
                        'Lehden/sarjan nimi': publication.julkaisu.lehdenjulkaisusarjannimi,
                        'Kustantaja': publication.julkaisu.kustantaja,
                        'Julkaisun kustannuspaikka': publication.julkaisu.julkaisunkustannuspaikka,
                        'Julkaisumaa': publication.julkaisu.julkaisumaa,
                        'Julkaisun kieli': publication.julkaisu.julkaisunkieli,
                        'Volyymi': publication.julkaisu.volyymi,
                        'Numero': publication.julkaisu.numero,
                        'Sivut': publication.julkaisu.sivut,
                        'Artikkelinumero': publication.julkaisu.artikkelinumero,
                        'ISSN': publication.julkaisu.issn,
                        'ISBN': publication.julkaisu.isbn,
                        'Konferenssin vakiintunut nimi': publication.julkaisu.konferenssinvakiintunutnimi,
                        'Emojulkaisun nimi': publication.julkaisu.emojulkaisunnimi,
                        'Emojulkaisun toimittajat': publication.julkaisu.emojulkaisuntoimittajat,
                        'Julkistamispaikkakunta': getLisatieto(publication, "julkistamispaikkakunta"),
                        'Tapahtuma': getLisatieto(publication, "tapahtuma"),
                        'Julkaisun kansainvälisyys': publication.julkaisu.julkaisunkansainvalisyys,
                        'Kansainvälinen yhteisjulkaisu': publication.julkaisu.kansainvalinenyhteisjulkaisu,
                        'DOI-tunniste': publication.julkaisu.doitunniste,
                        'Muu tunniste': getLisatieto(publication, "muutunniste"),
                        'Pysyvä verkko-osoite': publication.julkaisu.pysyvaverkkoosoite,
                        'Rinnakkaistallennetun version verkko-osoite': publication.julkaisu.rinnakkaistallennetunversionverkkoosoite,
                        'Avoin saatavuus': publication.julkaisu.avoinsaatavuus,
                        'Avainsanat': publication.avainsanat,
                        'Lisätieto': publication.julkaisu.lisatieto,
                        'Julkaisuvuoden lisätieto': getLisatieto(publication, "julkaisuvuodenlisatieto"),
                        'Julkaisun tieteenala 1': getTieteenala(publication.tieteenala, 1),
                        'Julkaisun tieteenala 2': getTieteenala(publication.tieteenala, 2),
                        'Julkaisun tieteenala 3': getTieteenala(publication.tieteenala, 3),
                        'Julkaisun tieteenala 4': getTieteenala(publication.tieteenala, 4),
                        'Julkaisun tieteenala 5': getTieteenala(publication.tieteenala, 5),
                        'Julkaisun tieteenala 6': getTieteenala(publication.tieteenala, 6),
                        'Julkaisun taiteenalat': getTaiteenalat(publication.taiteenala),
                        'Taidealan tyyppikategoriat': getTyyppikategoriat(publication.taidealantyyppikategoria),
                        'Organisaation tekijä 1': getOrganisaatioTekijat(publication.organisaatiotekija, 1),
                        'Alayksikkö 1': getAlayksikko(publication.organisaatiotekija, 1),
                        'ORCID 1': getOrcid(publication.organisaatiotekija, 1),
                        'Rooli 1': getRooli(publication.organisaatiotekija, 1),
                        'Organisaation tekijä 2': getOrganisaatioTekijat(publication.organisaatiotekija, 2),
                        'Alayksikkö 2': getAlayksikko(publication.organisaatiotekija, 2),
                        'ORCID 2': getOrcid(publication.organisaatiotekija, 2),
                        'Rooli 2': getRooli(publication.organisaatiotekija, 2),
                        'Organisaation tekijä 3': getOrganisaatioTekijat(publication.organisaatiotekija, 3),
                        'Alayksikkö 3': getAlayksikko(publication.organisaatiotekija, 3),
                        'ORCID 3': getOrcid(publication.organisaatiotekija, 3),
                        'Rooli 3': getRooli(publication.organisaatiotekija, 3),
                        'Organisaation tekijä 4': getOrganisaatioTekijat(publication.organisaatiotekija, 4),
                        'Alayksikkö 4': getAlayksikko(publication.organisaatiotekija, 4),
                        'ORCID 4': getOrcid(publication.organisaatiotekija, 4),
                        'Rooli 4': getRooli(publication.organisaatiotekija, 4),
                        'Organisaation tekijä 5': getOrganisaatioTekijat(publication.organisaatiotekija, 5),
                        'Alayksikkö 5': getAlayksikko(publication.organisaatiotekija, 5),
                        'ORCID 5': getOrcid(publication.organisaatiotekija, 5),
                        'Rooli 5': getRooli(publication.organisaatiotekija, 5),
                        'Organisaation tekijä 6': getOrganisaatioTekijat(publication.organisaatiotekija, 6),
                        'Alayksikkö 6': getAlayksikko(publication.organisaatiotekija, 6),
                        'ORCID 6': getOrcid(publication.organisaatiotekija, 6),
                        'Rooli 6': getRooli(publication.organisaatiotekija, 6),
                        'Organisaation tekijä 7': getOrganisaatioTekijat(publication.organisaatiotekija, 7),
                        'Alayksikkö 7': getAlayksikko(publication.organisaatiotekija, 7),
                        'ORCID 7': getOrcid(publication.organisaatiotekija, 7),
                        'Rooli 7': getRooli(publication.organisaatiotekija, 7),
                        'Organisaation tekijä 8': getOrganisaatioTekijat(publication.organisaatiotekija, 8),
                        'Alayksikkö 8': getAlayksikko(publication.organisaatiotekija, 8),
                        'ORCID 8': getOrcid(publication.organisaatiotekija, 8),
                        'Rooli 8': getRooli(publication.organisaatiotekija, 8),
                        'Organisaation tekijä 9': getOrganisaatioTekijat(publication.organisaatiotekija, 9),
                        'Alayksikkö 9': getAlayksikko(publication.organisaatiotekija, 9),
                        'ORCID 9': getOrcid(publication.organisaatiotekija, 9),
                        'Rooli 9': getRooli(publication.organisaatiotekija, 9),
                        'Organisaation tekijä 10': getOrganisaatioTekijat(publication.organisaatiotekija, 10),
                        'Alayksikkö 10': getAlayksikko(publication.organisaatiotekija, 10),
                        'ORCID 10': getOrcid(publication.organisaatiotekija, 10),
                        'Rooli 10': getRooli(publication.organisaatiotekija, 10),
                        'Organisaation tekijä 11': getOrganisaatioTekijat(publication.organisaatiotekija, 11),
                        'Alayksikkö 11': getAlayksikko(publication.organisaatiotekija, 11),
                        'ORCID 11': getOrcid(publication.organisaatiotekija, 11),
                        'Rooli 11': getRooli(publication.organisaatiotekija, 11),
                        'Organisaation tekijä 12': getOrganisaatioTekijat(publication.organisaatiotekija, 12),
                        'Alayksikkö 12': getAlayksikko(publication.organisaatiotekija, 12),
                        'ORCID 12': getOrcid(publication.organisaatiotekija, 12),
                        'Rooli 12': getRooli(publication.organisaatiotekija, 12),
                        'Organisaation tekijä 13': getOrganisaatioTekijat(publication.organisaatiotekija, 13),
                        'Alayksikkö 13': getAlayksikko(publication.organisaatiotekija, 13),
                        'ORCID 13': getOrcid(publication.organisaatiotekija, 13),
                        'Rooli 13': getRooli(publication.organisaatiotekija, 13),
                        'Organisaation tekijä 14': getOrganisaatioTekijat(publication.organisaatiotekija, 14),
                        'Alayksikkö 14': getAlayksikko(publication.organisaatiotekija, 14),
                        'ORCID 14': getOrcid(publication.organisaatiotekija, 14),
                        'Rooli 14': getRooli(publication.organisaatiotekija, 14),
                        'Organisaation tekijä 15': getOrganisaatioTekijat(publication.organisaatiotekija, 15),
                        'Alayksikkö 15': getAlayksikko(publication.organisaatiotekija, 15),
                        'ORCID 15': getOrcid(publication.organisaatiotekija, 15),
                        'Rooli 15': getRooli(publication.organisaatiotekija, 15),
                        'Organisaation tekijä 16': getOrganisaatioTekijat(publication.organisaatiotekija, 16),
                        'Alayksikkö 16': getAlayksikko(publication.organisaatiotekija, 16),
                        'ORCID 16': getOrcid(publication.organisaatiotekija, 16),
                        'Rooli 16': getRooli(publication.organisaatiotekija, 16),
                        'Organisaation tekijä 17': getOrganisaatioTekijat(publication.organisaatiotekija, 17),
                        'Alayksikkö 17': getAlayksikko(publication.organisaatiotekija, 17),
                        'ORCID 17': getOrcid(publication.organisaatiotekija, 17),
                        'Rooli 17': getRooli(publication.organisaatiotekija, 17),
                        'Organisaation tekijä 18': getOrganisaatioTekijat(publication.organisaatiotekija, 18),
                        'Alayksikkö 18': getAlayksikko(publication.organisaatiotekija, 18),
                        'ORCID 18': getOrcid(publication.organisaatiotekija, 18),
                        'Rooli 18': getRooli(publication.organisaatiotekija, 18),
                        'Organisaation tekijä 19': getOrganisaatioTekijat(publication.organisaatiotekija, 19),
                        'Alayksikkö 19': getAlayksikko(publication.organisaatiotekija, 19),
                        'ORCID 19': getOrcid(publication.organisaatiotekija, 19),
                        'Rooli 19': getRooli(publication.organisaatiotekija, 19),
                        'Organisaation tekijä 20': getOrganisaatioTekijat(publication.organisaatiotekija, 20),
                        'Alayksikkö 20': getAlayksikko(publication.organisaatiotekija, 20),
                        'ORCID 20': getOrcid(publication.organisaatiotekija, 20),
                        'Rooli 20': getRooli(publication.organisaatiotekija, 20)
                        };
                    })
                })
                .then(function (data) {
                    $scope.loading.csv = false;
                    return data;
                });
            };

            let getAlayksikko = function (data, val) {
                if (data === null || typeof data === 'undefined') {
                    return;
                } else if (data[val - 1]) {
                    return data[val - 1].alayksikko;
                }
            };

            let getOrganisaatioTekijat = function (data, val) {
                if (typeof data === 'undefined') {
                    return;
                } else if (data[val - 1]) {
                    return data[val - 1].sukunimi + ', ' + data[val - 1].etunimet;
                } else {
                    return;
                }
            };

            let getOrcid = function (data, val) {
                if (!data[val-1]) {
                    return;
                } else if (data[val - 1].orcid) {
                    return data[val - 1].orcid;
                } else {
                    return;
                }
            };

            let getTieteenala = function (data, val) {
                if (!data || !data[0]) {
                    return;
                } else if (data[val - 1] && data[val - 1].jnro) {
                    const tieteenala = data[val-1].tieteenalakoodi;
                    const selite = $scope.getSelite($scope.codes.tieteenalat, tieteenala);
                    if (!tieteenala) {
                        return;
                    }
                    return tieteenala + ' ' + selite;
                } else {
                    return;
                }
            };

            let getTaiteenalat = function (data) {
                if (!data) {
                    return;
                } else if (data[0]) {
                    const taiteenalat = [];
                    for (let i = 0; i < data.length; i++) {
                        taiteenalat.push(data[i].taiteenalakoodi + ' ' + $scope.getSelite($scope.codes.taiteenalat, data[i].taiteenalakoodi));
                    }
                    return taiteenalat.join('; ');
                } else {
                    return;
                }
            };

            let getTyyppikategoriat = function (data) {
                if (!data) {
                    return;
                } else if (data[0]) {
                    const tyyppikategoriat = [];
                    for (let i = 0; i < data.length; i++) {
                        tyyppikategoriat.push(data[i] + ' ' + $scope.getSelite($scope.codes.taidealantyypit, data[i]));
                    }
                    return tyyppikategoriat.join('; ');
                } else {
                    return;
                }
            };

            let getRooli = function (data, val) {
                if (!data[val-1]) {
                    return;
                } else if (data[val - 1].rooli) {
                    let rooli = $scope.getSelite($scope.codes.julkaisuntekijanrooli, data[val - 1].rooli);
                    return rooli;
                } else {
                    return;
                }
            };

            let getLisatieto = function (data, text) {
                if (!data.lisatieto) {
                    return;
                }
                if (!data.lisatieto[text]) { return; }
                else {
                    return data.lisatieto[text];
                }
            };

            $scope.editPublication = function (d) {
                if ($scope.state.name === 'omat' && d.julkaisuntila) {
                    return;
                } else {
                    DataStoreService.storeStateData($scope.state.name);
                    DataStoreService.storeBooleanforOdottavat($scope.odottavat);
                    $location.path('/justus').search({id: d.id, vaihe: 4});
                }
            };


            $scope.getSelite = function(codeset, value) {
                return KoodistoService.getSelite(codeset, value)
            };

            $scope.updatePublication = function (julkaisu, julkaisuntila) {
                if (julkaisu && julkaisu.id) {
                    julkaisu.username = $rootScope.user.name;
                    julkaisu.modified = new Date();
                    const julkaisuCopy = angular.copy(julkaisu);
                    delete julkaisuCopy.id; // api doesn't like primary key in data
                    delete julkaisuCopy.ui_julkaisuntila;
                    julkaisuCopy.julkaisuntila = julkaisuntila;
                    let data = { "julkaisuntila": julkaisuntila, "username": $rootScope.user.name, "modified": new Date() };
                    APIService.put('julkaisuntila', julkaisu.id, data);
                }
            };

            $scope.usePoista = function (table, id) {
                APIService.delete(table, id);
                // delete from scope
                delete $scope.data[table][id];
            };

            $scope.loadPublications = function () {
                $scope.loading.publications = true;

                // Update current query to url and restore any missing parameters
                $location.search($scope.query);

                $scope.data['julkaisu'] = [];
                // limit fetched rows by organisaatiotunnus
                const organisationCode = $rootScope.user.organization.code !== '00000' ? $rootScope.user.organization.code : null;

                APIService.get("lista", organisationCode)
                    .then(function (obj) {
                        $scope.totalItems = obj.totalItems || 0;

                        return Promise.map(obj.data, function (o, k) {
                            // NB! API returns '2017-03-24 12:37:47.18+02'
                            // => convert string first (as illustrated in http://dygraphs.com/date-formats.html)

                            // if (o.modified) {
                            //     let m = o.modified;
                            //     m = m.replace(/-/g, '/'); // date separator to '/'
                            //     m = m.replace(/-/g, '/'); // date separator to '/'
                            //     m = m.replace(/\..*$/, ''); // strip milliseconds away
                            //     m = m.replace(/\+.*$/, ''); // strip timezone
                            //     o.modified = new Date(m);
                            // }
                            o.julkaisu.ui_julkaisuntila = o.julkaisu.julkaisuntila;
                            $scope.data['julkaisu'].push(o.julkaisu);
                        });
                    })
                    .then(function () {
                        $scope.loading.publications = false;
                    })
                    .catch(function (err) {
                        $log.error(err);
                    });



            };

            // $scope.getData = function (table) {
            //   return APIService.get(table, val, col, null);
            // };

            $scope.resetData = function () {
                $scope.loadPublications();
            };

            $scope.showRejectedPublications = function () {
                if ($scope.showRejected) {
                    $scope.showRejected = false;
                    $scope.showhide = $scope.i18n.content.tarkasta.hylatyt.nayta;

                } else {
                    $scope.showRejected = true;
                    $scope.showhide = $scope.i18n.content.tarkasta.hylatyt.piilota;
                }
            };

            let init = function () {
                // at very first test that user object is accessible
                if (!$scope.hasAccess($scope.state.name)) {
                    $state.go('index');
                    // stop initializing
                    return;
                }
                $scope.resetData();
                $scope.showRejected = false;
                $scope.showhide = $scope.i18n.content.tarkasta.hylatyt.nayta;

                if (DataStoreService.getBooleanForOdottavat() === false) {
                    $scope.odottavat = false;
                    DataStoreService.storeBooleanforOdottavat(null);
                } else {
                    $scope.odottavat = true;
                }
            };

            init();
        }
    ]);
