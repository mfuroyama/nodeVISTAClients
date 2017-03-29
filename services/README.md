# Service Interface Clients

Example node.js clients that show how to use the nodeVISTA clinical REST service interface.

These clients run on your __host__ machine (__not__ the nodeVISTA VM) and use _ES6 Promises_.

### Install Module Dependencies

__Note__: We assume that both _node_ and _npm_ are installed on your Machine.

Open a terminal on your host machine.

```text
$ cd nodeVISTAClients/services
$ npm install
```

### Start  the clinicalService
SSH into the __nodeVISTA__ guest virtual machine
```text
$ ssh vagrant@10.2.2.100
$ password: vagrant
$ su vdp -l
$ Password: vdp
$ cd nodevista
$ git pull
$ cd clinicalService
$ npm install
$ node index.js
{"name":"clinicalService","hostname":"addgene-ubuntu-1604-vbox","pid":17213,"level":30,
    "msg":"Clinical Service listening on port 9030","time":"2017-02-27T20:22:47.506Z","v":0}
```

### Ensure the clinicalService is running 
On the host terminal:
```text
$ cd nodeVISTAClients/services
$ curl http://10.2.2.100:9030
No authorization token was found  <-- This is the correct response and verifies service is available
```

### Execute the servicesProblems.js script
On the host terminal:
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
    "value": "2017-03-29T23:09:47Z",
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
    "value": "2017-03-29T23:09:47Z",
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
    "value": "2017-03-29T23:09:47Z",
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
    "value": "2017-03-29T23:09:47Z",
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
    "value": "2017-03-29T23:09:47Z",
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
    "value": "2017-03-29T23:09:47Z",
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
        "value": "2017-03-29T23:09:47Z",
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
      "value": "2017-03-29T23:09:47Z",
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
      "value": "2017-03-29T23:09:47Z",
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
      "value": "2017-03-29T23:09:47Z",
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
          "value": "2017-03-29T23:09:47Z",
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
    "value": "2017-03-29T23:09:47Z",
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
    "value": "2017-03-29T23:09:47Z",
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
    "value": "2017-03-29T23:09:47Z",
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
        "value": "2017-03-29T23:09:47Z",
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

```
