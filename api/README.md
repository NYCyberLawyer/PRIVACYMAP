# API Build - Milestone 2

## Description

The deliverable in this stage will involve the integration of automated processes within the data flow mapping process.  With the identification of different data sets throughout the organization, users will be provided the opportunity to connect all sources via API to a core repository within the data privacy mapping dashboard. For example, the User may be able to connect an API from their cloud server that can show server location at any one time and be matched to the data type on that server. This data, hosted by the business itself,  will not only illustrate the origin, processing, and destination of each piece of private data within the organization, but will also provide the basis for any additional privacy activities (e.g. consent management).

Acceptance criteria: Please enter the specific details on what the deliverable must do to prove this milestone is complete.
Acceptance criteria would consist of the delivery of the following items:
- API Integration Function - API Integration capabilities. 
- Repository Module - Secure Data Repository Accessible illustrating data, location, type, and additional metadata required for privacy tracking. 


## API Description


All the API requests MUST have a header field  called “api-key” with the value of the user ID. 

The `API-KEY` must be requested to the system administrator.

Another header field to set is `Accept` with the value `application/json`.


### Get list of Companies

Retrieves a list of companies that the user has access to.


#### Request

`GET -	${BASE_URL}/company/`

#### Response
Example
```JSON
[
   {
       "id": "ckwqfrcio006462p87rwc3ips",
       "createdAt": "2021-12-03T13:41:47.424Z",
       "modifiedAt": "2021-12-03T13:41:47.424Z",
       "consultancyFirmId": "ckvjuluhp000008l40bgq5x3y",
       "businessContactEmail": "mmundell@kreitech.io",
       "businessContactName": "Marcelo Mundell",
       "businessContactPhone": "123131",
       "businessContactPosition": "Business Manager",
       "companyAddress": "Mario Cassinoni 1234",
       "companyEmail": "info@kreitech.io",
       "companyName": "Kreitech LLC",
       "companyPhone": "1231313",
       "technicalContactEmail": "amalaquina@kreitech.io",
       "technicalContactName": "Antonio Malaquina",
       "technicalContactPhone": "321313131",
       "technicalContactPosition": "CTO",
       "privacyLiaisonContactEmail": "sadad@kreitech.io",
       "privacyLiaisonContactName": "Someone who does not exists",
       "privacyLiaisonContactPhone": "23131313",
       "privacyLiaisonContactPosition": "sdada",
       "hrContactEmail": "mbude@kreitech.io",
       "hrContactName": "Melisa Bude",
       "hrContactPhone": "12313131",
       "hrContactPosition": "HR Manager"
   },
   {
       "id": "cky0o5sdb0000qbp87q0k100x",
       "createdAt": "2022-01-04T22:14:22.188Z",
       "modifiedAt": "2022-01-04T22:14:22.188Z",
       "consultancyFirmId": "ckvjuluhp000008l40bgq5x3y",
       "businessContactEmail": "dasdas@asdsad.com",
       "businessContactName": "sadsad",
       "businessContactPhone": "321313",
       "businessContactPosition": "sadsad",
       "companyAddress": "API 123",
       "companyEmail": "api@kreitech.io",
       "companyName": "Test API",
       "companyPhone": "123123123",
       "technicalContactEmail": "dsadsa@asdsad.com",
       "technicalContactName": "sdsadasda",
       "technicalContactPhone": "765434234",
       "technicalContactPosition": "sasasasad",
       "privacyLiaisonContactEmail": "sadasd@hdjsdas.io",
       "privacyLiaisonContactName": "dsadada",
       "privacyLiaisonContactPhone": "321313131",
       "privacyLiaisonContactPosition": "dsadadada",
       "hrContactEmail": "dasdasd@hdjsad.com.uy",
       "hrContactName": "sdsdasdadsa",
       "hrContactPhone": "12313131",
       "hrContactPosition": "dsadadad"
   }
]
```

### Get Company information

Retrieves a specific company with the apps that are contained within.


#### Request

`GET -  ${BASE_URL}/company/${COMPANY_ID}`

