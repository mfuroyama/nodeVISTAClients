# Service Interface Clients

Example node.js clients that show how to use the nodeVISTA clinical REST service interface.

These clients run on your __host__ machine (__not__ the nodeVISTA VM) and use _ES6 Promises_.

__Note__: We assume that both _node_ and _npm_ are installed on your Machine.

Open a terminal on your host machine and run the following commands:

### Install Module Dependencies
```text
$ cd nodeVISTAClients/services
$ npm install
```
### Ensure the nodeVISTA server is running 
```text
$ cd nodeVISTA/setup; vagrant reload
$ vagrant status
```
### Ensure the clinicalService is running 
```text
$ cd nodeVISTAClients/services
$ curl http://10.2.2.100:9030
No authorization token was found         <-- This is the correct response and verifies service is available
[         No response           ]        <-- Make sure nodeVISTA server and clinicalService are running.
```

### Execute the servicesProblems.js script
```text
$ cd nodeVISTAClients/services
$ node servicesProblems.js
```
The resulting response should be:

```text
Authentication success! Received the access and refresh JWT tokens!



Patient select success! Received a patient JWT token!



New problem successfully created!



{
  "id": "9000011-1",
  "type": "Problem",
  "name": "Diabetes mellitus (SCT 73211009)",
  "uniqueId": 1,
  "diagnosis": {
    "id": "80-521774",
    "label": "R69.",
    "sameAs": "icd9cm:r69."
  },
  "icdd": "ILLNESS, UNSPECIFIED",
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "lastModifiedDate": {
    "value": "2017-03-29T23:18:08Z",
    "type": "xsd:dateTime"
  },
  "providerNarrative": {
    "id": "9999999_27-1",
    "label": "Diabetes mellitus",
    "sameAs": "vuid:757-7065392"
  },
  "facility": {
    "id": "4-2957",
    "label": "VISTA HEALTH CARE"
  },
  "enteredDate": {
    "value": "2017-03-29T23:18:08Z",
    "type": "xsd:dateTime"
  },
  "problemStatus": "ACTIVE",
  "problem": {
    "id": "757_01-7130783",
    "label": "Diabetes mellitus",
    "sameAs": "vuid:757-7065392"
  },
  "condition": "PERMANENT",
  "enteredBy": {
    "id": "200-62",
    "label": "ALEXANDER,ROBERT"
  },
  "responsibleProvider": {
    "id": "200-62",
    "label": "ALEXANDER,ROBERT"
  },
  "clinic": {
    "id": "44-8",
    "label": "CLInicB"
  },
  "snomedCTConceptValue": "Diabetes mellitus",
  "snomedCTConceptCode": "73211009",
  "snomedCTDesignationCode": "121589010",
  "interestDate": {
    "value": "2017-03-29T23:18:08Z",
    "type": "xsd:dateTime"
  },
  "codingSystem": "10D"
}



Problem successfully updated!



{
  "id": "9000011-1",
  "problemStatus": "INACTIVE",
  "type": "Problem"
}



Describe problem success!



{
  "id": "9000011-1",
  "type": "Problem",
  "name": "Diabetes mellitus (SCT 73211009)",
  "uniqueId": 1,
  "diagnosis": {
    "id": "80-521774",
    "label": "R69.",
    "sameAs": "icd9cm:r69."
  },
  "icdd": "ILLNESS, UNSPECIFIED",
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "lastModifiedDate": {
    "value": "2017-03-29T23:18:08Z",
    "type": "xsd:dateTime"
  },
  "providerNarrative": {
    "id": "9999999_27-1",
    "label": "Diabetes mellitus",
    "sameAs": "vuid:757-7065392"
  },
  "facility": {
    "id": "4-2957",
    "label": "VISTA HEALTH CARE"
  },
  "enteredDate": {
    "value": "2017-03-29T23:18:08Z",
    "type": "xsd:dateTime"
  },
  "problemStatus": "INACTIVE",
  "problem": {
    "id": "757_01-7130783",
    "label": "Diabetes mellitus",
    "sameAs": "vuid:757-7065392"
  },
  "condition": "PERMANENT",
  "enteredBy": {
    "id": "200-62",
    "label": "ALEXANDER,ROBERT"
  },
  "responsibleProvider": {
    "id": "200-62",
    "label": "ALEXANDER,ROBERT"
  },
  "clinic": {
    "id": "44-8",
    "label": "CLInicB"
  },
  "snomedCTConceptValue": "Diabetes mellitus",
  "snomedCTConceptCode": "73211009",
  "snomedCTDesignationCode": "121589010",
  "interestDate": {
    "value": "2017-03-29T23:18:08Z",
    "type": "xsd:dateTime"
  },
  "codingSystem": "10D",
  "audits": [
    {
      "id": "125_8-1",
      "problem": {
        "id": "9000011-1",
        "label": "R69."
      },
      "fieldNumber": 0.12,
      "dateModified": {
        "value": "2017-03-29T23:18:08Z",
        "type": "xsd:dateTime"
      },
      "whoModified": {
        "id": "200-62",
        "label": "ALEXANDER,ROBERT"
      },
      "oldValue": "A",
      "newValue": "I",
      "requestingProvider": {
        "id": "200-62",
        "label": "ALEXANDER,ROBERT"
      }
    }
  ]
}



List problems success!



[
  {
    "id": "9000011-1",
    "type": "Problem",
    "name": "Diabetes mellitus (SCT 73211009)",
    "uniqueId": 1,
    "diagnosis": {
      "id": "80-521774",
      "label": "R69.",
      "sameAs": "icd9cm:r69."
    },
    "icdd": "ILLNESS, UNSPECIFIED",
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "lastModifiedDate": {
      "value": "2017-03-29T23:18:08Z",
      "type": "xsd:dateTime"
    },
    "providerNarrative": {
      "id": "9999999_27-1",
      "label": "Diabetes mellitus",
      "sameAs": "vuid:757-7065392"
    },
    "facility": {
      "id": "4-2957",
      "label": "VISTA HEALTH CARE"
    },
    "enteredDate": {
      "value": "2017-03-29T23:18:08Z",
      "type": "xsd:dateTime"
    },
    "problemStatus": "INACTIVE",
    "problem": {
      "id": "757_01-7130783",
      "label": "Diabetes mellitus",
      "sameAs": "vuid:757-7065392"
    },
    "condition": "PERMANENT",
    "enteredBy": {
      "id": "200-62",
      "label": "ALEXANDER,ROBERT"
    },
    "responsibleProvider": {
      "id": "200-62",
      "label": "ALEXANDER,ROBERT"
    },
    "clinic": {
      "id": "44-8",
      "label": "CLInicB"
    },
    "snomedCTConceptValue": "Diabetes mellitus",
    "snomedCTConceptCode": "73211009",
    "snomedCTDesignationCode": "121589010",
    "interestDate": {
      "value": "2017-03-29T23:18:08Z",
      "type": "xsd:dateTime"
    },
    "codingSystem": "10D",
    "audits": [
      {
        "id": "125_8-1",
        "problem": {
          "id": "9000011-1",
          "label": "R69."
        },
        "fieldNumber": 0.12,
        "dateModified": {
          "value": "2017-03-29T23:18:08Z",
          "type": "xsd:dateTime"
        },
        "whoModified": {
          "id": "200-62",
          "label": "ALEXANDER,ROBERT"
        },
        "oldValue": "A",
        "newValue": "I",
        "requestingProvider": {
          "id": "200-62",
          "label": "ALEXANDER,ROBERT"
        }
      }
    ]
  }
]
```
### Execute the servicesPceCpt.js script
```text
$ cd nodeVISTAClients/services
$ node servicesPceCpt.js
```
The resulting response should be:

