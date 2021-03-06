
// Depicts field settings based on selected publication type. Settings for a single field constist of the following attributes:
// requiredInPublicationTypes: Publication type codes for which the field is mandatory
// visibleInPublicationTypes: Publication type codes for which the field is visible. Field can be still hidden by organization specific settings in organization_config variable
// optionalWithFields: Other field or fields which makes the mandatory field optional if filled
// requiredWithFields: Fields that only when filled makes the field mandatory
// requiredAmountOfValues: Some fields are lists of values, depicts the required amount of values required, will be 0 for fields with a single value
// pattern: A regex pattern for a valid field value or null if the field does not need to match a pattern to be valid
// subfields: A list of fields which are nested in the field object
const field_default_config = {
  'organisaatiotunnus': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
      'childnode': true
  },
  'julkaisutyyppi': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
      'childnode': true

  },
  'julkaisuvuosi': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': /^[0-9]{4}$/,
    'subfields': [],
    'childnode': true
  },
  'julkaisunnimi': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
      'childnode': true
  },
  'tekijat': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
      'childnode': true
  },
  'julkaisuntekijoidenlukumaara': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'organisaatiotekija': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 1,
    'pattern': null,
    'subfields': ['etunimet', 'sukunimi', 'alayksikko']
  },
  'orcid': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'subfields': [],
    'pattern': null
  },
  'konferenssinvakiintunutnimi': {
    'requiredInPublicationTypes': ['A4', 'B3', 'D3'],
    'visibleInPublicationTypes': ['A4', 'B3', 'D3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'projektinumero': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'isbn': {
    'requiredInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'C1', 'C2'],
    'visibleInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'C1', 'C2', 'D2', 'D3', 'D4', 'D5', 'D6', 'E2', 'E3', 'F1', 'F2', 'F3', 'G4', 'G5'],
    'optionalWithFields': ['issn'],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': /^(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/g,
    'subfields': [],
    'childnode': true
  },
  'issn': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': ['isbn'],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': /^([0-9]{4}[- ][0-9]{3}[0-9X])$/g,
    'subfields': [],
    'childnode': true
  },
  'volyymi': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'numero': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'lehdenjulkaisusarjannimi': {
    'requiredInPublicationTypes': ['E1', 'D1'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'kustantaja': {
    'requiredInPublicationTypes': ['A3', 'B2', 'C1', 'C2', 'D2', 'D4', 'D5', 'D6', 'E2', 'E3'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'julkaisunkansainvalisyys': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'tieteenala': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3','F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 1,
    'pattern': null,
    'subfields': ['tieteenalakoodi']
  },
  'taiteenala': {
    'requiredInPublicationTypes': ['F1', 'F2', 'F3'],
    'visibleInPublicationTypes': ['F1', 'F2', 'F3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 1,
    'pattern': null,
    'subfields': ['taiteenalakoodi']
  },
  'taidealantyyppikategoria': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['F1', 'F2', 'F3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'kansainvalinenyhteisjulkaisu': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'yhteisjulkaisuyrityksenkanssa': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'avoinsaatavuus': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'julkaisurinnakkaistallennettu': {
    'requiredInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'rinnakkaistallennetunversionverkkoosoite': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': ['julkaisurinnakkaistallennettu'],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'emojulkaisunnimi': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'D2', 'D3', 'F2'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'emojulkaisuntoimittajat': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'D2', 'D3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'sivut': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'artikkelinumero': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A4', 'B1', 'B3', 'D1', 'D3', 'E1'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'julkaisunkustannuspaikka': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A3', 'A4', 'B2', 'B3', 'C1', 'C2', 'D2', 'D3', 'D4', 'D5', 'D6', 'E2', 'E3', 'F1', 'F2', 'F3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'avainsanat': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'julkaisumaa': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'julkistamispaikkakunta': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['F1', 'F2', 'F3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'tapahtumanlisatieto': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['F1', 'F2', 'F3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisunkieli': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3','G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'doitunniste': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'muutunniste': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['F1', 'F2', 'F3'],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'pysyvaverkkoosoite': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': [],
    'childnode': true
  },
  'tekijanrooli': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['F1', 'F2', 'F3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisuvuodenlisatieto': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['F1', 'F2', 'F3'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  },
  'julkaisumaksu': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': ['julkaisumaksuvuosi'],
    'requiredAmount': 0,
    'pattern': /^([0-9]+|[0-9]+[,.]?[0-9]{1,2})$/,
    'subfields': [],
    'childnode': true
  },
  'julkaisumaksuvuosi': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': ['julkaisumaksu'],
    'requiredAmount': 0,
    'pattern': /^[0-9]{4}$/,
    'subfields': [],
    'childnode': true
  },
  'lisatieto': {
    'requiredInPublicationTypes': [],
    'visibleInPublicationTypes': ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3', 'G1', 'G2', 'G3', 'G4', 'G5'],
    'optionalWithFields': [],
    'requiredWithFields': [],
    'requiredAmount': 0,
    'pattern': null,
    'subfields': []
  }
};