#### Response
Example
```JSON
{
   "company": {
       "id": "ckwv0hj7z1076h7p8sqbaz2za",
       "createdAt": "2021-12-06T18:33:06.191Z",
       "modifiedAt": "2021-12-06T18:33:06.191Z",
       "consultancyFirmId": "ckvjuluhp000008l40bgq5x3y",
       "businessContactEmail": "dsadasd@asdasd.com",
       "businessContactName": "dsadas",
       "businessContactPhone": "23131",
       "businessContactPosition": "sdada",
       "companyAddress": "sdasdasdas",
       "companyEmail": "dsadasd@asdasd.com",
       "companyName": "abtest LLC",
       "companyPhone": "32312312",
       "technicalContactEmail": "dsadasd@asdasd.com",
       "technicalContactName": "sdadasd",
       "technicalContactPhone": "23131",
       "technicalContactPosition": "dsadas",
       "privacyLiaisonContactEmail": "dsadasd@asdasd.com",
       "privacyLiaisonContactName": "dsadad",
       "privacyLiaisonContactPhone": "231312",
       "privacyLiaisonContactPosition": "dsadas",
       "hrContactEmail": "dsadasd@asdasd.com",
       "hrContactName": "dsadas",
       "hrContactPhone": "23213131",
       "hrContactPosition": "dsadasd"
   },
   "apps": [
       {
           "id": "cky1rwzuw0001q0p82oh7g3ac",
           "createdAt": "2022-01-05T16:47:16.621Z",
           "modifiedAt": "2022-01-05T16:47:16.621Z",
           "businessId": "ckwv0hj7z1076h7p8sqbaz2za",
           "applicableRegulations": [
               "GDPR",
               "HIPAA",
               "CCPA"
           ],
           "applicationDRRegionStored": "",
           "applicationHostingEntity": "AWS",
           "applicationHostingManagement": "Self Hosted",
           "applicationHostingType": "On Premise",
           "applicationName": "API APP",
           "applicationOwner": "Some dude",
           "applicationRegionStored": "centus",
           "applicationType": "service",
           "comments": "",
           "connectionType": "api",
           "dataRetentionReq": "5 years",
           "description": "sdasdas",
           "encryptedDataTransfer": true,
           "hasDRHosting": false,
           "hasNameAndInitials": false,
           "technologyOwner": "Other dude",
           "hasAge": false,
           "hasBillingHistory": false,
           "hasBiometricData": false,
           "hasBirthdate": false,
           "hasCivilJusticeInfo": false,
           "hasCriminalInfo": false,
           "hasDriversLicenceNumber": true,
           "hasEmailAddress": false,
           "hasEthnicOrigin": false,
           "hasFinancialInfo": true,
           "hasGender": false,
           "hasHealthInfo": false,
           "hasHomeAddress": false,
           "hasHouseholdInfo": false,
           "hasIdNumbers": false,
           "hasLocation": false,
           "hasMaritalStatus": false,
           "hasMedicalInfo": false,
           "hasMinorInfo": false,
           "hasMobileNumber": false,
           "hasNationality": false,
           "hasPhysicalCharacteristics": false,
           "hasReligiousPhilosophicalPoliticalBeliefs": false,
           "hasSexualBehaviour": false,
           "hasSocialMedia": false,
           "hasStudentInfo": true,
           "hasTelephoneNumber": false,
           "hasTradeUnionMembership": false,
           "hasUniqueDeviceId": false,
           "modules": [
               "dsad",
               " sdad",
               " asdasd"
           ],
           "linkedApps": [
               "ckwwft40z1245aip8t1lzg8ic",
               "ckwxu1jme01596vp82e06azjn",
               "PENDING"
           ]
       }
   ]
}
```

### Create a Company

Performs an insert of the company within the body of the request.


#### Request

`POST -	${BASE_URL}/company/`

Example (body content)
```JSON
{
   "companyName": "Test API",
   "companyAddress": "API 123",
   "companyPhone": "123123123",
   "companyEmail": "api@kreitech.io",

   "businessContactName": "sadsad",
   "businessContactPosition": "sadsad",
   "businessContactPhone": "321313",
   "businessContactEmail": "dasdas@asdsad.com",

   "technicalContactName": "sdsadasda",
   "technicalContactPosition": "sasasasad",
   "technicalContactPhone": "765434234",
   "technicalContactEmail": "dsadsa@asdsad.com",

   "privacyLiaisonContactName": "dsadada",
   "privacyLiaisonContactPosition": "dsadadada",
   "privacyLiaisonContactPhone": "321313131",
   "privacyLiaisonContactEmail": "sadasd@hdjsdas.io",

   "hrContactName": "sdsdasdadsa",
   "hrContactPosition": "dsadadad",
   "hrContactPhone": "12313131",
   "hrContactEmail": "dasdasd@adsadasd.com.uy"
}
```
### Create Application

Performs an insert of a new application in the company within the URI parameter.


#### Request

`POST -	${BASE_URL}/company/${COMPANY_ID}`