```text
Authentication success! Received the access and refresh JWT tokens!



Patient select success! Received a patient JWT token!



New PCE cpt successfully created!



{
  "id": "9000010_18-1",
  "type": "VCPT",
  "cptType": {
    "id": "81-1",
    "label": "A0001",
    "sameAs": "cpt:a0001"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "providerNarrative": {
    "id": "9999999_27-1",
    "label": "Splint",
    "sameAs": "vuid:757-23366"
  },
  "quantity": 1,
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "original comments"
}



PCE cpt successfully updated!



{
  "id": "9000010_18-1",
  "providerNarrative": {
    "id": "9999999_27-1",
    "label": "Splint"
  },
  "quantity": 3,
  "comments": "updated comments",
  "type": "VCPT",
  "cptType": {
    "id": "81-1",
    "laxbel": "Splint"
  },
  "visit": {
    "id": "9000010-1"
  },
  "patient": {
    "id": "2-25"
  }
}



Describe PCE cpt success!



{
  "id": "9000010_18-1",
  "type": "VCPT",
  "cptType": {
    "id": "81-1",
    "label": "A0001",
    "sameAs": "cpt:a0001"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "providerNarrative": {
    "id": "9999999_27-1",
    "label": "Splint",
    "sameAs": "vuid:757-23366"
  },
  "quantity": 3,
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "updated comments"
}



List PCE cpts success!



[
  {
    "id": "9000010_18-1",
    "type": "VCPT",
    "cptType": {
      "id": "81-1",
      "label": "A0001",
      "sameAs": "cpt:a0001"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "providerNarrative": {
      "id": "9999999_27-1",
      "label": "Splint",
      "sameAs": "vuid:757-23366"
    },
    "quantity": 3,
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  }
]
```

