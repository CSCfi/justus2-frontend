'use strict';

const i18n = {
  header: {
    title: { FI: 'JUSTUS', SV: 'JUSTUS', EN: 'JUSTUS' },
    logotext: { FI: 'JUSTUS - JULKAISUTIETOJEN TALLENNUS', SV: 'JUSTUS - JULKAISUTIETOJEN TALLENNUS', EN: 'JUSTUS - JULKAISUTIETOJEN TALLENNUS' },
    lang: { FI: 'Suomeksi', SV: 'På svenska', EN: 'In English' },
    logout: { FI: 'Kirjaudu ulos', SV: 'Logga ut', EN: 'Logout' },
    help: { FI: 'Ohje', SV: 'Instruktioner', EN: 'Instructions' }
  },
  footer: {
    help: {
      title: { FI: 'Käyttötuki', SV: 'Helpdesk', EN: 'Helpdesk' },
      email: { FI: 'justus@csc.fi', SV: 'justus@csc.fi', EN: 'justus@csc.fi' },
      time: { FI: 'ma-pe klo 8.30-16', SV: 'mån-fre 8.30-16', EN: 'Mon-Fri 8.30am-4pm' }
    },
    csc: {
      name: { FI: 'CSC - TIETEEN TIETOTEKNIIKAN KESKUS OY', SV: 'CSC - TIETEEN TIETOTEKNIIKAN KESKUS OY', EN: 'CSC - IT CENTER FOR SCIENCE LTD' },
      address: { FI: 'PL 405, 02101 Espoo', SV: 'PL 405, 02101 Espoo', EN: 'P.O. Box 405, FI-02101 Espoo' },
      phone: { FI: 'puh. (09) 457 2001', SV: 'tel. +358 (0)9 457 2001', EN: 'tel. +358 (0)9 457 2001' }
    }
  },
  etusivu: {
    kirjaudu: { FI: 'Kirjaudu JUSTUS-palveluun', SV: 'Logga in', EN: 'Log in to JUSTUS-service' },
    title: { FI: 'Mikä on JUSTUS – julkaisutietojen tallennuspalvelu?', SV: 'Vad är JUSTUS-service?', EN: 'What is JUSTUS - Publication Information Reporting Service?' },
    paragraphs: [
      {
        FI: 'JUSTUS – julkaisutietojen tallennuspalveluun syötetään tutkimusjulkaisujen tietoja. Palveluun tallennetut julkaisutiedot ovat selailtavissa JUULI-julkaisutietoportaalissa. Tiedot siirtyvät automaattisesti opetus- ja kulttuuriministeriön (OKM) vuosittaiseen julkaisutiedonkeruuseen ja ne huomioidaan myös korkeakoulujen rahoitusmallissa.',
        SV: 'I JUSTUS kan du mata in uppgifter om dina vetenskapliga publikationer, som sedan pubilceras i Juuli-portalen. Uppgifterna överförs också automatiskt till Kultur- och undervisningsministeriets årliga insamling av publikationsuppgifter. Uppgifterna beaktas också vid finaniseringen av högskolorna.',
        EN: 'When publication information is entered into JUSTUS-service it can be accessed through JUULI-portal. Data is also automatically transferred to the publication data collection by the Ministry of Education and Culture and taken into consideration in the funding formula of higher education institutions.'
      }
    ],
    help: {
      title: { FI: 'JUSTUS-palvelun käyttöohjeet:', SV: 'JUSTUS instruktioner:', EN: 'Instructions for JUSTUS-service:' },
      organization: {
        FI: 'JUSTUS-palvelua voit käyttää julkaisutietojesi tallentamiseen, jos kuulut johonkin seuraavista organisaatioista:',
        SV: 'Du kan använda Justus om du hör till någon av följande organisationer:',
        EN: 'JUSTUS-service can be used to enter publication information if you belong to one of the following organisations:'
      }
    }
  },
  content: {
    valitse: {
      title: { FI: 'VALITSE TOIMINTO', SV: 'VÄLJ FUNKTION', EN: 'CHOOSE FUNCTION' },
      etusivu: { FI: 'Etusivu', SV: 'Framsida', EN: 'Frontpage' },
      tallenna: { FI: 'Tallenna julkaisu', SV: 'Spara uppgifter', EN: 'Save publication' },
      omat: { FI: 'Omat tallennukset', SV: 'Mina publikationer', EN: 'My publications' },
      hyvaksy: { FI: 'Hyväksy tallennuksia', SV: 'Godkänn uppgifter', EN: 'Approve publications' }
    },
    esitayta: {
      title: { FI: 'Tietojen haku', SV: 'Hämta uppgifter', EN: 'Search information' },
      text: {
        FI: 'Tällä näytöllä voit hakea jo tallennettuja tietoja muista järjestelmistä pohjaksi.',
        SV: '*SV*',
        EN: '*EN*',
        doi: {
          FI: 'Suoraviivainen DOI-tunnisteella haku CrossRef:stä; syötä DOI-tunniste ja klikkaa Hae-painiketta niin siirryt suoraan esitäytettyyn tietojensyöttölomakkeeseen.',
          SV: '*SV*',
          EN: '*EN*'
        },
        haku: {
          FI: 'Julkaisun haku tekijän ja julkaisun nimen perusteella; syötä tekijän nimi (osa) omaan kenttäänsä ja julkaisun nimeä (osa) seuraavaan kenttään. Haku käynnistyy automaattisesti CrossRef- ja VIRTA-palveluihin ja tulokset näytetään valintalistana josta sopivan julkaisun voi valita klikkaamalla. Tämän jälkeen valitun julkaisun voi ottaa mukaan klikkaamalla Käytä-painiketta jonka myötä siirrytään esitäytettuun tietojen syöttölomakkeeseen.',
          SV: '*SV*',
          EN: '*EN*'
        },
        ohita: {
          FI: 'Vaihtoehtoisesti voit myös ohittaa hakuvaiheen klikkaamalla "Ohita haku"-painiketta jonka jälkeen siirryt tietojen syöttämiseen',
          SV: '*SV*',
          EN: '*EN*'
        }
      },
      doihaku: {
        title: { FI: 'Hae tietoja DOI-tunnisteella', SV: 'Hämta uppgifter med DOI', EN: 'Search using DOI-identifier' },
        tunniste: {
          FI: 'Kirjoita DOI-tunniste',
          SV: 'Agne DOI',
          EN: 'Enter DOI-identifier',
          tooltip: { FI: 'Esim. https://doi.org/10.4324/9780203841693', SV: 't.ex. https://doi.org/10.4324/9780203841693', EN: 'e.g. https://doi.org/10.4324/9780203841693' }
        },
        klikkaa: {
          FI: 'ja klikkaa',
          SV: '*SV*ja klikkaa',
          EN: '*EN*ja klikkaa',
          tooltip: { FI: 'ja klikkaa', SV: '*SV*ja klikkaa', EN: '*EN*ja klikkaa' }
        },
        info: {
          FI: 'Voit esitäyttää julkaisutietoja käyttämällä DOI-tunnisteesta muodostettua pysyvää osoitetta. Julkaisutiedot haetaan CrossRef-palvelusta.',
          SV: 'Hämta publikationsdata från den internationella CrossRef-publikationsdatabasen med hjälp av DOI.',
          EN: 'You can prefill publication information by using a DOI-link. The information is retrieved from the CrossRef-service'
        },
        hae: { FI: 'Hae', SV: 'Hämta', EN: 'Search' }
      },
      etsijulkaisu: {
        title: { FI: 'Hae tietoja julkaisun nimellä', SV: 'Hämta uppgifter på titel', EN: 'Search using publication\'s name' },
        picktip: { FI: 'Hae julkaisun nimellä', SV: 'Hämta på titel', EN: 'Search publication\'s name' },
        tekija: {
          FI: 'Kirjoita hakuehto: tekijä',
          SV: '*SV*Kirjoita hakuehto: tekijä',
          EN: 'Enter the author',
          tooltip: { FI: 'Rajaa hakua halutessasi tekijän nimellä', SV: 'Avgränsa sökningen med författarens namn', EN: 'Filter search using the author\'s name' }
        },
        info: {
          FI: 'Voit hakea ja esitäyttää julkaisutietoja myös VIRTA- tai CrossRef -palveluista löytyvillä tiedoilla. Hakua voi rajata julkaisun tekijän nimellä ja haku kohdistuu julkaisun nimeen.',
          SV: 'Hämta uppgifter från den internationella CrossRef-publikationsdatabasen eller den nationella VIRTA-databasen genom att börja skriva in publikationens titel och välj från listan som visas.',
          EN: 'You can also prefill the publication information by searching for it from the VIRTA- and CrossRef-service. The search can be filtered by using the author\'s name and the search is performed using the publication\'s name'
        }
      },
      uudestaan: {
        FI: 'Hae julkaisua uudestaan', SV: '*SV*Hae julkaisua uudestaan', EN: '*EN*Hae julkaisua uudestaan'
      },
      hae: { FI: 'Hae', SV: 'Hämta', EN: 'Search' },
      ohita: { FI: 'Ohita vaihe ja syötä julkaisutiedot käsin', SV: 'Manuell inmatning', EN: 'Skip this phase and manually enter publication information' }
    },
    form: {
      julkaisutyyppi: {
        FI: 'Julkaisutyyppi',
        SV: 'Publikationstyp',
        EN: 'Publication type',
        paa: { FI: 'VALITSE JULKAISUTYYPPI PÄÄLUOKKA', SV: '*SV*VALITSE JULKAISUTYYPPI PÄÄLUOKKA', EN: '*EN*VALITSE JULKAISUTYYPPI PÄÄLUOKKA' },
        ala: { FI: 'VALITSE JULKAISUTYYPPI ALALUOKKA', SV: '*SV*VALITSE JULKAISUTYYPPI ALALUOKKA', EN: '*EN*VALITSE JULKAISUTYYPPI ALALUOKKA' }
      },
      julkaisuvuosi: {
        FI: 'Julkaisuvuosi',
        SV: 'Utgivningsår',
        EN: 'Year of publication',
        tooltip: {
          FI: 'Vuosi, jolloin julkaisu on julkaistu ensimmäistä kertaa versiona, jossa on täydelliset viitetiedot.',
          SV: 'Det år anges då publikationen för första gången har utgetts som en version med fullständiga referensuppgifter.',
          EN: 'The year in which the publication was published for the first time as a version with full reference data.'
        },
		tooltipF: {
          FI: 'Vuosi, jolloin julkaisu on julkaistu ensimmäistä kertaa. Esimerkiksi ensi-illan tai näyttelyn avajaisten päivämäärä. Julkaisuvuoteen liittyvää tarkempaa lisätietoa voi kertoa Julkaisuvuoden lisätieto -kentässä.',
          SV: '*SV',
          EN: 'The year in which the publication was published for the first time as a version with full reference data. For example, the date of a premiere of opening day of an exhibition.'
        },
        picktip: { FI: 'esim. 2017', SV: 't.ex. 2017', EN: 'e.g. 2017' }
      },
      julkaisuvuodenlisatieto: {
        FI: 'Julkaisuvuoden lisätieto',
        SV: 'Mer information av publikationens utgivningsår',
        EN: 'Additional information to publication year',
        tooltip: {
          FI: 'Päivämäärät (esimerkiksi aikavälit), näytösten määrä jne. Esimerkki: Julkaisuvuosi = 2017, Julkaisuvuoden lisätieto = 20 näytöstä, 1.2-31.3.2017',
          SV: 'Datum',
          EN: 'Dates (e.g. time frame), amount of presentations/shows. E.g. Year of publication = 2017, Additional information to publication year = 20 presentations, 1.2.-31.3.2017'
        },
        picktip: {
          FI: 'esim. 20 näytöstä, 1.2.-31.3.2018',
          SV: 't.ex. 20 utställningar, 1.2.-31.3.2018',
          EN: 'e.g. 20 presentations, 1.2.-31.3.2018' }
      },
      julkaisunnimi: {
        FI: 'Julkaisun nimi',
        SV: 'Publikationens namn/titel',
        EN: 'Publication name',
        tooltip: {
          FI: 'Julkaisun nimi siten kuin se on artikkelissa tai teoksessa mainittu. Vieraskielisen julkaisun nimi voidaan kirjoittaa translitteroituna versiona.',
          SV: 'Publikationens namn/titel såsom den nämns i artikeln eller verket. Namnet på en publikation på ett främmande språk kan vid behov sparas som en translittererad version.',
          EN: 'Publication name as given in the article or the book. If necessary, the name of a foreign-language publication may be reported on as a transliterated version.'
        },
		tooltipF: {
          FI: 'Taidealan julkaisun tai osatoteutuksen (F2) nimi siten kuin se on mainittu esimerkiksi näyttelyn yhteydessä.',
          SV: '*SV',
          EN: 'Name of artistic publication or partial realization (F2) name as given in, for example, in the exhibition. If necessary, the name of a foreign-language publication may be reported on as a transliterated version.'
        },
        picktip: { FI: 'Kirjoita julkaisun nimi kokonaisuudessaan', SV: 'Skriv publikationens namn/titel i helhet', EN: 'Publication name in its entirety' }
      },
      tekijat: {
        FI: 'Tekijät',
        SV: 'Publikationens upphovsmän',
        EN: 'Publication authors',
        tooltip: {
          FI: 'Julkaisun täydelliset tekijätiedot (ml. ulkomaiset tekijät) muodossa Sukunimi, Etunimi. Paina enter vahvistaaksesi nimi. Tekijät siinä järjestyksessä, kuin ne ovat julkaisussa ilmoitettu. 20 ensimmäistä tekijää riittää.',
          SV: 'Fullständig information om publikationens upphovsmän anges i den form och i den ordning som de nämns i den ursprungliga publikationen eller källdatabasen (högst 20 st.).',
          EN: 'Authors of the original publication in the following format: Surname, Firstname. Press enter to confirm. Authors in the same order as was in the original publication. Max. 20 authors is sufficient.'
        },
        picktip: { FI: 'Syötä muodossa Sukunimi, Etunimi ja paina enter', SV: 'Skriv i formatet Efternamn, Förnamn och tryck enter', EN: 'Type in format Lastname, Firstname and press enter' }
      },
      julkaisuntekijoidenlukumaara: {
        FI: 'Julkaisun tekijöiden lukumäärä',
        SV: 'Antalet upphovsmän',
        EN: 'Number of authors in publication',
        tooltip: {
          FI: 'Julkaisun tekijöiden kokonaislukumäärä.',
          SV: 'Det totala antalet upphovsmän vad gäller publikationen.',
          EN: 'The total number of authors in the publication.'
        },
	    tooltipF: {
          FI: 'Julkaisun tekijätietoja vastaava tekijöiden kokonaislukumäärä.',
          SV: '*SV',
          EN: 'The total number of authors in the publication.'
        }
      },
      organisaatiotekija: {
        FI: 'Organisaation tekijät',
        SV: 'Organisationens upphovsmän',
        EN: 'Organisations authors',
		tooltip: {
          FI: 'Organisaatioon kuuluvat tekijät, jotka ovat osallistuneet julkaisun tekemiseen. Organisaation tiedekunta, osasto, laitos tai yksikkö, jonka henkilöstöön julkaisun tekijä kuuluu. Tekijän ORCID-tunniste esim. 0000-0000-0000-0000, ks. http://www.orcid.org. ORCID-tunniste suositellaan kerrottavaksi aina, jos sellainen on tekijällä olemassa.',
          SV: 'Forskare, som har varit med om att göra publikationen och som hör till organisationen. Organisationens fakulteter, avdelningar, institutioner eller enheter inom vilka publikationens upphovsmän är anställda. ORCID-identifieringsnumren, t.ex. 0000-0000-0000-0000, på den rapporterande organisationens egna upphovsmän, se http://www.orcid.org',
          EN: 'Authors at the organisation involved in producing the publication. Faculties, departments or units of the organisation whose staff includes the authors of the publication. The ORCID identifiers of authors from the reporting organisation, e.g. 0000-0000-0000-0000, refer to http://www.orcid.org'
        },
        tooltipF: {
          FI: 'Organisaatioon kuuluvat tekijät, jotka ovat osallistuneet julkaisun tekemiseen. Organisaation tiedekunta, osasto, laitos tai yksikkö, jonka henkilöstöön julkaisun tekijä kuuluu. Tekijän ORCID-tunniste esim. 0000-0000-0000-0000, ks. http://www.orcid.org. ORCID-tunniste suositellaan kerrottavaksi aina, jos sellainen on tekijällä olemassa. Rooli-kentässä ilmoitetaan raportoivan organisaation tekijän tai tekijöiden roolit. Erityisesti osatoteutusten tapauksessa tekijän rooli on tärkeä. Esimerkiksi teatteriesityksen lavastaja, taidenäyttelyn kuraattori, yhtyeen laulaja, jne.',
          SV: 'Forskare, som har varit med om att göra publikationen och som hör till organisationen. Organisationens fakulteter, avdelningar, institutioner eller enheter inom vilka publikationens upphovsmän är anställda. ORCID-identifieringsnumren, t.ex. 0000-0000-0000-0000, på den rapporterande organisationens egna upphovsmän, se http://www.orcid.org',
          EN: 'Authors at the organisation involved in producing the publication. Faculties, departments or units of the organisation whose staff includes the authors of the publication. The ORCID identifiers of authors from the reporting organisation, e.g. 0000-0000-0000-0000, refer to http://www.orcid.org. Role(s) of the reporting organisations author(s). Especially related to the partial realisations the role of the author is important. For example, scenographer of a play, trustee of a exhibition, singer of a band, etc. '
        },
	
        sukunimi: { FI: 'Sukunimi', SV: 'Efternamn', EN: 'Surname', picktip: { FI: 'Sukunimi', SV: 'Efternamn', EN: 'Surname' } },
        etunimet: { FI: 'Etunimet', SV: 'Förnamn', EN: 'First names', picktip: { FI: 'Etunimet', SV: 'Förnamn', EN: 'First names' } },
        alayksikko: { FI: 'Alayksikkö', SV: 'Enhet', EN: 'Organisational unit', picktip: { FI: 'Alayksikkö', SV: 'Enhet', EN: 'Organisational unit' } },
        alayksikkovuosi: { FI: 'Alayksikkökoodiston vuosiversio', SV: 'Year of organisational unit', EN: 'Year of organisational unit',
          picktip: { FI: 'Valitse vuosi', SV: 'Choose year', EN: 'Choose year' },
          tooltip: {
            FI: 'Valitse Koodistopalvelun alayksiköistä tietyn vuoden vuosiversio. Oletuksena käytössä on aina uusin vuosiversio, mutta tarvittaessa voidaan käyttää myös vanhempaa vuosiversiota esim. vanhemmille julkaisuille.',
            SV: 'Choose the organisational units based on the Koodisto service by year. The service uses the most recent organisational units by default, but if necessary, older organisational units can be used as well.',
            EN: 'Choose the organisational units based on the Koodisto service by year. The service uses the most recent organisational units by default, but if necessary, older organisational units can be used as well.'
          }
        },
        orcid: { FI: 'ORCID', SV: 'ORCID', EN: 'ORCID', picktip: { FI: 'ORCID-numero', SV: 'ORCID iD', EN: 'ORCID iD' } },
        hrnumero: { FI: 'HRNUMERO', SV: 'HRNUMERO', EN: 'HRNUMERO', picktip: { FI: 'HR-numero', SV: 'HR numret', EN: 'HR number' } },
        tekijanrooli: { FI: 'Rooli', SV: 'Roll', EN: 'Role', picktip: { FI: 'Rooli', SV: 'Roll', EN: 'Role' } },
        lisaa: { FI: '+', SV: '+', EN: '+', tooltip: { FI: 'Lisää', SV: 'Lägg till ny', EN: 'Add' } },
        poista: { FI: '-', SV: '-', EN: '-', tooltip: { FI: 'Poista', SV: 'Ta bort', EN: 'Remove' } },
        kopioi: { FI: 'Kopioi tekijät',
          SV: 'Kopiera författarna',
          EN: 'Copy authors',
          tooltip: {
            FI: 'Kopioi julkaisun tekijät organisaation tekijöiksi',
            SV: 'Kopiera författarna till organisationens upphovsmän',
            EN: 'Copy authors as organisations authors'
          }
        }
      },
      projektinumero: {
        FI: "Projektinumero", SV: "Projektnummer", EN: "Project number",
        tooltip: { 
          FI: "Sen projektin numero, jossa julkaisu on tuotettu.", 
          SV: "Projektnummer där publikationen producerades.", 
          EN: "Project number in which the publication was produced." 
        }
      },
      konferenssinvakiintunutnimi: {
        FI: 'Konferenssin vakiintunut nimi',
        SV: 'Konferensens vedertagna namn',
        EN: 'Established conference name',
        tooltip: {
          FI: 'Konferenssin vakiintunut nimi ilman kirjainlyhennettä tai järjestys- ja vuosilukuja.',
          SV: 'Konferensens etablerade namn utan ordningsnummer, årtal och bokstavsförkortning.',
          EN: 'The established conference name without the ordinal and year and with no abbreviations.'
        },
        picktip: { FI: 'Kirjoita ja valitse konferenssin nimi', SV: 'Ange och välj konferensens namn', EN: 'Write and choose the conference name' }
      },
      emojulkaisunnimi: {
        FI: 'Emojulkaisun nimi',
        SV: 'Moderpublikationens namn',
        EN: 'Parent publication name',
        tooltip: {
          FI: 'Emojulkaisun nimi, jossa artikkeli on julkaistu.',
          SV: 'Namn på den moderpublikationen där artikeln har publicerats.',
          EN: 'Name of the parent publication in which the article was published.'
        },
		tooltipF: {
          FI: 'Taidealan julkaisun nimi, jonka osatoteutus raportoitava julkaisu on (jos raportoidaan F2). Tieto kerrotaan, jos se on tiedossa.',
          SV: '*SV',
          EN: 'Name of the artistic publication of which or partial realisation the reported publication is (if F2 reported). Reported if applicable.'
        },
        picktip: { FI: 'Kirjoita emojulkaisun nimi kokonaisuudessaan', SV: 'Skriv moderpublikationens namn i helhet', EN: 'Parent publication name in its entirety' }
      },
      isbn: {
        FI: 'ISBN',
        SV: 'ISBN',
        EN: 'ISBN',
        tooltip: {
          FI: 'Monografian tai emojulkaisun ISBN-numero ensisijaisesti painetun version mukaisesti. Jos painettua versiota ei ole, ilmoitetaan elektronisen version ISBN-numero.',
          SV: 'ISBN-numret för den serie i vilken monografin eller moderpublikationen har publicerats i första hand i enlighet med den tryckta versionen. Om en tryckt version saknas, meddelas den elektroniska versionens ISBN-nummer.',
          EN: 'Monograph or parent publication ISBN number according to the primary printed version. If there is no printed version, the ISBN number of the electronic version will be indicated.'
        },
		tooltipF: {
          FI: 'Julkaisun ISBN-tunniste. Tunnisteen oikeellisuus tarkistetaan. Huom. Nuoteissa, CD:ssä jne. on muitakin tuotetunnuksia.',
          SV: '*SV',
          EN: 'Publication ISBN number. Please note that there might be other identifiers for e.g. CDs or notes'
        },
        picktip: { FI: 'esim. 978-952-245-683-0', SV: 't.ex. 978-952-245-683-0', EN: 'e.g. 978-952-245-683-0' }
      },
      emojulkaisuntoimittajat: {
        FI: 'Emojulkaisun toimittajat',
        SV: 'Moderpublikationens redaktörer',
        EN: 'Parent publication editors',
        tooltip: {
          FI: 'Emojulkaisun toimittajat siinä muodossa ja järjestyksessä, jossa ne on listattu alkuperäisessä julkaisussa tai lähdetietokannassa.',
          SV: 'Det redigerade verkets redaktörer anges i den form och i den ordning som de nämns i den ursprungliga publikationen eller källdatabasen.',
          EN: 'Editors of the parent publication in the format and order in which they were listed in the original publication or source database.'
        }
      },
      lehdenjulkaisusarjannimi: {
        FI: 'Lehden / julkaisusarjan nimi',
        SV: 'Namn på tidskriften/serien',
        EN: 'Journal/series name',
        tooltip: {
          FI: 'Lehden/sarjan nimi mahdollisimman täydellisenä ja kokonaan auki kirjoitettuna (ei lyhenteitä).',
          SV: 'Namn på tidskriften/serien så fullständigt som möjligt och helt utskrivet (inga förkortningar).',
          EN: 'Journal/series name, as complete as possible, and spelled out (no abbreviations).'
        },
        picktip: { FI: 'Kirjoita ja valitse lehden/sarjan nimi', SV: 'Skriv och välj namn på tidskrift/serie', EN: 'Write and choose the journal/series name' }
      },
      issn: {
        FI: 'ISSN',
        SV: 'ISSN',
        EN: 'ISSN',
        tooltip: {
          FI: 'Lehden tai sarjan ISSN-numero ensisijaisesti painetun version mukaisesti. Jos painettua versiota ei ole, ilmoitetaan elektronisen version ISSN-numero.',
          SV: 'ISSN-numret för den serie i vilken tidskriften, monografin eller moderpublikationen har publicerats i första hand i enlighet med den tryckta versionen. Om en tryckt version saknas, meddelas den elektroniska versionens ISSN-nummer.',
          EN: 'The ISSN number of the series or of the journal according to the primary printed version. If there is no printed version, the ISSN number of the electronic version will be indicated.'
        },
		tooltipF: {
          FI: 'Raportoidaan mikäli taidealan julkaisulla on ISSN-numero. Jos painettua versiota ei ole, ilmoitetaan elektronisen version ISSN-numero.',
          SV: '*SV',
          EN: 'If available for artistic publication. If there is no printed version, the ISSN number of the electronic version will be indicated.'
        },
        picktip: { FI: 'esim. 1234-567X', SV: 't.ex. 1234-567X', EN: 'e.g. 1234-567X' }
      },
      volyymi: {
        FI: 'Volyymi',
        SV: 'Volym',
        EN: 'Volume',
        tooltip: {
          FI: 'Lehden tai sarjan volyymi, jossa artikkeli/teos on ilmestynyt.',
          SV: 'Tidskriftens eller seriens volym där artikeln har getts ut.',
          EN: 'Volume of the journal or series in which the article/scientific book appeared.'
        },
        picktip: { FI: 'esim. 45', SV: 't.ex. 45', EN: 'e.g. 45' }
      },
      numero: {
        FI: 'Numero',
        SV: 'Nummer',
        EN: 'Issue',
        tooltip: {
          FI: 'Lehden tai sarjan numero, jossa artikkeli/teos on ilmestynyt.',
          SV: 'Tidskriftens eller seriens nummer där artikeln har getts ut.',
          EN: 'Issue of the journal or series in which the article/scientific book appeared.'
        },
        picktip: { FI: 'esim. 3', SV: 't.ex. 3', EN: 'e.g. 3' }
      },
      sivut: {
        FI: 'Sivut',
        SV: 'Sidor',
        EN: 'Pages',
        tooltip: {
          FI: 'Lehden tai sarjan sivunumerot, joilla artikkeli on ilmestynyt. Ilmoitetaan siinä muodossa kuin ne on esitetty alkuperäisessä artikkelissa tai lähdetietokannassa.',
          SV: 'De sidnummer som artikeln har haft i samband med sin publicering i den ursprungliga artikeln eller i källdatabasen.',
          EN: 'Publication page numbers on which the article was published in the same format as in the original article or source database.'
        },
        picktip: { FI: 'esim. 98 - 113', SV: 't.ex. 98 - 113', EN: 'e.g. 98 - 113' }
      },
      artikkelinumero: {
        FI: 'Artikkelinumero',
        SV: 'Artikelns nummer',
        EN: 'Article number',
        tooltip: {
          FI: 'Lehden tai sarjan artikkelinumero, jolla artikkeli on ilmestynyt. Ilmoitetaan siinä muodossa kuin se on esitetty alkuperäisessä artikkelissa tai lähdetietokannassa.',
          SV: 'Det artikelnummer som artikeln har haft vid sin publicering i den form som numren har presenterats i den ursprungliga artikeln eller i källdatabasen.',
          EN: 'Journal/series article number used for the publication of the article in the same format as in the original article or source database.'
        },
        picktip: { FI: 'esim. 15', SV: 't.ex. 15', EN: 'e.g. 15' }
      },
      kustantaja: {
        FI: 'Kustantaja',
        SV: 'Förläggare',
        EN: 'Publisher',
        tooltip: {
          FI: 'Julkaisun kustantajan nimi mahdollisimman täydellisenä ja kokonaan auki kirjoitettuna (ei lyhenteitä).',
          SV: 'Namnet på publikationens förläggare så fullständigt som möjligt och helt utskrivet (inga förkortningar).',
          EN: 'Publisher’s name, as complete as possible, and spelled out (no abbreviations).'
        },
		tooltipF: {
          FI: 'Julkaisijan nimi mahdollisimman täydellisenä ja auki kirjoitettuna. Vastaa tieteellisten julkaisujen kustantajaa. Kustantaja tai julkaisija on se ulkopuolinen taho, joka on mahdollistanut taiteellisen toiminnan tuloksen julkiseksi tekemisen. Esimerkiksi tuottaja, galleristi tai kustantaja. Yhteystiedot raportoidaan tarvittaessa.',
          SV: '*SV',
          EN: 'Publisher’s name, as complete as possible, and spelled out (no abbreviations). Compares to scientific publishers. Publisher is the third party which has made it possible to make the artistis publication. E.g. producer, galleris or publisher. Can be reported if needed.'
        },
        picktip: { FI: 'Kirjoita kustantajan nimi', SV: 'Skriv publikationens förläggare', EN: 'Write the publisher’s name' }
      },
      julkaisunkustannuspaikka: {
        FI: 'Julkaisun kustannuspaikka',
        SV: 'Förlagsort',
        EN: 'Place of publishing',
        tooltip: {
          FI: 'Julkaisun kustantajan nimen yhteydessä ilmoitettu paikkakunta tai paikkakunnat.',
          SV: 'Ort eller orter som angetts i anslutning till namnet på publikationens förläggare.',
          EN: 'The place or places given in connection with the publication’s publisher.'
        },
		tooltipF: {
          FI: 'Julkaisijan / kustantajan nimen yhteydessä ilmoitettu paikkakunta tai paikkakunnat.',
          SV: '*SV',
          EN: 'The place or places given in connection with the publication’s publisher.'
        },
        picktip: { FI: 'esim. Helsinki', SV: 't.ex. Helsinki', EN: 'e.g. Helsinki' }
      },
      avainsanat: {
        FI: 'Avainsanat',
        SV: 'Nyckelord',
        EN: 'Key words',
        tooltip: {
          FI: 'Julkaisun sisältöä mahdollisimman hyvin kuvailevat avainsanat.',
          SV: 'Nyckelord som så bra som möjligt beskriver publikationens innehåll.',
          EN: 'Keywords that describe the content of the publication as accurately as possible.'
        },
        lisaa: { FI: '+', SV: '+', EN: '+', tooltip: { FI: 'Lisää', SV: 'Lägg till ny', EN: 'Add' } },
        poista: { FI: '-', SV: '-', EN: '-', tooltip: { FI: 'Poista', SV: 'Ta bort', EN: 'Remove' } },
        picktip: { FI: 'Kirjoita avainsana ja paina enter', SV: 'Skriv nyckelordet och tryck enter', EN: 'Type in the keyword and press enter' }
      },
      julkaisunkieli: {
        FI: 'Julkaisun kieli',
        SV: 'Publikationens språk',
        EN: 'Publication language',
        tooltip: {
          FI: 'Kieli, jolla julkaisu on kirjoitettu Tilastokeskuksen kielet 2003 -luokituksen mukaisesti.',
          SV: 'Det språk på vilket publikationen är skriven i enlighet med klassificeringen Statistikcentralens språk 2003.',
          EN: 'The language used to write the publication according to the Languages 2003 classification of Statistics Finland.'
        },
		tooltipF: {
          FI: '	Kieli, jolla julkaisu on tehty (jos se on määriteltävissä raportoitavan julkaisun tapauksessa). Vuoden 2003 TK:n kielikoodiston mukainen arvo.',
          SV: '*SV',
          EN: 'Language in which the publication is done (if possible to define in the case of the reported publication). Based on Languages 2003 classification of Statistics Finland'
        },
        picktip: { FI: 'Valitse kieli, esim. suomi', SV: 'Välj språk, t.ex. finska', EN: 'Choose language, e.g. Finnish' }
      },
      julkaisunkansainvalisyys: {
        FI: 'Julkaisun kansainvälisyys',
        SV: 'Publikationens internationalitet',
        EN: 'Internationality of publication',
        tooltip: {
          FI: 'Kotimaisen julkaisun julkaisija on suomalainen tai se on ensisijaisesti julkaistu Suomessa. Kansainvälisen julkaisun julkaisija ei ole suomalainen ja se on ensisijaisesti julkaistu muualla kuin Suomessa. Huom. Konferenssijulkaisun julkaisijalla tarkoitetaan sen kustantajaa.',
          SV: 'Utgivaren av en inhemsk publikation är finländsk eller publikationen har i första hand publicerats i Finland. Utgivaren av en utländsk publikation är inte finländsk eller publikationen har i första hand publicerats någon annanstans än i Finland. Utgivaren av en konferenspublikation avser förläggaren.',
          EN: 'The publisher of a Finnish publication is Finnish, or it was mainly published in Finland. The publisher of an international publication is not Finnish, or it was mainly published outside Finland. The publisher of a conference publication refers to the publishing house.'
        },
	    tooltipF: {
          FI: 'Kotimaisen julkaisun julkaisija on suomalainen tai se on ensisijaisesti julkaistu Suomessa. Kansainvälisen julkaisun julkaisija ei ole suomalainen tai se on ensisijaisesti julkaistu muualla kuin Suomessa. Esimerkiksi julkaisumaa ei ole Suomi.',
          SV: '*SV',
          EN: 'The publisher of a Finnish publication is Finnish, or it was mainly published in Finland. The publisher of an international publication is not Finnish, or it was mainly published outside Finland.'
        },
        '0': { FI: 'Kotimainen', SV: 'Inhemsk', EN: 'Domestic' },
        '1': { FI: 'Kansainvälinen', SV: 'Utländsk', EN: 'International' }
      },
      julkaisumaa: {
        FI: 'Julkaisumaa',
        SV: 'Utgivningsland',
        EN: 'Country of publication',
        tooltip: {
          FI: 'Julkaisumaa Tilastokeskuksen valtiot ja maat 2007 -luokituksen mukaisesti.',
          SV: 'Tidskriftens, seriens, monografins eller moderpublikationens utgivningsland enligt klassificeringen Statistikcentralens stater och länder 2007.',
          EN: 'Country of publication according to the countries 2007 classification of Statistics Finland.'
        },
		tooltipF: {
          FI: 'Taidealan julkaisun ensimmäinen julkistamismaa ja joka vastaa raportoitua julkaisuvuotta. Kentässä kerrotaan julkaisumaa. Lisätietona voi toimittaa tarkemmat tiedot, kuten paikkakunnan julkaisumaassa. Ks. julkistamispaikkakunta alla.',
          SV: '*SV',
          EN: 'Artistic publications first country of publication and one which corresponds to the reported year of publication. Reported according to the countries 2007 classification of Statistics Finland.'
        },
        picktip: { FI: 'Valitse maa, esim. Suomi', SV: 'Välj land, t.ex. Finland', EN: 'Choose country, e.g. Finland' }
      },
      julkistamispaikkakunta: {
        FI: 'Julkistamispaikkakunta',
        SV: 'Plats av utgivning',
        EN: 'Place of publication',
        tooltip: {
          FI: 'Paikka julkaisumaassa. Tiedolla voi tarkentaa julkaisumaan yhteydessä annettua tietoa. Usein tieto paikkakunnasta ja esimerkiksi esityksen paikasta on tärkeä.',
          SV: 'Platsen i utgivningslandet. Man kan ge mer specifik information om publikationens utgivningsplats.',
          EN: 'Place of publication in the country of publication. With this information it is possible to provide additional information releated to the publication country.'
        },
        picktip: {
          FI: 'esim. Helsinki, Kansallisteatteri',
          SV: 't.ex. Helsingfors, Finlands Nationalteater',
          EN: 'e.g. Helsinki, Finnish National Theatre'
        }
      },
      tapahtumanlisatieto: {
        FI: 'Tapahtuma',
        SV: 'Evenemang',
        EN: 'Event',
        tooltip: {
          FI: 'Missä tapahtumassa julkaisu on esitetty.',
          SV: 'Evenemanget där publikationen har framställts.',
          EN: 'The event where the publication is performed'
        },
        picktip: {
          FI: 'esim. Sodankylän elokuvafestivaalit',
          SV: 't.ex. Sodankylä filmfestival',
          EN: 'e.g. Sodankylä Film Festival'
        }
      },
      tieteenala: {
        FI: 'Julkaisun tieteenalat',
        SV: 'Publikationens vetenskapsområde',
        EN: 'Field of science of the publication',
        tooltip: {
          FI: '1-6 alatieteenalaa Tilastokeskuksen tieteenalaluokituksen mukaan siinä järjestyksessä, mitä alatieteenalaa julkaisu eniten koskee. Ensimmäinen, ns. ensisijainen alatieteenala, on pakollinen tieto.',
          SV: '1–6 sekundära vetenskapsområden enligt Statistikcentralens klassificering av vetenskapsområden med det sekundära vetenskapsområde först som publikationen i första hand berör. Det sekundära vetenskapsområdet måste anges.',
          EN: 'One to six secondary fields of science according to the field of science classification of Statistics Finland in the order of relevance of each secondary field of science to the publication. The secondary field of science is mandatory.'
        },
		tooltipF: {
          FI: 'Käytetään sopivinta alatieteenalaa johdettuna taiteenalasta. 1-6 alatieteenalaa Tilastokeskuksen tieteenalaluokituksen mukaan siinä järjestyksessä, mitä alatieteenalaa julkaisu eniten koskee. Ensimmäinen, ns. ensisijainen alatieteenala, on pakollinen tieto.',
          SV: '*SV',
          EN: 'Use the most appropriate secondary field of science based on the field of art. One to six secondary fields of science according to the field of science classification of Statistics Finland in the order of relevance of each seconadry field of science to the publication. The secondary field of science is mandatory.'
        },
        lisaa: { FI: '+', SV: '+', EN: '+', tooltip: { FI: 'Lisää', SV: 'Lägg till ny', EN: 'Add' } },
        poista: { FI: '-', SV: '-', EN: '-', tooltip: { FI: 'Poista', SV: 'Ta bort', EN: 'Remove' } },
        paa: { picktip: { FI: 'Rajaa päätieteenala', SV: 'Filter efter primära vetenskapsområdet', EN: 'Filter by primary field of science' } },
        ala: { picktip: { FI: 'Valitse alatieteenala', SV: 'Välj sekundära vetenskapsområdet', EN: 'Choose secondary field of science' } }
      },
      taiteenala: {
        FI: 'Julkaisun taiteenalat',
        SV: 'Publikationens konstområden',
        EN: 'Field of art of the publication',
        tooltip: {
          FI: 'Taideala viittaa julkaisun ensisijaiseen ilmenemismuotoon. Tapauksissa joissa ilmenemismuotoa ei voida määritellä taiteenaloittain, valitaan se taiteenala mihin taidejulkaisu liittyy. Esimerkiksi äänitaide voi kirjautua musiikin, elokuvan, nykytaiteen tai esittävän taiteen alle. Taiteenalat perustuvat JURE-projektin taiteellisen toiminnan työryhmän luokitteluun.',
          SV: '*SV',
          EN: 'Field of art type categories can be reported in case they are collected in the reporting organization system. The type categories remind roles, but instead of being qualities of the author, they are qualities of the product. Reporting the roles is recommended. Type category following the classification from JURE-working group.'
        },
        lisaa: { FI: '+', SV: '+', EN: '+', tooltip: { FI: 'Lisää', SV: 'Lägg till ny', EN: 'Add' } },
        poista: { FI: '-', SV: '-', EN: '-', tooltip: { FI: 'Poista', SV: 'Ta bort', EN: 'Remove' } },
        picktip: { FI: 'Valitse taiteenala', SV: 'Välj konstområde', EN: 'Choose field of art' }
      },
      taidealantyyppikategoria: {
        FI: 'Taidealan tyyppikategoriat',
        SV: 'Typkategori',
        EN: 'Field of art type categories',
        tooltip: {
          FI: 'Tyyppikategoriat muistuttavat roolia, mutta ne ovat tuotoksen ominaisuus siinä missä rooli on tekijän ominaisuus.',
          SV: 'Typkategorier liknar roller men är verkets egenskaper medan med roll hänvisas till verkets upphovsman.',
          EN: 'Type categories resemble roles, but are a feature of the production/publication when again role is a feature of the author/maker'
        },
        lisaa: { FI: '+', SV: '+', EN: '+', tooltip: { FI: 'Lisää', SV: 'Lägg till ny', EN: 'Add' } },
        poista: { FI: '-', SV: '-', EN: '-', tooltip: { FI: 'Poista', SV: 'Ta bort', EN: 'Remove' } },
        picktip: { FI: 'Valitse taiteenalan tyyppikategoria', SV: 'Välj typkategori', EN: 'Choose type category of the field of art' }
      },
      kansainvalinenyhteisjulkaisu: {
        FI: 'Kansainvälinen yhteisjulkaisu',
        SV: 'Internationell sampublikation',
        EN: 'International co-publication',
        tooltip: {
          FI: 'Kansainvälisen yhteisjulkaisun tekijöistä vähintään yksi on affilioitunut muuhun kuin suomalaisen organisaatioon (myös jos tekijällä on affiliaatio sekä suomalainen että ulkomaalaiseen organisaatioon).',
          SV: 'Minst en av den internationella sampublikationens upphovsmän har anknytning till en annan organisation än en finländsk (också om upphovsmannen har anknytning till både en finländsk och en utländsk organisation).',
          EN: 'At least one author of the international co-publication is affiliated to a non-Finnish organisation (the author may also be affiliated to both a Finnish and foreign organisation).'
        },
		tooltipF: {
          FI: 'Mikäli julkaisun tekijöistä vähintään yksi on affilioitunut muuhun kuin suomalaiseen organisaatioon. Raportoidaan myös, jos tekijällä on affiliaatio sekä suomalaiseen että ulkomaalaiseen organisaatioon.',
          SV: '*SV',
          EN: 'At least one author of the international co-publication is affiliated to a non-Finnish organisation (the author may also be affiliated to both a Finnish and foreign organisation).'
        },
        '1': { FI: 'Kyllä', SV: 'Ja', EN: 'Yes' },
        '0': { FI: 'Ei', SV: 'Nej', EN: 'No' }
      },
      yhteisjulkaisuyrityksenkanssa: {
        FI: 'Yhteisjulkaisu yrityksen kanssa',
        SV: 'Sampublikation med ett företag',
        EN: 'Co-publication with a company',
        tooltip: {
          FI: 'Julkaisun tekijöistä vähintään yksi on affilioitunut kansalliseen tai kansainväliseen yritykseen (myös jos tekijällä on affiliaatio sekä tutkimusorganisaatioon että yritykseen). Yrityksellä tarkoitetaan muita yrityksiä kuin valtio-omisteisia valtion erityistehtäviä toteuttavia yhtiöitä (esim. VTT).',
          SV: 'Minst en av publikationens upphovsmän har anknytning till ett nationellt eller internationellt företag (också om upphovsmannen har anknytning till både en forskningsorganisation och ett företag.) Med ett företag avses andra företag än bolag som sköter statens specialuppgifter (t.ex. VTT).',
          EN: 'At least one author of the publication is affiliated to a national or international company (the author may also be affiliated both to a research organisation and a company). Company refers to an enterprise other than a state-owned group carrying out specific government tasks (such as VTT Technical Research Centre of Finland Ltd).'
        },
        '1': { FI: 'Kyllä', SV: 'Ja', EN: 'Yes' },
        '0': { FI: 'Ei', SV: 'Nej', EN: 'No' }
      },
      doitunniste: {
        FI: 'DOI tunniste',
        SV: 'DOI-identifieringsnummer',
        EN: 'DOI identifier',
        tooltip: {
          FI: 'Julkaisun DOI-tunniste, esim. 10.1111/j.1398-9995.2011.02728.x',
          SV: 'Publikationens DOI-identifieringsnummer, t.ex. 10.1111/j.1398-9995.2011.02728.x',
          EN: 'The DOI identifier of the publication e.g. 10.1111/j.1398-9995.2011.02728.x'
        },
        picktip: { FI: 'esim. 10.1111/j.1398-9995.2011.02728.x', SV: 't.ex. 10.1111/j.1398-9995.2011.02728.x', EN: 'e.g. 10.1111/j.1398-9995.2011.02728.x' }
      },
      muutunniste: {
        FI: 'Muu tunniste',
        SV: 'Annan identifierare',
        EN: 'Other identifier',
        tooltip: {
          FI: 'Esimerkiksi CD:n, nuotin, jne tuotetunniste tai -tunnisteet.',
          SV: 'T.ex. Identifierare för en CD-skiva, noter eller en annan produkt',
          EN: 'e.g. Identifier of a CD, note or other product'
        },
        picktip: {
          FI: 'Kirjoita julkaisun muu tunniste',
          SV: 'Skriv en annan identifierare',
          EN: 'Write other identifier of the publication'
        }
      },
      pysyvaverkkoosoite: {
        FI: 'Pysyvä verkko-osoite',
        SV: 'Bestående webbadress',
        EN: 'Permanent website address',
        tooltip: {
          FI: 'Julkaisun pysyviin tunnisteisiin (esim. DOI, URN tai handle) perustuva verkko-osoite, joka vie suoraan julkaisun kokotekstiversioon (vapaasti saatavilla olevaan tai kustantajan palvelimella sijaitsevaan käyttöoikeudeltaan rajoitettuun versioon).',
          SV: 'Webbadress som grundar sig på publikationens permanenta identifiering (t.ex. DOI, URN eller handle) och som leder direkt till publikationens kompletta textversion (fritt tillgängliga version eller en version med begränsad användarrätt på förläggarens server).',
          EN: 'Website address based on permanent identifiers (e.g. DOI, URN or handle) of the publication that takes the user directly to the full text version of the publication (a publicly available version or a limited access version on the publisher\'s server).'
        },
        picktip: { FI: 'esim. http://dx.doi.org/10.1002/hyp.10221', SV: 't.ex. http://dx.doi.org/10.1002/hyp.10221', EN: 'e.g. http://dx.doi.org/10.1002/hyp.10221' }
      },
      avoinsaatavuus: {
        FI: 'Avoin saatavuus',
        SV: 'Fri tillgänglighet',
        EN: 'Open access',
        tooltip: {
          FI: '',
          SV: '',
          EN: ''
        },
        '0': { FI: 'Ei vastausta', SV: 'Inget svar', EN: 'No answer' },
        '1': {
          FI: 'Open access -julkaisukanavassa ilmestynyt julkaisu',
          SV: 'Publicerad i Open Access -tidskrift',
          EN: 'Published in open access publication',
          tooltip: {
            FI: 'Julkaisukanavan kaikki julkaisut ovat avoimesti saatavilla.',
            SV: 'Alla publikationer i publikationskanalen fritt tillgängliga.',
            EN: 'All publications on the channel are openly accessible.'
          }
        },
        '2': {
          FI: 'Hybridijulkaisukanavassa ilmestynyt avoin julkaisu',
          SV: 'Öppet publicerad artikel i hybridtidskrift',
          EN: 'Published in hybrid open access journal',
          tooltip: {
            FI: 'Julkaisukanavassa on sekä avoimesti että ei-avoimesti saatavilla olevia julkaisuja.',
            SV: 'Fritt tillgängliga och icke-fritt tillgängliga publikationer i publikationskanalen',
            EN: 'The channel contains both open access and non-open access publications.'
          }
        }
      },
      julkaisurinnakkaistallennettu: {
          FI: 'Julkaisu on rinnakkaistallenne',
          SV: 'Lagrats parallelt publikationen',
          EN: 'Self-archived publication',
              '1': { FI: 'Kyllä', SV: 'Ja', EN: 'Yes' },
              '0': { FI: 'Ei', SV: 'Nej', EN: 'No' },
		  tooltip: {
			  FI: 'Rinnakkaistallenne on julkaisuarkistoon rinnakkaistallennettava julkaisun kopio. Valitse ei, mikäli kyseessä on esimerkiksi oman organisaatiosi julkaisusarja.',
			  SV: 'Lagrats pallelt publikationen är en kopia av publikationen som kommer att lagras i publikationarkivet. Välj nej, om publikationen ingår i din egen organisations publikationsserie.',
			  EN: 'Self-archived version is a copy of the publication that will be stored in the publication archive. Choose no, if the publication is part of your own organization\'s publication series.'
		  }
      },
      lisatieto: {
        FI: 'Lisätieto',
        SV: 'Tilläggsinformation',
        EN: 'Additional information',
        tooltip: {
          FI: 'Vapaatekstikenttä, johon voi kirjoittaa organisaation sisäiseen käyttöön lisätietoja julkaisuun liittyen.',
          SV: 'Textfält där man kan skriva kompletterande information om publikation för intern användning.',
          EN: 'Text field, where one can write addtional information considering the publication for the use of one\'s own organisation'
        },
        picktip: {
          FI: 'Kirjoita mahdollisia lisätietoja julkaisuun liittyen',
          SV: 'Skriv eventuell tilläggsinformation angående publikationen.',
          EN: 'Write possible additional information considering the publication'
        }
      },
      jufotunnus: { FI: 'JUFO-ID', SV: 'JUFO-ID', EN: 'JUFO-ID' },
      jufoluokitus: { FI: 'JUFO-luokitus', SV: 'JUFO-klassificering', EN: 'JUFO-classification' }
    },
    rinnakkaistallennusform: {
        rinnakkaistallennettava: {
            otsikko: {
               FI: 'Syötä julkaisun tiedosto',
               SV: 'Ange publikationsfil',
               EN: 'Enter publication file',
               tooltip : {
                 FI: 'Syötä julkaisuun liittyvä tiedosto, mikäli mahdollinen kustantaja on sen sallinut sekä kaikilta julkaisun tekoon osallistuneilta tekijöiltä on siihen lupa. Julkaisuun liittyvä tiedosto tulee tällöin avoimesti saataville julkaisuarkistoon organisaation pääkäyttäjän hyväksyttyä sen. Mikäli olet epävarma julkaisun syöttämisestä, ole yhteydessä oman organisaatiosi käyttötukeen.',
                 SV: 'Du kan ange publikationsfil om den möjliga utgivaren har tillåtit det och du har behörighet från alla författare att göra det. Publiceringsfilen publiceras sedan på publikationsarkivet när administratören har godkänt den. Om du är osäker på möjligheten att skriva in en publikationsfil, kontakta organisations helpdesk.',
                 EN: 'You can enter publication file if the possible publisher has allowed it and you have permission from all the authors to do so. The publication file will be then be made publicly available at publication archive when administrator has approved it. If you are unsure about the possibility to enter publication file, be in contact with the help desk.'
               }
            },
            form: {
                julkaisu: {
                  FI: 'Julkaisu',
                  SV: 'Publikation',
                  EN: 'Publication',
                  tooltip: {
                    FI: 'Valitse julkaisuun liittyvä tiedosto, joka siirtyy avoimesti saataville julkaisuarkistoon.',
                    SV: '*SV Valitse julkaisuun liittyvä tiedosto, joka siirtyy avoimesti saataville julkaisuarkistoon.',
                    EN: 'Choose and upload the correct publication file which will be made publicly available at publication archive.',
                  },
                  tiedosto: { 
                    valitse: { FI: 'Valitse tiedosto', SV: '*SV Valitse tiedosto', EN: 'Select file' },
                    eivalittu: { FI: 'Ei valittua tiedostoa', SV: '*SV Ei valittua tiedostoa', EN: 'No file selected' },
                    veda: { FI: 'Tai vedä tiedosto tähän', SV: '*SV Tai vedä tiedosto tähän', EN: 'Or drag file here' },
                    poista: { FI: 'Poista', SV: 'Ta bort', EN: 'Remove' }
                  }
                },
                abstrakti: {
                    FI: 'Abstrakti',
                    SV: 'Abstrakt',
                    EN: 'Abstract',
                    tooltip: {
                        FI: 'Julkaisun abstrakti tai tiivistelmä. Siirtyy julkaisun mukana julkaisuarkistoon ja näkyy siellä julkaisun kuvailutekstinä.',
                        SV: '*SV Julkaisun abstrakti tai tiivistelmä. Siirtyy julkaisun mukana julkaisuarkistoon ja näkyy siellä julkaisun kuvailutekstinä.',
                        EN: 'Abstract or summary. Transferred to publication archive and shown as a description for the publication.',
                    }
                },
                urn: {
                  FI: 'URN-tunnus',
                  SV: '*SV URN-tunnus',
                  EN: 'URN identifier',
                  tooltip: {
                      FI: 'Julkaisulle luotava URN:NBN -pohjainen URN-tunnus, joka luodaan automaattisesti julkaisulle julkaisarkistoon siirron yhteydessä.',
                      SV: '*SV Julkaisulle luotava URN:NBN -pohjainen URN-tunnus, joka luodaan automaattisesti julkaisulle julkaisarkistoon siirron yhteydessä.',
                      EN: 'Publication will be automatically assigned with a URN:NBN based URN identifier when it is transferred to publication archive.',
                  },
                  generoi: {
                    FI: 'Luo URN-tunniste',
                    SV: 'Generera URN',
                    EN: 'Generate URN'
                  }
              },
              embargo: {
                FI: 'Embargo-aika',
                SV: '*SV Embargo-aika',
                EN: 'Embargo date',
                picktip: { FI: 'vvvv/kk/pp', SV: 'yyyy/mm/dd', EN: 'yyyy/mm/dd' },
                tooltip: {
                    FI: 'Ajankohta, jonka jälkeen julkaisu tulee avoimesti saataville julkaisuarkistossa. Voidaan jättää ilmoittamatta, jolloin julkaisu on pääkäyttäjän hyväksynnän jälkeen välittömästi avoimena saatavilla julkaisuarkistossa.',
                    SV: '*SV Ajankohta, jonka jälkeen julkaisu tulee avoimesti saataville julkaisuarkistossa. Voidaan jättää ilmoittamatta, jolloin julkaisu on pääkäyttäjän hyväksynnän jälkeen välittömästi avoimena saatavilla julkaisuarkistossa.',
                    EN: 'Date after which the publication will be made publicly available at the publication archive. It can be left empty so that the publication is made immediately publicly available when the administrator has approved it.',
                },
                puolivuotta: { FI: 'Puolen vuoden päähän', SV: '*SV Puolen vuoden päähän', EN: 'Set six months' },
                vuosi: { FI: 'Vuoden päähän', SV: '*SV Vuoden päähän', EN: 'Set one year' }
              },
              julkaisusarja: {
                  FI: 'Julkaisusarja',
                  SV: '*SV Julkaisusarja',
                  EN: 'Publications category',
                  tooltip: {
                      FI: 'Vapaasanakenttä, jossa voidaan määritellä julkaisulle esimerkiksi organisaatiokohtainen julkaisusarja. Tieto välittyy julkaisuarkistoon ja sitä käytetään julkaisusarjojen näyttämiseen.',
                      SV: '*SV Vapaasanakenttä, jossa voidaan määritellä julkaisulle esimerkiksi organisaatiokohtainen julkaisusarja. Tieto välittyy julkaisuarkistoon ja sitä käytetään julkaisusarjojen näyttämiseen.',
                      EN: 'Field which can be used to determine e.g. organization specific publication series. Transferred to publication archive and is used to display publication series.',
                  }
              },
              oikeudet: {
                  FI: 'Oikeudet',
                  SV: '*SV Oikeudet',
                  EN: 'Rights',
                  value: {
                    'All rights reserved': { FI: "Kaikki oikeudet pidätetään", SV: "All rights reserved", EN: 'All rights reserved' },
                     'CC BY 4.0': { FI: "Nimeä", SV: "Erkännande", EN: "Attribution" },
                     'CC BY-SA 4.0': { FI: "Nimeä - Jaa samoin", SV: "Dela lika", EN: "Share-alike" },
                     'CC BY-NC 4.0':  { FI: "Nimeä-Eikaupallinen", SV: "Erkännande-Icke-Kommersiell", EN: "Attribution-NonCommercial" },
                     'CC BY-ND 4.0':  { FI: "Nimeä-EiMuutoksia", SV: "Erkännande-IngaBearbetningar 4.0 Internationell", EN: "Attribution-NoDerivatives 4.0 International" },
                     'CC BY-NC-SA 4.0':  { FI: "Nimeä-EiKaupallinen-JaaSamoin", SV: "Erkännande-Icke-Kommersiell-DelaPåSammaVillkor 4.0 Internationell", EN: "Attribution-NonCommercial-ShareAlike 4.0 International" },
                     'CC BY-NC-ND 4.0':  { FI: "Nimeä-EiKaupallinen-EiMuutoksia", SV: "Erkännande-Ickekommersiell-IngaBearbetningar 4.0 Internationell", EN: "Attribution-NonCommercial-NoDerivatives 4.0 International" }
                  },
                  tooltip: {
                    FI: 'Määrittele oikeudet tai mahdollinen lisenssitieto julkaisulle. Tieto oikeuksista tai lisenssistä siirtyy julkaisun mukana julkaisuarkistoon ja näkyy siellä julkaisun ohessa.',
                    SV: '*SV Määrittele oikeudet tai mahdollinen lisenssitieto julkaisulle. Tieto oikeuksista tai lisenssistä siirtyy julkaisun mukana julkaisuarkistoon ja näkyy siellä julkaisun ohessa.',
                    EN: 'Choose rights or possible license for the publication. Information on rights is transferred to publication archive and shown with the publication.'
                  },
                  picktip: { FI: '-- Valitse --', SV: '-- Välj --', EN: '-- Choose --' }

              },
                versio: {
                    FI: 'Versio',
                    SV: 'Version',
                    EN: 'Version',
                    value: {
                        '0': {FI: 'Final draft', SV: 'Final draft', EN: 'Final draft'},
                        '1': {FI: 'Kustantajan versio', SV: 'Publisher\'s version', EN: 'Publisher\'s version'},
                        '2': {FI: 'Pre-print versio', SV: 'Pre-print', EN: 'Pre-print'}
                    },
                    tooltip: {
                      FI: 'Valitse tallennetun julkaisun versio. Final draft: Vastaa sisällöltään täysin valmista kustantajan julkaisemaa versiota, mutta tätä versiota ei yleensä ole taitettu lopulliseen ulkoasuun eli siitä puuttuvat lopullisessa kustantajan julkaisemassa versiossa olevat logot, sivunumerot eli lehden ilme. Kustantajan versio: Kustantajan tuottama taitettu ja visuaalisesti valmis versio. Pre-print: Käsikirjoitusversio, jonka kirjoittaja on lähettänyt kustantajalle ja jota ei ole vertaisarvioitu. Ei siis välttämättä sisällöltään lopullinen versio artikkelista.',
                      SV: '*SV Valitse tallennetun julkaisun versio. Final draft: Vastaa sisällöltään täysin valmista kustantajan julkaisemaa versiota, mutta tätä versiota ei yleensä ole taitettu lopulliseen ulkoasuun eli siitä puuttuvat lopullisessa kustantajan julkaisemassa versiossa olevat logot, sivunumerot eli lehden ilme. Kustantajan versio: Kustantajan tuottama taitettu ja visuaalisesti valmis versio. Pre-print: Käsikirjoitusversio, jonka kirjoittaja on lähettänyt kustantajalle ja jota ei ole vertaisarvioitu. Ei siis välttämättä sisällöltään lopullinen versio artikkelista.',
                      EN: 'Choose the correct version of publication. Final draft: Corresponds to fully-edited version of the publisher\'s version, but is not finalized (e.g. is missing logos, page numbers, look of the publisher\'s version). Publisher\'s version: Publication that is the final publisher\'s version with the correct layout and look. Pre-print: Manuscript version, which has been sent to publisher but not yet peer-reviewed.'
                    },
                    picktip: { FI: '-- Valitse --', SV: '-- Välj --', EN: '-- Choose --' }

                },
                tyhjenna: {
                  FI: 'Tyhjennä', SV: 'Ta bort', EN: 'Remove'

                }
          }
      },
      rinnakkaistallennettumuualle: {
          otsikko: {
            FI: 'Julkaisu rinnakkaistallennettu muualle',
            SV: 'Publikationen har lagrats parallelt',
            EN: 'Publication self-archived elsewhere',
            tooltip : {
                FI: 'Julkaisu on rinnakkaistallennettu organisaatio- tai tieteenalakohtaiseen julkaisuarkistoon joko välittömästi tai kustantajan määrittämän kohtuullisen mittaisen embargoajan jälkeen. Julkaisu voi olla joko ns. kustantajan versio tai tutkijan oma viimeinen (vertaisarvioitu) versio.',
                SV: 'Publikationen har lagrats parallellt i ett organisations- eller vetenskapsområdesspecifikt publikationsarkiv antingen omedelbart eller efter en rimlig embargotid som förläggaren har fastställt. Publikationen kan vara en s.k. förläggarversion eller forskarens egen, sista (referentgranskade) version.',
                EN: 'The publication is self-archived in the publication archive of the organisation or the  field  of  science,  whether  immediately  or  after a reasonable embargo specified by the publisher. The publication may be a so called publisher’s version or the author’s final (refereed) version.'
            }
          },
          form: {
            rinnakkaistallennetunversionverkkoosoite: {
                FI: 'Rinnakkaistallennetun version verkko-osoite',
                SV: 'Den parallellt lagrade versionens webbadress',
                EN: 'Website address of the self-archived version',
                tooltip: {
                    FI: 'Organisaatio- tai tieteenalakohtaiseen julkaisuarkistoon rinnakkaistallennetun version verkko-osoite (esim. URN).',
                    SV: 'Webbadressen (t.ex. URN) på den version av publikationen som har lagrats parallellt i ett organisations- eller vetenskapsområdesspecifikt publikationsarkiv.',
                    EN: 'The website address of the self-archived version of the publication stored in the organisation- or field-specific archive (e.g. URN).'
                }
            },
          }
      },
      eirinnakkaistallennettava: {
          FI: 'Ei rinnakkaistallennattava julkaisu',
          SV: '*SV Ei rinnakkaistallennattava julkaisu',
          EN: 'Not self-archivable publication',
          tooltip: {
            FI: 'Julkaisu ei ole rinnakkaistallennettava, sitä ei ole tarve rinnakkaistallentaa tai rinnakkaistallennus tehdään myöhemmin. Siirry suoraan esikatseluun.',
            SV: '*SV Julkaisu ei ole rinnakkaistallennettava, sitä ei ole tarve rinnakkaistallentaa tai rinnakkaistallennus tehdään myöhemmin. Siirry suoraan esikatseluun.',
            EN: 'Publication is not self-archivable, there is no need to self-archive or the self-archiving will be done later. Proceed to preview.'
          }
      }
    },
    tietojensyotto: {
      yleiset: { FI: 'Yleiset julkaisutiedot', SV: 'Allmänna uppgifter', EN: 'General publication information' },
      bibliografiset: { FI: 'Bibliografiset tiedot', SV: 'Bibliografiska uppgifter', EN: 'Bibliographic information' },
      muut: { FI: 'Muut julkaisutiedot', SV: 'Övriga uppgifter', EN: 'Other information' },
      taytaviela: {
        FI: 'Täytä vielä',
        SV: 'Fyll ännu i',
        EN: 'Required information',
        korosta: { FI: 'korosta', SV: 'markera', EN: 'highlight' },
        poistakorostus: { FI: 'poista korostus', SV: 'ta bort markeringen', EN: 'remove highlight' }
      },
      rinnakkaistallennusvalinta: { FI: 'Siirry julkaisun tiedoston valintaan', SV: 'Fortsätt till publikation av filval', EN: 'Proceed to publication file selection' },
      jatka: { FI: 'Siirry esikatseluun', SV: 'Förhandsgranska', EN: 'Preview' },
      keskeyta: { FI: 'Hylkää ja mene omiin tallennuksiin', SV: 'Avbryt och go till egna publikationer ', EN: 'Discard and go to saved publications' }
    },
    tallennus: {
      tallenna: { FI: 'Tallenna tiedot ja siirry julkaisulistaukseen', SV: 'Spara och gå till publikationslistan', EN: 'Save changes and go to publication list' },
      hylkaa: { FI: 'Hylkää ja palaa omiin tallennuksiin', SV: 'Avbryt och gå till egna publikationer', EN: 'Discard and return to saved publications' }
    },
    vaihevuo: {
      julkaisutyyppi: { FI: 'Valitse julkaisutyyppi', SV: 'Välj publikationstyp', EN: 'Choose publication type' },
      esitayta: { FI: 'Esitäytä tiedot', SV: 'Sök bland publikationer', EN: 'Prefill the form' },
      tietojensyotto: { FI: 'Syötä julkaisutiedot', SV: 'Mata in uppgifter', EN: 'Enter publication information' },
      julkaisunsyotto: { FI: 'Syötä julkaisu', SV: 'Mata in publikation', EN: 'Enter publication' },
      rinnakkaistallennus: { FI: "Rinnakkaistallennus", SV: "*SV Rinnakkaistallennus", EN: "*EN Rinnakkaistallennus" },
      tallennus: { FI: 'Tarkista ja tallenna', SV: 'Granska och spara', EN: 'Verify and save' }
    },
    tarkasta: {
      odottavat: { FI: 'Hyväksymistä odottavat julkaisut', SV: 'I väntan på godkännande', EN: 'Publications waiting for approval' },
      hyvaksytyt: { FI: 'Hyväksytyt julkaisut', SV: 'Godkända publikationer', EN: 'Approved publications' },
      julkaisuja: { FI: 'Julkaisuja', SV: 'Publikationer', EN: 'Publications' },
        table: {
        julkaisuid: { FI: 'JulkaisuID', SV: 'PublikationID', EN: 'PublicationID' },
        julkaisunnimi: { FI: 'Julkaisun nimi', SV: 'Publikationens namn/titel', EN: 'Publication name' },
        julkaisuntekijat: { FI: 'Julkaisun tekijät', SV: 'Publikationens upphovsmän', EN: 'Publication authors' },
        tila: { FI: 'Tila', SV: 'Status', EN: 'Status' },
        muokattu: { FI: 'Muokattu', SV: 'Ändrad', EN: 'Edited' },
        viimeisinmuokkaaja: { FI: 'Viimeisin muokkaaja', SV: 'Senast ändrad av', EN: 'Last edit by' },
        julkaisu: { FI: 'Julkaisu', SV: 'Publikation', EN: 'Publication' },
        toiminnot: { FI: 'Toiminnot', SV: 'Funktioner', EN: 'Functions' },
        hyvaksy: { FI: 'Hyväksy', SV: 'Godkänd', EN: 'Approve' }
      },
      uusi: { FI: 'Tallenna uusi julkaisu', SV: 'Lägga till en ny publikation', EN: 'Save new publication' },
      csv: { FI: 'Lataa CSV-tiedostona', SV: 'Hämta som CSV', EN: 'Export to CSV'},
      haku: {
        tekija: { FI: 'Hae julkaisun tai tekijän nimellä', SV: 'Hae julkaisun tai tekijän nimellä', EN: 'Search by name or author' },
        julkaisuvuosi: { FI: 'Hae/rajaa hakua julkaisuvuoden perusteella', SV: 'Hae/rajaa hakua julkaisuvuoden perusteella', EN: 'Search/filter by year of publication'},
        julkaisuntila: { FI: 'Valitse julkaisuntila', SV: 'Valitse julkaisuntila', EN: 'Valitse julkaisuntila'},
      }
    },

    yes: { FI: 'Kyllä', SV: 'Ja', EN: 'Yes' },
    no: { FI: 'Ei', SV: 'Nej', EN: 'No' }
  }
};
