app.directive('fileReaderDirective', [
    function() {
        return {
            restrict: 'EA',
            scope: {
                fileContent:"="
            },
            link: function(scope, element) {
                element.on('change', function(changeEvent) {
                    let files = changeEvent.target.files;
                    if (files.length) {
                        let r = new FileReader();
                        r.onload = function(e) {
                            let contents = e.target.result;
                            let record = contents.split(/\r\n|\n/);
                            let headers = record[0].split(';');
                            let lines = [];
                            let json = [];

                            for (let i = 1; i < record.length; i++) {
                                let data = record[i].split(';');
                                if (data.length === headers.length) {
                                    let tarr = [];
                                    for (let j = 0; j < headers.length; j++) {
                                        tarr.push(data[j]);
                                    }
                                    lines.push(tarr);
                                }
                            }

                            for (let k = 0; k < lines.length; k++){
                                json.push({
                                    "hrnumero": lines[k][0],
                                    "etunimi": lines[k][1],
                                    "sukunimi": lines[k][2],
                                    "email": lines[k][3],
                                    "orcid": lines[k][4],
                                    "alayksikko1": lines[k][6],
                                    "alayksikko2": lines[k][7],
                                    "alayksikko3": lines[k][8],
                                })
                            }

                            scope.$apply(function () {
                                scope.fileContent.data = json;
                            })
                        };

                        r.readAsText(files[0], 'ISO-8859-1');

                    }
                });

            }

        };
    }]);