### Execute the servicesPceDiagnosis.js script
```text
$ cd nodeVISTAClients/services
$ node servicesPceDiagnosis.js
```
The resulting response should be:

```text
Authentication success! Received the access and refresh JWT tokens!



Patient select success! Received a patient JWT token!



{
  "id": "9000010_07-1",
  "type": "VPOV",
  "povType": {
    "id": "80-521774",
    "label": "R69.",
    "sameAs": "icd9cm:r69."
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "providerNarrative": {
    "id": "9999999_27-1",
    "label": "Splint",
    "sameAs": "vuid:757-23366"
  },
  "primarySecondary": "PRIMARY",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "original comments"
}



PCE diagnosis successfully updated!



{
  "id": "9000010_07-1",
  "povType": {
    "id": "80-521774",
    "label": "R69."
  },
  "providerNarrative": {
    "id": "9999999_27-1",
    "label": "Arthritis"
  },
  "primarySecondary": "SECONDARY",
  "visit": {
    "id": "9000010-1"
  },
  "type": "VPOV",
  "patient": {
    "id": "2-25"
  }
}



Describe PCE diagnosis success!



{
  "id": "9000010_07-1",
  "type": "VPOV",
  "povType": {
    "id": "80-521774",
    "label": "R69.",
    "sameAs": "icd9cm:r69."
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "providerNarrative": {
    "id": "9999999_27-1",
    "label": "Splint",
    "sameAs": "vuid:757-23366"
  },
  "primarySecondary": "SECONDARY",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "original comments"
}



List PCE diagnosis success!



[
  {
    "id": "9000010_07-1",
    "type": "VPOV",
    "povType": {
      "id": "80-521774",
      "label": "R69.",
      "sameAs": "icd9cm:r69."
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "providerNarrative": {
      "id": "9999999_27-1",
      "label": "Splint",
      "sameAs": "vuid:757-23366"
    },
    "primarySecondary": "SECONDARY",
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "original comments"
  }
]
```

### Execute the servicesPceImmunization.js script
```text
$ cd nodeVISTAClients/services
$ node servicesPceImmunization.js
```
The resulting response should be:

