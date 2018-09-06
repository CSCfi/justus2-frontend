'use strict';

angular.module('JustusController', [])
    .controller('JustusController', [
        '$rootScope', '$scope', '$log', '$http', '$state', '$stateParams', 'CrossRefService', 'VIRTAService',
        'JUFOService', 'FintoService', 'KoodistoService', 'JustusService', 'APIService', 'ValidationService', 'DataStoreService', 'DEMO_ENABLED',
        function($rootScope, $scope, $log, $http, $state, $stateParams, CrossRefService, VIRTAService,
                 JUFOService, FintoService, KoodistoService, JustusService, APIService, ValidationService, DataStoreService, DEMO_ENABLED) {
            $scope.loading = {};
            $scope.meta = APIService.meta;

            $scope.justus = JustusService.getPublicationFormData();

            $scope.pattern = JustusService.pattern;

            $scope.tekijatTags = [];
            $scope.avainsanatTags = [];
            $scope.lehtinimet = [];
            $scope.kustantajanimet = [];
            $scope.konferenssinimet = [];
            $scope.julkaisunnimet = [];

            $scope.crossrefLataa = false;
            $scope.virtaLataa = false;
            $scope.requiredHighlight = false;
            $scope.invalidFields = [];

            $scope.julkaisu = {};

            // Parses first- and lastnames from a string of names and returns them in a list of objects [{ firstName: '', lastName: '' }, ...]
            const parseNames = function(namesString) {
                const parsedNames = [];
                if (namesString && namesString.length > 0) {
                    const namePairs = namesString.split(';');

                    namePairs.map(function(namePair) {
                        const splittedNames = namePair.split(',');
                        parsedNames.push({
                            lastName: splittedNames[0] ? splittedNames[0].trim() : '',
                            firstName: splittedNames[1] ? splittedNames[1].trim() : ''
                        });
                    });
                }

                return parsedNames;
            };

            $scope.clearFormAndReturnToStart = function() {
                JustusService.clearPublicationForm();
                $scope.justus = JustusService.getPublicationFormData();
                $scope.julkaisutyyppi = null;
                $scope.julkaisutyyppi_paa = null;
                $scope.tekijatTags = [];
                $scope.avainsanatTags = [];
                $scope.lehtinimet = [];
                $scope.kustantajanimet = [];
                $scope.konferenssinimet = [];
                $scope.julkaisunnimet = [];
                $scope.julkaisu = {};
                $scope.crossrefLataa = false;
                $scope.virtaLataa = false;
                $scope.requiredHighlight = false;
                $scope.invalidFields = [];
                fillMissingJustusLists();
                $scope.useVaihe(1);
            };

            $scope.useTekijat = function() {

                // Add space after each comma if none entered
                $scope.tekijatTags = $scope.tekijatTags.map(function(tag, index) {
                    if (tag.text && tag.text.indexOf(', ') === -1) {
                        tag.text = tag.text.replace(',', ', ');
                    }
                    return tag;
                });

                $scope.justus.julkaisu.tekijat = '';
                $scope.justus.julkaisu.tekijat = $scope.tekijatTags.map(function(tag, index) {
                    return tag.text;
                }).join('; ');
                $scope.justus.julkaisu.julkaisuntekijoidenlukumaara = $scope.tekijatTags.length;
            };

            $scope.useKopioiTekijat = function(input) {
                var tempstr = input;
                for (var i = 0; i < $scope.justus.julkaisu.julkaisuntekijoidenlukumaara; i++) {
                    var sb = 0;
                    var se = tempstr.indexOf(',');
                    var eb = tempstr.indexOf(',') + 1;
                    var ee = tempstr.indexOf(';') >= 0 ? tempstr.indexOf(';') : tempstr.length;
                    $scope.justus.organisaatiotekija[i] = {};
                    $scope.justus.organisaatiotekija[i].sukunimi = tempstr.substring(sb, se).trim();
                    $scope.justus.organisaatiotekija[i].etunimet = tempstr.substring(eb, ee).trim();
                    $scope.justus.organisaatiotekija[i].alayksikko = [''];
                    tempstr = tempstr.substring(ee + 1);
                }
            };

            $scope.useOrganisaatiotekijaAlayksikko = function(parIndex, index, input) {
                $scope.justus.organisaatiotekija[parIndex].alayksikko[index] = input;
            };

            $scope.useOrganisaatiotekijaRooli = function(parIndex, input) {
                $scope.justus.organisaatiotekija[parIndex].rooli = input.arvo;
            };

            $scope.useJulkaisutyyppiPaa = function(input) {
                if (!input) return;
                $scope.julkaisutyyppi_paa = input;
            };

            $scope.addOrganisaatiotekija = function () {
                $scope.justus.organisaatiotekija.push(
                    {
                        "etunimet": "",
                        "sukunimi": "",
                        "orcid": "",
                        "rooli": "",
                        "alayksikko": [null]
                    }
                )
            };

            // three different sources, 1 for julkaisusarja, 2 for kustantaja, 3 for konferenssin vakiintunut nimi
            $scope.refreshKanavanimet = function(tyyppi, input) {


                if (tyyppi == null) return;
                if (input == null) return;
                if (input.length < 5) return [];

                if (tyyppi === 1) {
                    return JUFOService.etsiJulkaisuSarjanNimi(input)
                        .then(function (response) {
                            if (angular.isArray(response.data)) {
                                $scope.lehtinimet = response.data;
                                return response.data;
                            }
                        });
                }

                if (tyyppi === 2) {
                    return JUFOService.etsiKustantaja(input)
                        .then(function (response) {
                            if (angular.isArray(response.data)) {
                                $scope.kustantajanimet = response.data;
                                return response.data;
                            }
                        });
                }

                if (tyyppi === 3) {
                    return JUFOService.etsiKonferenssinVakiintunutNimi(input)
                        .then(function (response) {
                            if (angular.isArray(response.data)) {
                                $scope.konferenssinimet = response.data;
                                return response.data;
                            }
                        });
                }
            };

            // kutsutaan lehden / julkaisusarjan nimestä jos löytyy
            $scope.useLehtisarja = function(input) { // jufo_id
                if (input === null) return;
                JUFOService.kanava(input)
                    .then(function (obj) {
                        $scope.justus.julkaisu.lehdenjulkaisusarjannimi = obj.Name;
                        $scope.justus.julkaisu.jufotunnus = input; // tai vastauksesta...
                        $scope.justus.julkaisu.jufoluokitus = obj.Level;
                        if (obj.ISSN1) $scope.justus.julkaisu.issn = obj.ISSN1;
                        if ($scope.justus.julkaisu.issn === null || $scope.justus.julkaisu.issn === '') {
                            if (obj.ISSN2) $scope.justus.julkaisu.issn = obj.ISSN2;
                        }
                        if (obj.Publisher) {
                            $scope.justus.julkaisu.kustantaja = obj.Publisher
                            // 'html unescape'
                                .replace(/&quot;/g, '"')
                                .replace(/&#39;/g, "'")
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>')
                                .replace(/&amp;/g, '&');
                        }
                    });
            };

            //tätä kutsutaan kahdesta paikasta, tarkista että molemmat toimi
            $scope.fetchLehtisarja = function(input) { // issn
                if (input == null) return;

                // tämä uuteen restiin
                JUFOService.etsiissn(input)
                    .then(function (response) {
                        var jobj = response.data;
                        var jufotunnus = jobj && jobj.length > 0 ? jobj[0].Jufo_ID : null; // voisi asettaa jo scopeen, mutta seuraavassa kutsussa
                        $scope.useLehtisarja(jufotunnus); // vain issn?
                        $scope.lehtinimet.selected = jobj && jobj.length > 0 ? jobj[0] : null;
                    });
            };

            $scope.refreshJulkaisunnimet = function(input, tekija) {
                if (input === null) return;
                if (input.length < 3) return;

                $scope.julkaisunnimet = [];
                // CrossRef :: haku julkaisun nimellä, mutta voi olla myös tekijän nimi
                $scope.crossrefLataa = true;
                CrossRefService.worksquery(input, tekija)
                    .then(function(obj) {
                        $scope.julkaisunnimet = $scope.julkaisunnimet.concat(obj);
                        $scope.crossrefLataa = false;
                    });

                // VIRTA :: haku julkaisun nimellä, mutta voi olla myös tekijän nimi
                $scope.virtaLataa = true;
                VIRTAService.fetch(input, tekija)
                    .then(function (obj) {
                        $scope.julkaisunnimet = $scope.julkaisunnimet.concat(obj);
                        $scope.virtaLataa = false;
                    });
            };

            $scope.useJulkaisunnimi = function(source, input) { // input == identifier

                if (!source || !input) return;

                if (source === 'CrossRef') {
                    $scope.crossrefLataa = true;
                    CrossRefService.works(input)
                        .then(function successCb(response) {
                            angular.forEach(response.data, function(robj, rkey) {
                                $scope.justus.julkaisu.doitunniste = input;
                                if (robj.title) {
                                    if (typeof robj.title === 'object' && robj.title.length > 0) {
                                        $scope.justus.julkaisu.julkaisunnimi = robj.title[0];
                                    }
                                    else {
                                        $scope.justus.julkaisu.julkaisunnimi = robj.title;
                                    }
                                }
                                if (robj.ISSN) {
                                    if (typeof robj.ISSN === 'object' && robj.ISSN.length > 0) {
                                        $scope.justus.julkaisu.issn = robj.ISSN[0];
                                    }
                                    else {
                                        $scope.justus.julkaisu.issn = robj.ISSN;
                                    }
                                }
                                $scope.justus.julkaisu.volyymi = robj.volume || '';
                                $scope.justus.julkaisu.numero = robj.issue || '';
                                $scope.justus.julkaisu.sivut = robj.page || '';
                                if (robj['article-number']) {
                                    $scope.justus.julkaisu.artikkelinumero = robj['article-number'];
                                }

                                var s = '';
                                angular.forEach(robj.author, function(aobj, akey) {
                                    if (s.length > 0) s += '; ';
                                    s += aobj.family + ', ' + aobj.given;
                                });
                                $scope.justus.julkaisu.tekijat = s;

                                // Initialize tekijatTags input
                                parseNames($scope.justus.julkaisu.tekijat).map(function(nameObject) {
                                    $scope.tekijatTags.push({ text: `${nameObject.lastName}, ${nameObject.firstName}` });
                                });
                                $scope.useTekijat();
                                if (robj.issued) {
                                    if (robj.issued['date-parts']) {
                                        s = '' + robj.issued['date-parts'];
                                        $scope.justus.julkaisu.julkaisuvuosi = s.split(',')[0];
                                    }
                                }
                                $scope.fetchLehtisarja($scope.justus.julkaisu.issn);
                                $scope.julkaisuhaettu = true;
                            });
                            $scope.crossrefLataa = false;
                            $scope.useVaihe(3); // ->tietojen syöttöön
                        }, function errorCb(response) {
                            $scope.julkaisuhaettu = false;
                            return false;
                        });
                }
                // Prefill publication from VIRTA
                if (source === 'VIRTA') {
                    $scope.virtaLataa = true;
                    VIRTAService.get(input)
                        .then(function successCb(response) {
                            let robj = response.data;
                            //  loop VIRTA services fields mapped to justus
                            angular.forEach(VIRTAService.fields, function(virta, justusFieldKey) {
                                if ((robj[virta.get] !== null || robj[virta.get] !== undefined) && justusFieldKey !== 'julkaisuntila') {
                                    $scope.useField(justusFieldKey, robj[virta.get]);
                                }
                            });

                            $scope.fetchLehtisarja($scope.justus.issn);
                            // Initialize tekijatTags input
                            parseNames($scope.justus.tekijat).map(function(nameObject) {
                                $scope.tekijatTags.push({ text: `${nameObject.lastName}, ${nameObject.firstName}` });
                            });
                            $scope.useTekijat();

                            let o = [];
                            if (robj['Tekijat']) {
                                if (robj.Tekijat['Tekija']) {
                                    let tmp = [];
                                    if (angular.isArray(robj.Tekijat.Tekija)) {
                                        tmp = robj.Tekijat.Tekija;
                                    }
                                    else {
                                        tmp.push(robj.Tekijat.Tekija);
                                    }
                                    angular.forEach(tmp, function(aobj, akey) {
                                        let a = [];
                                        if (aobj.Yksikot) {
                                            if (angular.isArray(aobj.Yksikot)) {
                                                angular.forEach(aobj.Yksikot, function(yobj, ykey) {
                                                    a.push({ alayksikko: yobj.YksikkoKoodi });
                                                });
                                            }
                                            else {
                                                a.push({ alayksikko: aobj.Yksikot.YksikkoKoodi });
                                            }
                                        }
                                        o.push({
                                            'sukunimi': aobj.Sukunimi,
                                            'etunimet': aobj.Etunimet,
                                            'orcid': null,
                                            'alayksikko': a
                                        });
                                    });
                                }
                            }
                            $scope.justus.organisaatiotekija = o;

                            let t = [];
                            if (robj['TieteenalaKoodit']) {
                                if (robj.TieteenalaKoodit['TieteenalaKoodi']) {
                                    let tmp = [];
                                    if (angular.isArray(robj.TieteenalaKoodit.TieteenalaKoodi)) {
                                        tmp = robj.TieteenalaKoodit.TieteenalaKoodi;
                                    }
                                    else {
                                        tmp.push(robj.TieteenalaKoodit.TieteenalaKoodi);
                                    }
                                    angular.forEach(tmp, function(tobj, tkey) {
                                        t.push({ 'tieteenalakoodi': '' + tobj.content, 'jnro': '' + tobj.JNro });
                                    });
                                }
                            }
                            $scope.justus.tieteenala = t;

                            // missing lists?
                            fillMissingJustusLists();

                            $scope.julkaisuhaettu = true;

                            $scope.virtaLataa = false;
                            $scope.useVaihe(3); // ->tietojen syöttöön
                        }, function errorCb(response) {
                            $log.debug('useJulkaisunnimi ' + source + ' ' + input + ' ei löytynyt!');
                            $scope.julkaisuhaettu = false;
                            return false;
                        });
                }

                $scope.initializeAvainsanatTags();
            };

            $scope.refreshAvainsanat = function(input) {
              if (input === null) return;
              if (input.length < 3) return [{ prefLabel: input, localname: input }];
                return FintoService.etsiAvainsanat(input, $scope.lang)
                    .then(function(tags) {
                        $scope.avainsanatLataa = false;
                        if (!tags || tags.length === 0) {
                            return [{ prefLabel: input, localname: input }];
                        }
                        return tags.data;
                    })
                    .catch(function() {
                        $log.debug('refreshAvainsanat ' + input + ' ei löytynyt!');
                        $scope.avainsanatLataa = false;
                        return [{ prefLabel: input, localname: input }];
                    });
            };

            $scope.addAvainsana = (tag) => {
                if(!$scope.justus.avainsanat) {
                    $scope.justus.avainsanat = [];
                }
                $scope.justus.avainsanat.push(
                    tag.prefLabel ? tag.prefLabel : tag
                );
            };

            $scope.removeAvainsana = function() {
                $scope.justus.avainsanat = [];
                $scope.justus.avainsanat = $scope.avainsanatTags.map(function(tag) {
                    return  tag.prefLabel;
                });
            };

            $scope.initializeAvainsanatTags = function() {
                if ($scope.justus.avainsanat) {
                    $scope.avainsanatTags = [];
                    $scope.justus.avainsanat.map(function(keywordObject) {
                        if (keywordObject.avainsanat.length > 0) {
                            $scope.avainsanatTags.push({
                                prefLabel: keywordObject.avainsana,
                                // Generate a mockup localname to be used as an unique key, since actual localname is not saved
                                localname: `${keywordObject.avainsana}_${(Math.random() * 1000).toString()}`
                            });
                        }
                    });
                }
            };

            $scope.useTieteenala = function(input) {
                if (input === null) return;

                if (!$scope.justus.tieteenala) {
                    $scope.justus.tieteenala = [];
                }

                // Selecting päätieteenala, filter alatieteenala input options
                if (input.arvo.length === 1) {
                    $scope.tieteenala_paa = input.arvo;
                    $scope.alatieteenalat = input.alatyypit;
                }
                // Otherwise selecting alatieteenala, add if not already found
                else if (!containsObject($scope.justus.tieteenala, input.arvo, 'tieteenalakoodi') && $scope.justus.tieteenala.length < 6) {
                    $scope.justus.tieteenala.push({
                        tieteenalakoodi: input.arvo,
                        jnro: ''
                    });
                }
            };

            $scope.useTaiteenala = function(input) {
                if (!$scope.justus.taiteenala) {
                    $scope.justus.taiteenala = [];
                }

                if (!containsObject($scope.justus.taiteenala, input, 'taiteenalakoodi')) {
                    $scope.justus.taiteenala.push({
                        taiteenalakoodi: input,
                        jnro: ''
                    });
                }
            };

            $scope.useTaidelanTyyppi = function(input) {

                if (!$scope.justus.taidealantyyppikategoria) {
                    $scope.justus.taidealantyyppikategoria = [];
                }
                if (!arrayContains($scope.justus.taidealantyyppikategoria, input) && $scope.justus.taidealantyyppikategoria.length <= 5) {
                    $scope.justus.taidealantyyppikategoria.push(input);
                }

            };

            const arrayContains = function (array, value) {
                let elementExists = false;
                for (let i = 0; i < array.length; i++) {
                    if(array[i].indexOf(value) !== -1 ) {
                        return true
                    }
                }
                return elementExists;
            };


            const containsObject = function(array, value, identifier) {
                let elementExists = false;
                array.forEach((item) => {
                    if (item[identifier] === value) {
                        elementExists = true;
                    }
                });
                return elementExists;
            };

            $scope.useVaihe = function(vaihe) {
                // Prevent user from navigating to vaihe 1 when editing a publication
                if ($scope.justus.julkaisu.id && vaihe === 1) {
                    return;
                }

                $scope.vaihe = vaihe;
                if ($scope.justus.julkaisu.julkaisutyyppi && $scope.justus.julkaisu.julkaisutyyppi.length > 1) {
                    // make sure both values are set (paa,ala):

                    $scope.useJulkaisutyyppiPaa($scope.justus.julkaisu.julkaisutyyppi.substring(0, 1));
                    // Stay on stage 3 if stage form not valid
                    if ($scope.vaihe === 4) {
                        if (!$scope.isJustusValid()) {
                            $scope.useVaihe(3);
                            return;
                        }
                        // Add user's organisaatiotunnus to the form
                        // Overwrite active organization code with demo user code to allow saving in demo
                        this.justus.julkaisu.organisaatiotunnus = DEMO_ENABLED === true ? '00000' : $rootScope.user.organization.code;
                    }
                }
                else {
                    if ($scope.vaihe > 2) {
                        $scope.useVaihe(2);
                        return;
                    }
                }
            };

            $scope.useRequiredHighlight = function() {
                $scope.requiredHighlight = !$scope.requiredHighlight;
            };

            $scope.useField = function(type, field, input) {
                if (input !== null && input !== undefined) {
                    $scope.justus[type][field] = String(input);
                }
            };

            $scope.getSelite = function(codeset, value) {
                return KoodistoService.getSelite(codeset, value)
            };

            $scope.isFieldVisible = function(field) {
                return JustusService.isFieldVisible(field);
            };

            $scope.isValid = function(type, field) {
                return JustusService.isValid(type, field);
            };

            // disabled for developing purposes
            $scope.isJustusValid = function() {
                $scope.visibleFields = JustusService.getListOfVisibleFields();
                // $scope.invalidFields = JustusService.getInvalidFields($rootScope.user.visibleFields);
                // ValidationService.setValidationErrors($scope.invalidFields);
                // return $scope.invalidFields.length === 0;
                return true;
            };

            $scope.isFieldRequired = function(fieldName) {
                return JustusService.isFieldRequired(fieldName);
            };

            $scope.cancelAndGoToPublicationListing = function() {
                // JustusService.clearPublicationForm();
                // $state.go('omat');
                if (!DataStoreService.getStateName()) {
                    $state.go('omat');
                    JustusService.clearPublicationForm();
                } else {
                    let state = DataStoreService.getStateName();
                    $state.go(state);
                    DataStoreService.storeStateData(null);
                    JustusService.clearPublicationForm();
                }
            };

            // fillMissingJustusLists - for UI setup list fields if otherwise missing
            // - internal unscoped function
            // - parameter input is optional
            let fillMissingJustusLists = function() {

                // default organisational unit year is 2017
                $scope.alayksikkovuodet = [{
                    id: 2016,
                    label: '2016'
                },
                    {
                        id: 2017,
                        label: '2017'
                    }];

                // get alayksikkodata based on selected year
                $scope.getAlayksikkoData = function(alayksikkovuosi) {

                    if (alayksikkovuosi.id === 2016) {
                        for (let i = 0; i < $scope.user.alayksikot.length; i++) {
                            if ($scope.user.alayksikot[i].vuosi === '2016') {
                                return $scope.user.alayksikot[i].yksikot;
                            }
                        }
                    }

                    if (alayksikkovuosi.id === 2017) {
                        for (let i = 0; i < $scope.user.alayksikot.length; i++) {
                            if ($scope.user.alayksikot[i].vuosi === '2017') {
                                return $scope.user.alayksikot[i].yksikot;
                            }
                        }
                    }
                };
                $scope.alayksikkovuosi = {};

                if (!$scope.justus.organisaatiotekija[0].alayksikko[0]) {
                    // set default organisational unit year as 2017
                    $scope.alayksikkovuosi.selected = {
                        id: 2017,
                        label: '2017'
                    };
                } else {
                    if ($scope.justus.organisaatiotekija[0].alayksikko[1].includes('-2017-') || $scope.justus.organisaatiotekija[0].alayksikko[0].alayksikko === '') {
                        $scope.alayksikkovuosi.selected = {
                            id: 2017,
                            label: '2017'
                        };
                    } else {
                        $scope.alayksikkovuosi.selected = {
                            id: 2016,
                            label: '2016'
                        };
                    }
                }

            };

            const populatePublicationForm = () => {

                if (!$stateParams.id) {
                    finalizeInit();
                    return;
                }

                $scope.loading.publication = true;
                const organisaatiotekijaPopulated = [];

                APIService.getJulkaisu()
                //   APIService.get('julkaisu', val, col, $scope.query)
                    .then(function (obj) {
                        $scope.justus = obj;

                        parseNames($scope.justus.julkaisu.tekijat).map((nameObject) => {
                            $scope.tekijatTags.push({ text: `${nameObject.lastName}, ${nameObject.firstName}` });
                        });

                        $scope.useTekijat();
                        finalizeInit();
                    })
                    .catch(function (err) {
                        $log.error(err);
                    });


            };

            const finalizeInit = () => {

                if (!$scope.justus.julkaisu) {
                    $scope.justus.julkaisu = {};
                }

                if(!$scope.justus.organisaatiotekija) {
                    $scope.justus.organisaatiotekija = [
                        {
                            "etunimet": "",
                            "sukunimi": "",
                            "orcid": "",
                            "rooli": "",
                            "alayksikko": [null]
                        }
                    ]
                }
                $scope.justus.julkaisu.username = $rootScope.user.name;
                fillMissingJustusLists();
                JustusService.updatePublicationFormData($scope.justus);
                $scope.useVaihe($stateParams.vaihe || 1);
                $scope.loading.publication = false;
            };

            populatePublicationForm();
        }

    ]);