Example (body content)
```JSON
{
   "applicableRegulations": [
       "GDPR"
   ],
   "applicationDRRegionStored": "",
   "applicationHostingEntity": "AWS",
   "applicationHostingManagement": "Self Hosted",
   "applicationHostingType": "On Premise",
   "applicationName": "API APP",
   "applicationOwner": "Some dude",
   "applicationRegionStored": "centus",
   "applicationType": "service",
   "comments": "",
   "connectionType": "api",
   "dataRetentionReq": "5 years",
   "description": "sdasdas",
   "encryptedDataTransfer": true,
   "hasDRHosting": false,
   "hasNameAndInitials": false,
   "technologyOwner": "Other dude",
   "hasAge": false,
   "hasBillingHistory": false,
   "hasBiometricData": false,
   "hasBirthdate": false,
   "hasCivilJusticeInfo": false,
   "hasCriminalInfo": false,
   "hasDriversLicenceNumber": true,
   "hasEmailAddress": false,
   "hasEthnicOrigin": false,
   "hasFinancialInfo": true,
   "hasGender": false,
   "hasHealthInfo": false,
   "hasHomeAddress": false,
   "hasHouseholdInfo": false,
   "hasIdNumbers": false,
   "hasLocation": false,
   "hasMaritalStatus": false,
   "hasMedicalInfo": false,
   "hasMinorInfo": false,
   "hasMobileNumber": false,
   "hasNationality": false,
   "hasPhysicalCharacteristics": false,
   "hasReligiousPhilosophicalPoliticalBeliefs": false,
   "hasSexualBehaviour": false,
   "hasSocialMedia": false,
   "hasStudentInfo": true,
   "hasTelephoneNumber": false,
   "hasTradeUnionMembership": false,
   "hasUniqueDeviceId": false,
   "modules": [
       "dsad",
       " sdad",
       " asdasd"
   ],
   "linkedApps": [
       "ckwwft40z1245aip8t1lzg8ic",
       "ckwxu1jme01596vp82e06azjn",
       "PENDING"
   ]
}
```

### Update Company

Performs an update of the company within the URI parameter.


#### Request

`PUT -	${BASE_URL}/company/${COMPANY_ID}`

Example (body content)
```JSON
{
   "businessContactEmail": "dsadasd@asdasd.com",
   "businessContactName": "dsadas",
   "businessContactPhone": "23131",
   "businessContactPosition": "sdada",
   "companyAddress": "sdasdasdas",
   "companyEmail": "dsadasd@asdasd.com",
   "companyName": "abtest LLC",
   "companyPhone": "32312312",
   "technicalContactEmail": "dsadasd@asdasd.com",
   "technicalContactName": "sdadasd",
   "technicalContactPhone": "23131",
   "technicalContactPosition": "dsadas",
   "privacyLiaisonContactEmail": "dsadasd@asdasd.com",
   "privacyLiaisonContactName": "dsadad",
   "privacyLiaisonContactPhone": "231312",
   "privacyLiaisonContactPosition": "dsadas",
   "hrContactEmail": "dsadasd@asdasd.com",
   "hrContactName": "dsadas",
   "hrContactPhone": "23213131",
   "hrContactPosition": "dsadasd"
}
```

### Update Application

Performs an update of the application within the URI parameter that belongs to the company within the URI parameter.


#### Request

`PUT -	${BASE_URL}/company/${COMPANY_ID}/app/${APP_ID}`

Example (body content)
```JSON
{
   "applicableRegulations": [
       "GDPR",
       "HIPAA",
       "CCPA"
   ],
   "applicationDRRegionStored": "",
   "applicationHostingEntity": "AWS",
   "applicationHostingManagement": "Self Hosted",
   "applicationHostingType": "On Premise",
   "applicationName": "API APP",
   "applicationOwner": "Some dude",
   "applicationRegionStored": "centus",
   "applicationType": "service",
   "comments": "",
   "connectionType": "api",
   "dataRetentionReq": "5 years",
   "description": "sdasdas",
   "encryptedDataTransfer": true,
   "hasDRHosting": false,
   "hasNameAndInitials": false,
   "technologyOwner": "Other dude",
   "hasAge": false,
   "hasBillingHistory": false,
   "hasBiometricData": false,
   "hasBirthdate": false,
   "hasCivilJusticeInfo": false,
   "hasCriminalInfo": false,
   "hasDriversLicenceNumber": true,
   "hasEmailAddress": false,
   "hasEthnicOrigin": false,
   "hasFinancialInfo": true,
   "hasGender": false,
   "hasHealthInfo": false,
   "hasHomeAddress": false,
   "hasHouseholdInfo": false,
   "hasIdNumbers": false,
   "hasLocation": false,
   "hasMaritalStatus": false,
   "hasMedicalInfo": false,
   "hasMinorInfo": false,
   "hasMobileNumber": false,
   "hasNationality": false,
   "hasPhysicalCharacteristics": false,
   "hasReligiousPhilosophicalPoliticalBeliefs": false,
   "hasSexualBehaviour": false,
   "hasSocialMedia": false,
   "hasStudentInfo": true,
   "hasTelephoneNumber": false,
   "hasTradeUnionMembership": false,
   "hasUniqueDeviceId": false,
   "modules": [
       "dsad",
       " sdad",
       " asdasd"
   ],
   "linkedApps": [
       "ckwwft40z1245aip8t1lzg8ic",
       "ckwxu1jme01596vp82e06azjn",
       "PENDING"
   ]
}
```

### Delete Company

performs a delete of the company within the URI parameter (does a cascade delete of the applications that belongs to the company).


#### Request

`DELETE -	${BASE_URL}/company/${COMPANY_ID}`

### Delete Application

performs a delete of the application within the URI parameter that belongs to the company within the URI parameter.


#### Request

`DELETE -	${BASE_URL}/company/${COMPANY_ID}/app/${APP_ID}`



## License 

Apache License 2.0 - See licence File