```text
Authentication success! Received the access and refresh JWT tokens!



Patient select success! Received a patient JWT token!



New PCE immunization successfully created!



{
  "id": "9000010_11-9",
  "type": "VImmunization",
  "immunizationType": {
    "id": "9999999_14-1020",
    "label": "DTAP",
    "sameAs": "vuid:5197625"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "series": "SERIES 1",
  "reaction": "FEVER",
  "contraindicated": "NO (OK TO USE IN THE FUTURE)",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "dateTimeRecorded": {
    "value": "2017-10-19T16:13:28Z",
    "type": "xsd:dateTime"
  },
  "immunizationDocumenter": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "original comments"
}



PCE immunization successfully updated!



{
  "id": "9000010_11-9",
  "series": "SERIES 3",
  "reaction": "NONE",
  "contraindicated": "NO (OK TO USE IN THE FUTURE)",
  "visit": {
    "id": "9000010-1"
  },
  "comments": "updated comments",
  "type": "VImmunization",
  "immunizationType": {
    "id": "9999999_14-1020",
    "label": "DTAP"
  },
  "patient": {
    "id": "2-25"
  }
}



Describe PCE immunization success!



{
  "id": "9000010_11-9",
  "type": "VImmunization",
  "immunizationType": {
    "id": "9999999_14-1020",
    "label": "DTAP",
    "sameAs": "vuid:5197625"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "series": "SERIES 3",
  "reaction": "NONE",
  "contraindicated": "NO (OK TO USE IN THE FUTURE)",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "dateTimeRecorded": {
    "value": "2017-10-19T16:13:28Z",
    "type": "xsd:dateTime"
  },
  "immunizationDocumenter": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "updated comments"
}



List PCE immunizations success!



[
  {
    "id": "9000010_11-6",
    "type": "VImmunization",
    "immunizationType": {
      "id": "9999999_14-1020",
      "label": "DTAP",
      "sameAs": "vuid:5197625"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "series": "SERIES 3",
    "reaction": "NONE",
    "contraindicated": "NO (OK TO USE IN THE FUTURE)",
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "dateTimeRecorded": {
      "value": "2017-10-19T14:11:15Z",
      "type": "xsd:dateTime"
    },
    "immunizationDocumenter": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  },
  {
    "id": "9000010_11-7",
    "type": "VImmunization",
    "immunizationType": {
      "id": "9999999_14-1020",
      "label": "DTAP",
      "sameAs": "vuid:5197625"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "series": "SERIES 3",
    "reaction": "NONE",
    "contraindicated": "NO (OK TO USE IN THE FUTURE)",
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "dateTimeRecorded": {
      "value": "2017-10-19T14:11:34Z",
      "type": "xsd:dateTime"
    },
    "immunizationDocumenter": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  },
  {
    "id": "9000010_11-8",
    "type": "VImmunization",
    "immunizationType": {
      "id": "9999999_14-1020",
      "label": "DTAP",
      "sameAs": "vuid:5197625"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "series": "SERIES 3",
    "reaction": "NONE",
    "contraindicated": "NO (OK TO USE IN THE FUTURE)",
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "dateTimeRecorded": {
      "value": "2017-10-19T14:14:01Z",
      "type": "xsd:dateTime"
    },
    "immunizationDocumenter": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  },
  {
    "id": "9000010_11-9",
    "type": "VImmunization",
    "immunizationType": {
      "id": "9999999_14-1020",
      "label": "DTAP",
      "sameAs": "vuid:5197625"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "series": "SERIES 3",
    "reaction": "NONE",
    "contraindicated": "NO (OK TO USE IN THE FUTURE)",
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "dateTimeRecorded": {
      "value": "2017-10-19T16:13:28Z",
      "type": "xsd:dateTime"
    },
    "immunizationDocumenter": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  }
]
```

### Execute the servicesPcePatientEd.js script
```text
$ cd nodeVISTAClients/services
$ node servicesPcePatientEd.js
```
The resulting response should be:

```text
Authentication success! Received the access and refresh JWT tokens!



Patient select success! Received a patient JWT token!



New PCE patientEd successfully created!



{
  "id": "9000010_16-6",
  "type": "VPatientEd",
  "topicType": {
    "id": "9999999_09-612027",
    "label": "ALCOHOL USE AND MEDICAL PROBLEMS"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "levelOfUnderstanding": "POOR",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "original comments"
}



PCE patientEd successfully updated!



{
  "id": "9000010_16-6",
  "topicType": {
    "id": "9999999_09-9",
    "label": "VA-ADVANCE DIRECTIVES SCREENING"
  },
  "visit": {
    "id": "9000010-1"
  },
  "comments": "updated comments",
  "type": "VPatientEd",
  "patient": {
    "id": "2-25"
  }
}



Describe PCE patientEd success!



{
  "id": "9000010_16-6",
  "type": "VPatientEd",
  "topicType": {
    "id": "9999999_09-9",
    "label": "VA-ADVANCE DIRECTIVES SCREENING"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "levelOfUnderstanding": "POOR",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "updated comments"
}



List PCE patientEds success!



[
  {
    "id": "9000010_16-1",
    "type": "VPatientEd",
    "topicType": {
      "id": "9999999_09-9",
      "label": "VA-ADVANCE DIRECTIVES SCREENING"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "levelOfUnderstanding": "POOR",
    "comments": "updated comments"
  },
  {
    "id": "9000010_16-2",
    "type": "VPatientEd",
    "topicType": {
      "id": "9999999_09-9",
      "label": "VA-ADVANCE DIRECTIVES SCREENING"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "levelOfUnderstanding": "POOR",
    "comments": "updated comments"
  },
  {
    "id": "9000010_16-3",
    "type": "VPatientEd",
    "topicType": {
      "id": "9999999_09-9",
      "label": "VA-ADVANCE DIRECTIVES SCREENING"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "levelOfUnderstanding": "POOR",
    "comments": "updated comments"
  },
  {
    "id": "9000010_16-4",
    "type": "VPatientEd",
    "topicType": {
      "id": "9999999_09-9",
      "label": "VA-ADVANCE DIRECTIVES SCREENING"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "levelOfUnderstanding": "POOR",
    "comments": "updated comments"
  },
  {
    "id": "9000010_16-5",
    "type": "VPatientEd",
    "topicType": {
      "id": "9999999_09-9",
      "label": "VA-ADVANCE DIRECTIVES SCREENING"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "levelOfUnderstanding": "POOR",
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  },
  {
    "id": "9000010_16-6",
    "type": "VPatientEd",
    "topicType": {
      "id": "9999999_09-9",
      "label": "VA-ADVANCE DIRECTIVES SCREENING"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "levelOfUnderstanding": "POOR",
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  }
]
```

### Execute the servicesPceExam.js script
```text
$ cd nodeVISTAClients/services
$ node servicesPceExam.js
```
The resulting response should be:

```text
Authentication success! Received the access and refresh JWT tokens!



Patient select success! Received a patient JWT token!



New PCE exam successfully created!



{
  "id": "9000010_13-1",
  "type": "VExam",
  "examId": {
    "id": "9999999_15-9",
    "label": "ABDOMEN EXAM"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "result": "NORMAL",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "comment for ABDOMEN EXAM"
}



PCE exam successfully updated!



{
  "id": "9000010_13-1",
  "visit": {
    "id": "9000010-1"
  },
  "comments": "updated comments",
  "type": "VExam",
  "examId": {
    "id": "9000010_13-1"
  },
  "patient": {
    "id": "2-25"
  }
}



Describe PCE exam success!



{
  "id": "9000010_13-1",
  "type": "VExam",
  "examId": {
    "id": "9999999_15-1",
    "label": "GENERAL EXAM"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "result": "NORMAL",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "updated comments"
}



List PCE exams success!



[
  {
    "id": "9000010_13-1",
    "type": "VExam",
    "examId": {
      "id": "9999999_15-1",
      "label": "GENERAL EXAM"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "result": "NORMAL",
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  }
]

```

### Execute the servicesPceHealthFactor.js script
```text
$ cd nodeVISTAClients/services
$ node servicesPceHealthFactor.js
```
The resulting response should be:

