'use strict';

angular.module('Publications', [])
    .factory('Publications', [
        'APIService', '$rootScope', '$state', function(APIService, $rootScope, $state) {

        let Page = function () {
            this.data = [];
            this.pageNumber = 1;
            this.odottavat = true;
            this.count = 1;
            this.loaded = false;
            this.loading = false;
            this.showSpinner = false;
        };

            let getCode = function() {
                if ($rootScope.user.organization.code === "00000") {
                    return "";

                } else {
                    return $rootScope.user.organization.code;
                }
            };

            Page.prototype.nextPage = function(searchMode, searchParameters) {

                this.showSpinner = true;
                this.organisationCode = getCode();

                // disable scroll when all data is loaded
                if (this.data.length === parseInt(this.count)) {
                    this.loaded = true;
                    this.loading = false;
                    console.log("Count equals data length, all data loaded");
                    return;
                }

                if (this.loading) {
                    return;
                }

                this.loading = true;
                let dataPromise;

                if (searchMode) {
                    dataPromise = APIService.getSearchResults("haku", this.organisationCode, this.pageNumber, searchParameters);
                } else {
                    dataPromise = APIService.getPublicationList("lista", this.organisationCode, this.odottavat, this.pageNumber);

                }

                dataPromise.then(function (obj) {
                    this.count = obj.count;
                    let items = obj.data;

                    for (let i = 0; i < items.length; i++) {
                        items[i].julkaisu.ui_julkaisuntila = items[i].julkaisu.julkaisuntila;
                        if (items[i].filedata) {
                            this.data.push({"julkaisu": items[i].julkaisu, "filedata": items[i].filedata});
                        } else {
                            this.data.push({"julkaisu": items[i].julkaisu});

                        }
                    }

                    this.pageNumber = this.pageNumber + 1;
                    this.loading = false;

                }.bind(this))
                    .catch(function (err) {
                        console.log(err);
                        if (err.status && err.status === -1) {
                            $state.go('index');
                        }
                    });

            };

            return Page;

        }



    ]);