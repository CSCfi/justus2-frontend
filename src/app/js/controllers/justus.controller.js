'use strict';

angular.module('JustusController', [])
    .controller('JustusController', [
        '$rootScope', '$scope', '$log', '$state', '$stateParams', 'ExternalServicesService',
         'KoodistoService', 'JustusService', 'APIService', 'ValidationService', 'DataStoreService', 'AuthService',
        function($rootScope, $scope, $log, $state, $stateParams, ExternalServicesService,
                 KoodistoService, JustusService, APIService, ValidationService, DataStoreService, AuthService) {

            $scope.loading = {};
            $scope.meta = APIService.meta;

            $scope.justus = JustusService.getPublicationFormData();

            $scope.pattern = JustusService.pattern;

            $scope.tekijatTags = [];
            $scope.emojulkaisuntoimittajatTags = [];
            $scope.avainsanatTags = [];
            $scope.lehtinimet = [];
            $scope.kustantajanimet = [];
            $scope.konferenssinimet = [];
            $scope.julkaisunnimet = [];

            $scope.crossrefTaiVirtaLataa = false;
            $scope.requiredHighlight = false;
            $scope.invalidFields = [];
            $scope.issnDescription = [];

            $scope.julkaisu = {};

            $scope.fileAlreadyExists = false;
            JustusService.file = null;

            $scope.validateState = false;

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

            // Split from semicolon and create name object
            const parseEmojulkaisuntoimittajat = function(namesString) {
                const parsedNames = [];

                if (namesString && namesString.length > 0) {
                    const namePairs = namesString.split(';');
                    namePairs.map(function(namePair) {
                        parsedNames.push({
                            name: namePair ? namePair.trim() : ''
                        });
                    });
                }
                return parsedNames;
            };


            $scope.clearFormAndReturnToStart = function() {
                JustusService.clearPublicationForm();
                delete $rootScope.filedata;
                $rootScope.filedata = {};
                JustusService.file = null;
                $scope.fileAlreadyExists = false;
                $scope.justus = JustusService.getPublicationFormData();
                $scope.julkaisutyyppi = null;
                $scope.julkaisutyyppi_paa = null;
                $scope.tekijatTags = [];
                $scope.avainsanatTags = [];
                $scope.lehtinimet = [];
                $scope.kustantajanimet = [];
                $scope.konferenssinimet = [];
                $scope.julkaisunnimet = [];
                $scope.issnDescription = [];
                $scope.justus.julkaisu = {};
                $scope.justus.julkaisu.issn = [""];
                $scope.justus.julkaisu.isbn = [""];
                $scope.justus.julkaisu.projektinumero = [""];
                
                $scope.justus.organisaatiotekija = [
                    {
                        "etunimet": "",
                        "sukunimi": "",
                        "orcid": "",
                        "hrnumero": null,
                        "rooli": null,
                        "alayksikko": [null]
                    }
                ];
                $scope.crossrefTaiVirtaLataa = false;
                $scope.requiredHighlight = false;
                $scope.invalidFields = [];
                fillMissingJustusLists();
                $scope.useVaihe(1);
                $scope.validateState = false;
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


            $scope.useEmojulkaisuntoimittajat = function() {

                // Add space after each comma if none entered
                $scope.emojulkaisuntoimittajatTags = $scope.emojulkaisuntoimittajatTags.map(function(tag, index) {
                    if (tag.text && tag.text.indexOf(', ') === -1) {
                        tag.text = tag.text.replace(',', ', ');
                    }
                    return tag;
                });

                $scope.justus.julkaisu.emojulkaisuntoimittajat = '';
                $scope.justus.julkaisu.emojulkaisuntoimittajat = $scope.emojulkaisuntoimittajatTags.map(function(tag, index) {
                    return tag.text;
                }).join('; ');

            };


            $scope.useKopioiTekijat = function(input) {
                let tempstr = input;
                for (let i = 0; i < $scope.justus.julkaisu.julkaisuntekijoidenlukumaara; i++) {
                    let sb = 0;
                    let se = tempstr.indexOf(',');
                    let eb = tempstr.indexOf(',') + 1;
                    let ee = tempstr.indexOf(';') >= 0 ? tempstr.indexOf(';') : tempstr.length;
                    $scope.justus.organisaatiotekija[i] = {};
                    $scope.justus.organisaatiotekija[i].sukunimi = tempstr.substring(sb, se).trim();
                    $scope.justus.organisaatiotekija[i].etunimet = tempstr.substring(eb, ee).trim();
                    $scope.justus.organisaatiotekija[i].alayksikko = [null];
                    $scope.justus.organisaatiotekija[i].orcid = "";
                    $scope.justus.organisaatiotekija[i].hrnumero = null;
                    tempstr = tempstr.substring(ee + 1);
                }
            };

            $scope.useOrganisaatiotekijaAlayksikko = function(parIndex, index, input) {
                $scope.justus.organisaatiotekija[parIndex].alayksikko[index] = input;
            };

            $scope.addAlayksikko = function(parentIndex, index) {
                $scope.justus.organisaatiotekija[parentIndex].alayksikko.splice(index, 1);
            };

            $scope.getArvo = function(alayksikkoKoodi) {
              if ($scope.alayksikkovuosi.selected["id"] === 2019) {
                  return "";
              } else
                  return alayksikkoKoodi;
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
                        "hrnumero": null,
                        "rooli": null,
                        "alayksikko": [null]
                    }
                );

            };

            $scope.refreshKanavanimet = function(tyyppi, input) {

                if (tyyppi == null) return;
                if (input == null) return;
                if (input.length < 5) return [];

                if (tyyppi === 1) {
                    return ExternalServicesService.etsiJulkaisuSarjanNimi(input)
                        .then(function (response) {
                            if (angular.isArray(response.data)) {
                                $scope.lehtinimet = response.data;
                                return response.data;
                            }
                        });
                }

                if (tyyppi === 2) {
                    return ExternalServicesService.etsiKustantaja(input)
                        .then(function (response) {
                            if (angular.isArray(response.data)) {
                                $scope.kustantajanimet = response.data;
                                return response.data;
                            }
                        });
                }

                if (tyyppi === 3) {
                    return ExternalServicesService.etsiKonferenssinVakiintunutNimi(input)
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
                ExternalServicesService.kanava(input)
                    .then(function (obj) {
                        $scope.justus.julkaisu.lehdenjulkaisusarjannimi = obj.Name;
                        $scope.justus.julkaisu.jufotunnus = input; // tai vastauksesta...
                        $scope.justus.julkaisu.jufoluokitus = obj.Level;

                        if (obj.ISSN1) {
                            $scope.justus.julkaisu.issn[0] = obj.ISSN1;
                            $scope.issnDescription[0]= "print";
                        }

                        if (!$scope.justus.julkaisu.issn[0] && obj.ISSN2) {
                            $scope.justus.julkaisu.issn[0] = obj.ISSN2;
                        } else if ($scope.justus.julkaisu.issn[0] && obj.ISSN2) {
                            $scope.justus.julkaisu.issn[1] = obj.ISSN2;
                            $scope.issnDescription[1] = "electronic";
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

            $scope.fetchLehtisarja = function(input) { // issn

                if (input == null || input === "") return;
                ExternalServicesService.etsiissn(input)
                    .then(function (response) {
                        var jobj = response.data;
                        var jufotunnus = jobj && jobj.length > 0 ? jobj[0].Jufo_ID : null; // voisi asettaa jo scopeen, mutta seuraavassa kutsussa
                        $scope.useLehtisarja(jufotunnus); // vain issn?
                        $scope.lehtinimet.selected = jobj && jobj.length > 0 ? jobj[0] : null;
                    });
            };

            $scope.refreshJulkaisunnimet = function(input, tekija) {
                if (input === null) return;
                if (input.length < 5) return;

                $scope.julkaisunnimet = [];
                $scope.crossrefTaiVirtaLataa = true;

                // Haku julkaisun nimellä, tekijän nimi rajaa hakua
                ExternalServicesService.worksquery(input, tekija)
                    .then(function(obj) {
                        $scope.julkaisunnimet = $scope.julkaisunnimet.concat(obj.data);
                        $scope.crossrefTaiVirtaLataa = false;
                    });
            };

            // reset julkaisunnimet on blur
            $scope.onOpenClose = function(isOpen, title) {
              if (!title && isOpen === false) {
                  $scope.julkaisunnimet = [];
              }
            };

            $scope.useJulkaisunnimi = function(source, input) { // input == identifier
                if (!source || !input) return;

                if (source === 'CrossRef') {
                    $scope.crossrefTaiVirtaLataa = true;
                    ExternalServicesService.works(source, input)
                        .then(function successCb(response) {

                            $scope.justus.julkaisu = response.data;
                            $scope.justus.julkaisu.username = $rootScope.user.name;
                            $scope.justus.julkaisu.projektinumero = [""];

                            // Initialize tekijatTags input
                            parseNames($scope.justus.julkaisu.tekijat).map(function(nameObject) {
                                $scope.tekijatTags.push({ text: `${nameObject.lastName}, ${nameObject.firstName}` });
                            });
                            $scope.useTekijat();

                            $scope.fetchLehtisarja($scope.justus.julkaisu.issn[0]);
                            $scope.julkaisuhaettu = true;

                            $scope.crossrefTaiVirtaLataa = false;
                            $scope.useVaihe(3); // ->tietojen syöttöön
                        }, function errorCb(response) {
                            console.log(response);
                            $scope.julkaisuhaettu = false;
                            $scope.crossrefTaiVirtaLataa = false;
                            return false;
                        });
                }
                // Prefill publication from VIRTA
                if (source === 'VIRTA') {
                    $scope.crossrefTaiVirtaLataa = true;

                    ExternalServicesService.works(source.toLowerCase(), input)
                        .then(function successVirta(response) {

                            $scope.justus.julkaisu = response.data.julkaisu;
                            $scope.justus.julkaisu.username = $rootScope.user.name;
                            $scope.justus.julkaisu.projektinumero = [""];

                            if (response.data.tieteenala) {
                                $scope.justus.tieteenala = response.data.tieteenala;
                            }

                            if (response.data.avainsanat) {
                                $scope.justus.avainsanat = response.data.avainsanat;
                                $scope.initializeAvainsanatTags();
                            }

                            // Initialize tekijatTags input
                            parseNames($scope.justus.julkaisu.tekijat).map(function(nameObject) {
                                $scope.tekijatTags.push({ text: `${nameObject.lastName}, ${nameObject.firstName}` });
                            });
                            $scope.useTekijat();

                            $scope.fetchLehtisarja($scope.justus.julkaisu.issn[0]);
                            $scope.julkaisuhaettu = true;
                            $scope.crossrefTaiVirtaLataa = false;
                            $scope.useVaihe(3); // ->tietojen syöttöön
                        }, function errorVirta(response) {
                            $scope.julkaisuhaettu = false;
                            return false;
                        });

                }

                $scope.initializeAvainsanatTags();
            };

            $scope.refreshAvainsanat = function(input) {
              if (input === null) return;
              if (input.length < 3) return [{ prefLabel: input, localname: input }];
                return ExternalServicesService.etsiAvainsanat(input, $scope.lang)
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

            $scope.removeIssn = function(issnIndex) {
                $scope.justus.julkaisu.issn.splice(issnIndex, 1);
                $scope.issnDescription = [];
            };

            $scope.initializeAvainsanatTags = function() {
                if ($scope.justus.avainsanat) {
                    $scope.avainsanatTags = [];
                    $scope.justus.avainsanat.map(function(keywordObject) {
                        if (keywordObject.length > 0) {
                            $scope.avainsanatTags.push({
                                prefLabel: keywordObject,
                                // Generate a mockup localname to be used as an unique key, since actual localname is not saved
                                localname: `${keywordObject}_${(Math.random() * 1000).toString()}`
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
                // empty selected value from UI:s scope
                if ($scope.alatieteenalat) {
                    $scope.alatieteenalat.selected = undefined;
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
                if(array.indexOf(value) !== -1 ) {
                    return true
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

                if ($scope.vaihe !== 5) {
                    $scope.validateState = false;
                }

                // Prevent user from navigating to vaihe 1 when editing a publication
                if ($scope.justus.julkaisu.id && vaihe === 1) {
                    return;
                }

                $scope.vaihe = vaihe;
                if ($scope.justus.julkaisu.julkaisutyyppi && $scope.justus.julkaisu.julkaisutyyppi.length > 1) {
                    // make sure both values are set (paa,ala):

                    $scope.useJulkaisutyyppiPaa($scope.justus.julkaisu.julkaisutyyppi.substring(0, 1));

                    if ($scope.vaihe === 5) {

                        // validate that embargo date is not in past
                        // if not valid stay on stage 4
                        let date = new Date();
                        let d = date.getDate();
                        let m = date.getMonth();
                        let y = date.getFullYear();
                        let today = new Date(y, m, d, 0, 0, 0);

                        if ($rootScope.filedata.embargo && $rootScope.filedata.embargo !== "" && $rootScope.filedata.embargo <  today) {
                            ValidationService.setValidationErrors(["embargo"]);
                            $scope.useVaihe(4);
                            return;
                        }

                        $scope.validateState = true;
                        if (!$scope.isJustusValid()) {

                            // Stay on stage 3 if stage form not valid
                            $scope.useVaihe(3);
                            return;
                        }

                    }
                }
                else {
                    if ($scope.vaihe > 2) {
                        $scope.useVaihe(2);
                        return;
                    }
                }
            };

            $scope.eiRinnakkaisTallennettavaSelected = function () {
                $scope.justus.julkaisu.julkaisurinnakkaistallennettu = "0";
                JustusService.file = null;
                delete $rootScope.filedata;
                $rootScope.filedata = {};
                $scope.eirinnakkaistellennettava = true;
                $scope.fileAlreadyExists = false;
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

            $scope.isJustusValid = function() {
                $scope.visibleFields = JustusService.getListOfVisibleFields();
                $scope.invalidFields = JustusService.getInvalidFields($rootScope.user.visibleFields);

                ValidationService.setValidationErrors($scope.invalidFields);
                return $scope.invalidFields.length === 0;
                // return true;
            };

            $scope.isFieldRequired = function(fieldName) {
                return JustusService.isFieldRequired(fieldName);
            };

            $scope.cancelAndGoToPublicationListing = function() {
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

            // get alayksikkodata based on selected year
            $scope.getAlayksikkoData = function(alayksikkovuosi) {

                if (alayksikkovuosi.id === 2016) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2016') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }

                if (alayksikkovuosi.id === 2017) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2017') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }

                if (alayksikkovuosi.id === 2018) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2018') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }

                if (alayksikkovuosi.id === 2019) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2019') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }

                if (alayksikkovuosi.id === 2020) {
                    for (let i = 0; i < $rootScope.user.alayksikot.length; i++) {
                        if ($rootScope.user.alayksikot[i].vuosi === '2020') {
                            return $rootScope.user.alayksikot[i].yksikot;
                        }
                    }
                }
            };


            // fillMissingJustusLists - for UI setup list fields if otherwise missing
            // - internal unscoped function
            // - parameter input is optional
            let fillMissingJustusLists = function() {

                for (let i=0; i < $rootScope.user.alayksikot.length; i++) {
                    if($rootScope.user.alayksikot[i].vuosi === '2020') {
                        if($rootScope.user.alayksikot[i].yksikot.length < 1) {
                            $scope.alayksikkovuodet = [
                                {
                                    id: 2016,
                                    label: '2016'
                                },
                                {
                                    id: 2017,
                                    label: '2017'
                                },
                                {
                                    id: 2018,
                                    label: '2018'
                                },
                                {
                                    id: 2019,
                                    label: '2019'
                                }
                            ];
                        } else {
                            $scope.alayksikkovuodet = [
                                {
                                    id: 2016,
                                    label: '2016'
                                },
                                {
                                    id: 2017,
                                    label: '2017'
                                },
                                {
                                    id: 2018,
                                    label: '2018'
                                },
                                {
                                    id: 2019,
                                    label: '2019'
                                },
                                {
                                    id: 2020,
                                    label: '2020'
                                }
                            ];
                        }
                    }
                }

                $scope.alayksikkovuosi = {};

                if (!$scope.justus.organisaatiotekija[0].alayksikko[0]) {
                    if ($scope.alayksikkovuodet.length === 5) {
                        $scope.alayksikkovuosi.selected = {
                            id: 2020,
                            label: '2020'
                        };
                    } else {
                        $scope.alayksikkovuosi.selected = {
                            id: 2019,
                            label: '2019'
                        };
                    }
                } else {
                    if ($scope.justus.organisaatiotekija[0].alayksikko[0].indexOf('-2020-') !== -1) {
                        $scope.alayksikkovuosi.selected = {
                            id: 2020,
                            label: '2020'
                        };
                    }
                    else if ($scope.justus.organisaatiotekija[0].alayksikko[0].indexOf('-2019-') !== -1) {
                        $scope.alayksikkovuosi.selected = {
                            id: 2019,
                            label: '2019'
                        };
                    }
                    else if ($scope.justus.organisaatiotekija[0].alayksikko[0].indexOf('-2018-') !== -1) {
                        $scope.alayksikkovuosi.selected = {
                            id: 2018,
                            label: '2018'
                        };
                    } else if ($scope.justus.organisaatiotekija[0].alayksikko[0].indexOf('-2017-') !== -1) {
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

                  APIService.get('tiedot', $stateParams.id)
                    .then(function (obj) {
                        $scope.justus = obj.data;
                        if (obj.data.filedata) {
                            $rootScope.filedata = obj.data.filedata;
                            $scope.fileAlreadyExists = true;
                            delete $scope.justus["filedata"];
                        } else {
                            delete $rootScope.filedata;
                            $rootScope.filedata = {};
                            $scope.fileAlreadyExists = false;
                        }
                        parseNames($scope.justus.julkaisu.tekijat).map((nameObject) => {
                            $scope.tekijatTags.push({ text: `${nameObject.lastName}, ${nameObject.firstName}` });
                        });

                        $scope.useTekijat();
                        $scope.initializeAvainsanatTags();


                        parseEmojulkaisuntoimittajat($scope.justus.julkaisu.emojulkaisuntoimittajat).map((nameObject) => {
                            $scope.emojulkaisuntoimittajatTags.push({ text: nameObject.name });
                        });

                        $scope.useEmojulkaisuntoimittajat();

                        finalizeInit();
                    })
                    .catch(function (err) {
                        $log.error(err);
                    });

            };

            const finalizeInit = () => {

                if (!$scope.justus.julkaisu) {
                    $scope.justus.julkaisu = {};
                    $scope.justus.julkaisu.issn = [""];
                    $scope.justus.julkaisu.isbn = [""];
                    $scope.justus.julkaisu.projektinumero = [""];
                }

                if (!$rootScope.filedata) {
                    $rootScope.filedata = {};
                }

                if(!$scope.justus.organisaatiotekija || $scope.justus.organisaatiotekija.length < 1) {
                    $scope.justus.organisaatiotekija = [
                        {
                            "etunimet": "",
                            "sukunimi": "",
                            "orcid": "",
                            "hrnumero": null,
                            "rooli": null,
                            "alayksikko": [null]
                        }
                    ]
                }
                $scope.justus.julkaisu.username = $rootScope.user.name;
                fillMissingJustusLists();
                JustusService.updatePublicationFormData($scope.justus);
                $scope.useVaihe($stateParams.vaihe || 1);
                $scope.loading.publication = false;
                $scope.validateState = false;

            };


            let verifyAccess = function() {
                if (AuthService.isLoggedIn()) {
                    populatePublicationForm();

                } else {
                    AuthService.getUserInfo().then(function (res) {
                        $scope.user = res;
                        $rootScope.user = $scope.user;
                        populatePublicationForm();

                    }).catch(function (err) {
                        console.log(err);
                        $state.go('index');

                    });
                }
            };

            verifyAccess();
        }


    ]);