```text
Authentication success! Received the access and refresh JWT tokens!



Patient select success! Received a patient JWT token!



New PCE healthFactor successfully created!



{
  "id": "9000010_23-1",
  "type": "VHealthFactors",
  "healthFactorId": {
    "id": "9999999_64-489",
    "label": "ABD AORTIC ANEURYSM 3.0-3.9 CM"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "levelSeverity": "MINIMAL",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "original comments"
}



PCE healthFactor successfully updated!



{
  "id": "9000010_23-1",
  "healthFactorId": {
    "id": "9999999_64-489",
    "label": "ABD AORTIC ANEURYSM 3.0-3.9 CM"
  },
  "levelSeverity": "MODERATE",
  "visit": {
    "id": "9000010-1"
  },
  "comments": "updated comments",
  "type": "VHealthFactors",
  "patient": {
    "id": "2-25"
  }
}



Describe PCE healthFactor success!



{
  "id": "9000010_23-1",
  "type": "VHealthFactors",
  "healthFactorId": {
    "id": "9999999_64-489",
    "label": "ABD AORTIC ANEURYSM 3.0-3.9 CM"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "levelSeverity": "MODERATE",
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "updated comments"
}



List PCE healthFactors success!



[
  {
    "id": "9000010_23-1",
    "type": "VHealthFactors",
    "healthFactorId": {
      "id": "9999999_64-489",
      "label": "ABD AORTIC ANEURYSM 3.0-3.9 CM"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "levelSeverity": "MODERATE",
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  }
]
```

### Execute the servicesPceSkin.js script
```text
$ cd nodeVISTAClients/services
$ node servicesPceSkin.js
```
The resulting response should be:

```text
Authentication success! Received the access and refresh JWT tokens!



Patient select success! Received a patient JWT token!



New PCE skin test successfully created!



{
  "id": "9000010_12-8",
  "type": "VSkinTest",
  "skinTestType": {
    "id": "9999999_28-7",
    "label": "CANDIDA",
    "sameAs": "vuid:5198079"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "results": "POSITIVE",
  "reading": 1,
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "comment for skin test"
}



PCE skin test successfully updated!



{
  "id": "9000010_12-8",
  "skinTestType": {
    "id": "9999999_28-7",
    "label": "CANDIDA",
    "sameAs": "vuid:5198079"
  },
  "results": "NEGATIVE",
  "reading": 1,
  "visit": {
    "id": "9000010-1"
  },
  "comments": "updated comments",
  "type": "VSkinTest",
  "patient": {
    "id": "2-25"
  }
}



Describe PCE skin test success!



{
  "id": "9000010_12-8",
  "type": "VSkinTest",
  "skinTestType": {
    "id": "9999999_28-7",
    "label": "CANDIDA",
    "sameAs": "vuid:5198079"
  },
  "patient": {
    "id": "2-25",
    "label": "CARTER,DAVID"
  },
  "visit": {
    "id": "9000010-1",
    "label": "2017-10-19T06:49:59Z"
  },
  "results": "NEGATIVE",
  "reading": 1,
  "orderingProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "encounterProvider": {
    "id": "200-62",
    "label": "MANAGER,SYSTEM"
  },
  "comments": "updated comments"
}



List PCE skin tests success!



[
  {
    "id": "9000010_12-7",
    "type": "VSkinTest",
    "skinTestType": {
      "id": "9999999_28-7",
      "label": "CANDIDA",
      "sameAs": "vuid:5198079"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "results": "NEGATIVE",
    "reading": 1,
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  },
  {
    "id": "9000010_12-8",
    "type": "VSkinTest",
    "skinTestType": {
      "id": "9999999_28-7",
      "label": "CANDIDA",
      "sameAs": "vuid:5198079"
    },
    "patient": {
      "id": "2-25",
      "label": "CARTER,DAVID"
    },
    "visit": {
      "id": "9000010-1",
      "label": "2017-10-19T06:49:59Z"
    },
    "results": "NEGATIVE",
    "reading": 1,
    "orderingProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "encounterProvider": {
      "id": "200-62",
      "label": "MANAGER,SYSTEM"
    },
    "comments": "updated comments"
  }
]

```
