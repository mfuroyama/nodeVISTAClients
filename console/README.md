# Console Client

An example node.js client using es6 promises that interacts with the nodeVISTA clinical REST service interface.

### Install Dependencies
```text
$ npm install
```

### Ensure that the clinicalService is up and running

```text
curl http://10.2.2.100:9030
No authorization token was found
```
...or run the server manually


SSH into the nodeVISTA virtual machine
```text
$ vdp -l vdp
$ cd nodeVISTA/clincalService
$ npm install
$ node index.js
{"name":"clinicalService","hostname":"addgene-ubuntu-1604-vbox","pid":17213,"level":30,
    "msg":"Clinical Service listening on port 9030","time":"2017-02-27T20:22:47.506Z","v":0}
```

### Execute the console script
```text
node serviceClient.js

Authentication success! Received the access and refresh JWT tokens!


accessToken: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMDAtNjIiLCJmYWNpbGl0eUlkIjoiNC0yOTU3IiwiaWF0IjoxNDg4MjI3MjcyLCJleHAiOjE0ODgyMjgxNzIsInN1YiI6ImFjY2Vzc1Rva2VuIn0.I70Vb2KOGZmiid7VgJJNl987SwNYxidSNB8yQ4ViBSIaYL2Yj3o7gE97cHrIReOYlPloK4m_GtWRq9kCh2tYn3IP-xZ0ZuNZMmRTwJ1eZgRTDHm81zMVJqauAbY-N7mr2o0c3PZSNeGEA_nex3H12ICAQP9wnQv5XPjrU2S_Whmtrjud08geKuRnM0vn0skgLsx5K_kfXniFAWfO7pkh8Iadz1aUaV_74I3rvfLY4GAiE1lK_S5MORqT27SDKhnng0-2R1WAQYIeCkh3cc84fiKhTJtShxmIEQkWgu5_pQ5qtFhFBMEfPfAISOSjMmCh5HcIQqxPotG6HSczaAKcRpV-7v-msooAbj8Izr_msbXmzn9oH0FqOorP_wN7HN5Yx8hJH_TlO5WFuQwBGZBZUpMwcDcathv19av3p-rPT1stBSv_uY2Hy0uj5DJ0bGwE445HRE-qxRv8gDTO8MBT-MXcswbA0TpyHzDVFylC4uJAguhXa_t0vHdK2ywuWpIdxkVCsyAp7Txla_5YMXx748W7kJ8QdkhipbudTO6AhvRHqGo3TQnkbWiwfSRa2TmXwoFk4EKmMnqwaPkYLP-O6jpxN9Eolcx-AtD9SaykWGngKtS9N5Pew0xVKwaUgvlPRBYGXdA69KnaMfujYtFpEXdSTN7pcIpx-DE5mG27BvQ


refreshToken: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMDAtNjIiLCJmYWNpbGl0eUlkIjoiNC0yOTU3IiwiaWF0IjoxNDg4MjI3MjcyLCJleHAiOjE0ODgyMzA4NzIsInN1YiI6InJlZnJlc2hUb2tlbiJ9.Ee9cV_sl5_Kv8DDXMEFd4lf-eY_JbfQbpgdUlZmTJdGVm4KwAi-01fUs668KD_He7r0WLjrQFE8toJ8WS5BZCJqm2X2qyH2QvyxDwXx1YPvqND9rgTVPQ2K_mkg1gHUEu5JQCup-MtQFjUpguilkG7j4fFMBNE_-CFAgV6uMWcpT4gz8aqzuxswc_YZBjyP-XqKw7SKf6TmKEP8ofgnu-R9caxKGV9sRZ7Y8haBb_icBHzZMrKTbVzOCrY9dMz4Yq3cpXwRxwjI5fKCzlyiCTV7R_bU_fA6wvXu_Bauq9eOmRK0lqKGhEYubcscL9ys7DLdhVQXUCSiUHZoLm0Kwp7mo7Dl0DfATn9nb_4T5bvaG33n8-IIhxesqQNUo5kq1GPWFZsyk9V-sN7PPvl_QTZYuw6mj8StxPh84_3Oq49uxUuW-04VcF_a8WgxXAykdjUM9IACV0a9-HgA7h_r0oa7Owwy3DYZy4sHWUowiF68iMN_RveF0cxRfPsctxNpdaj3k5Pm7AdcvSQ1y_sVn0bjDi0f66ESWvQTeRxBaWAaikqcBE6tYXrHvYmhU4PrLmqJFsUyQ-bppsi58MTxlImsiZblV1laLukfUJvimjahXcuFQep-8IKeIIWhIt4LFAqI8CKBIZX1Za7YcYSFXS6jlNPde_wlCFHZBS5Wk2tQ


Patient select success! Received a patient JWT token!


patientToken: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50SWQiOiIyLTI1IiwiaWF0IjoxNDg4MjI3MjczLCJleHAiOjE0ODgyMjgxNzMsInN1YiI6InBhdGllbnRUb2tlbiJ9.dGr1VnbEOtznW8XaU3ijx27jUEbLRy58Ba6g_MPCmSnAns4596RMQbzPklAehcDDaif8uVSjNMn5y4PhKWAOK-_5dsEoJzZ5X4GfJL--uYD8ZLAFIzdH4dDj60GjyP-_fXnBMVXY3H9TUfAJXjlBx61TAV_Tz9eFlsAvyo2QzAgMDcWDxoigA8ULUXpecAvQ7DeZtPxDASej2Hhx-J6XgMSoPH5ceQEchdHdex-YlhOHYb_tR6DLeCCJ_5WNSnIeyQhNIxTpuwGGxQGqNK52dvq3WP4yYQm3zpN0lRTRwlHkgOJ-lef9B33vsMMZgstoE4OSllgaLJJFGaRxEZGNyhNM8B0uoGFP-4K2lTuZr7yHPROFlindNuwElhpC8HQDbfP7pwZudXN7ZJqFu9iqKaPoJAROcWlE9-XkHgKwOFilCcoITKrLWiPPgTjR92ikeAHdes58JpbOyVNMsuvqoAdPJ2Xa37Wnfla2HhZvW4QlCHlq2TvxQ6Cn9uxRF41M_qdKu6XAx1CCco4quviNL1Uz-PF418Oy_lelDeL6Br6EH0eoMySye-X3dz_HwcQQeoG4pBRgqZ35UpslMr67stS-KsBIH_So43cWj4NYKj0belB10lCNTfOHsPH6Zx0P47MZU9yuQhAo2d8vs_z9aQQVJxOrWYH9HSU35AUKabk


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
    "value": "2017-02-27T20:27:53Z",
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
    "value": "2017-02-27T20:27:53Z",
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
    "value": "2017-02-27T20:27:53Z",
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
      "value": "2017-02-27T20:27:53Z",
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
      "value": "2017-02-27T20:27:53Z",
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
      "value": "2017-02-27T20:27:53Z",
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
          "value": "2017-02-27T20:27:54Z",
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
    "value": "2017-02-27T20:27:53Z",
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
    "value": "2017-02-27T20:27:53Z",
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
    "value": "2017-02-27T20:27:53Z",
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
        "value": "2017-02-27T20:27:54Z",
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
