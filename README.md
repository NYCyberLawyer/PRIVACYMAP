# MyDPO Privacy Mapping App

## Description

The laws governing data are increasing in number, risk, and complexity, and cover all aspects of data including requirements for types of data (e.g. PII, MNPI, PHI), as well as data life cycle management (e.g collection, creation, retention, logging, generation, transformation, use, disclosure, sharing, transmission, and disposal).  Privacy risks and requirements are not fully understood or appreciated by businesses (or networks, validators, etc...), and often result in extensive damages to finances, reputation, or in some cases incarceration.  Businesses often spend too much money trying to comply (using costly and often inadequate solutions), or otherwise try to ignore the problem until they have to face consequences.   

A compliant privacy posture requires a foundation of 3 core privacy processes:  (i) mapping of data (i.e. where / what the data is and rights attached), (ii) protecting the data, and (iii) managing that data effectively, including by providing timely responses to requests from the owners of that data (e.g. Data Subject Access Requests (DSAR)).   This Privacy Mapping Tool is the foundational component of any compliant privacy posture, empowering companies with real-time visibility and auditability, and the ability to  generate/draft reports for Privacy Impact Assessments (“PIA”), and serving as a reference and auto-population for any privacy audit or reporting materials (e.g. SOC2, GLBA, GDPR).  

The platform includes a user-facing dashboard and will have a core functionality for “data mapping” along with space for any additional complementary modules.   Users will be offered survey-based data discovery tools (e.g. a questionnaire to generate a data flow map) as well as automated data discovery tools (e.g. data monitoring to try and detect any MNPI/PII (e.g. a string resembling an SSN like ###-##-####)).  With the map completed, users will gain visibility and understanding as to their full privacy posture, including, but not limited to, meeting regulatory requirements a detailed and accurate understanding as to where all sensitive data including Material Non-Public Information (“MNPI”) or Personally Identifiable Information (“PII”) or Public Health Information (“PHI”), is retrieved, generated, stored, processed, transmitted, or destroyed (the “Data Life Cycle”).  

Furthermore, with the mapping complete, Users will be able to rapidly generate and update Privacy Impact Assessments (“PIA”), and benchmark such assessments against existing regulatory requirements against the open source privacy rules engine. NOTE: This grant application stands alone.  

###  Folder Structure
- mydpo    -> Milestone1
- api      -> Milestone2
- Guidance -> Milestone3

## Running MyDPO locally
### Prerequisites
- Docker
- Node 16.13.0 (or up LTS versions recommended)
- Yarn 1.22.17 (or up)

### Cloning the Repo
git clone https://github.com/NYCyberLawyer/PRIVACYMAP.git

### Build instructions and set up
Run `cd PRIVACYMAP/mydpo/`.

Run `docker-compose up -d`.

Navigate to /mydpo and run `yarn install && cp .env.example .env`. (if you don't use a sudo user, execute `sudo chmod 777 database -R`).

Edit .env file and put the correct values for the following constants:

-------
```
# Choose any random string for these env variables
# NOTE: In production, make sure they're really long, each unique and unguessable
MAGIC_LINK_SECRET=fake
COOKIE_SECRET=fake
INVITATION_TOKEN_SECRET=fake
API_TOKEN_SECRET=fake


# Get this from the Postmark dashboard (https://postmarkapp.com/)
POSTMARK_API_TOKEN=fake
# Set this to whatever email you have configured in Postmark
POSTMARK_FROM_EMAIL=fake@fake.com

# This is the URL for the local database started with "docker-compose up"
# NOTE: Only change this if you do not use docker-compose to run the database locally!
DATABASE_URL='postgres://postgres:postgres@localhost:35432/mydpo'
```
-------

After editing run `yarn prisma:deploy && yarn dev`. (if you don't use a sudo user, execute `sudo chmod 777 database -R`).

Navigate to /api and run `yarn install && yarn dev`. 

MyDPO web app will be served on `localhost:3000` and MyDPO api on `localhost:9999`. 

Remember to change both `.env` files to fully customize the ports and connection strings

Warning: remember to set a root password for security purposes otherwise the password will be bypassed leaving the system vulnerable to attacks. Please follow the industry best practices when setting  up such a password.

### Useful commands

`docker exec -it mydpo-postgres-1 psql -U postgres -W postgres` for performing SQL Queries to the Docker Database. Remember to select the database using the next command `\c database_name` (default database_name is mydpo).

### Sample SQL queries

```SQL
INSERT INTO "ConsultancyFirm" (id, name, slug) VALUES ('ckvjuluhp000008l40bgq5x3y', 'MyDPO', 'MyDPO-ckvjuluhp000008l40bgq5x3y');
INSERT INTO "ConsultancyFirm" (id, name, slug) VALUES ('ckycyltw1000009l83fc13vzo', 'Kreitech', 'KREITECH-ckycyltw1000009l83fc13vzo');
SELECT * FROM "ConsultancyFirm";

INSERT INTO "User" (id, email, name, "consultancyFirmId") VALUES ('ckvsahypo000008l990jp8f8z', 'jmorello@kreitech.com.uy', 'Juano Morello', 'ckvjuluhp000008l40bgq5x3y');
INSERT INTO "User" (id, email, name, "consultancyFirmId") VALUES ('ckvsai3sw000108l98xxd9n8o', 'tnieves@kreitech.com.uy', 'Taty Nieves', 'ckvjuluhp000008l40bgq5x3y');
INSERT INTO "User" (id, email, name, "consultancyFirmId") VALUES ('ckvs6nckw0290vvodruzcvhlv', 'cdemarco@kreitech.com.uy', 'Caro De Marco', 'ckvjuluhp000008l40bgq5x3y');
INSERT INTO "User" (id, email, name, "consultancyFirmId") VALUES ('ckvsc9bmw000009jzenrfb7ab', 'amalaquina@kreitech.com.uy', 'Antonio Malaquina', 'ckvjuluhp000008l40bgq5x3y');
INSERT INTO "User" (id, email, name, "consultancyFirmId") VALUES ('ckw535cfv000209ia9k08e24m', 'rquesada@kreitech.com.uy', 'El Rodras', 'ckvjuluhp000008l40bgq5x3y');
INSERT INTO "User" (id, email, name, "consultancyFirmId") VALUES ('ckwme0hv0000209jqdefr7gyq', 'corquera@kreitech.com.uy', 'Cami Lou', 'ckvjuluhp000008l40bgq5x3y');
INSERT INTO "User" (id, email, name, "consultancyFirmId") VALUES ('ckxq6r7fh000108li852e7f8v', 'fdasilveira@kreitech.com.uy', 'Fran Tester', 'ckvjuluhp000008l40bgq5x3y');
INSERT INTO "User" (id, email, name, "consultancyFirmId") VALUES ('ckybwqydr000009l1dbmp6rfv', 'paul.mcculloch@mydpo.us', 'Paul McCulloch', 'ckvjuluhp000008l40bgq5x3y');

SELECT * FROM "User";
SELECT * FROM "Business";
SELECT * FROM "Application";
SELECT * FROM "Token";

UPDATE "User" set "consultancyFirmId" = 'ckycyltw1000009l83fc13vzo' where "consultancyFirmId" = 'ckvjuluhp000008l40bgq5x3y'; -- new
UPDATE "User" set "consultancyFirmId" = 'ckvjuluhp000008l40bgq5x3y' where "consultancyFirmId" = 'ckycyltw1000009l83fc13vzo'; -- old

UPDATE "User" set "consultancyFirmId" = 'ckycyltw1000009l83fc13vzo' where "id" = 'ckxq6r7fh000108li852e7f8v';
UPDATE "User" set "consultancyFirmId" = 'ckycyltw1000009l83fc13vzo' where "id" = 'ckvs6nckw0290vvodruzcvhlv';
UPDATE "User" set "consultancyFirmId" = 'ckycyltw1000009l83fc13vzo' where "id" = 'ckvsahypo000008l990jp8f8z';

INSERT INTO public."Business" (id, "createdAt", "modifiedAt", "consultancyFirmId", "businessContactEmail", "businessContactName", "businessContactPhone", "businessContactPosition", "companyAddress", "companyEmail", "companyName", "companyPhone", "technicalContactEmail", "technicalContactName", "technicalContactPhone", "technicalContactPosition","privacyLiaisonContactEmail","privacyLiaisonContactName","privacyLiaisonContactPhone", "privacyLiaisonContactPosition",  "hrContactEmail" , "hrContactName","hrContactPhone" , "hrContactPosition") VALUES ('ckvrj0w120106hxodcemu00d8', '2021-11-09 03:21:15.302', '2021-11-09 03:21:15.302', 'ckvjuluhp000008l40bgq5x3y', 'marcelo@kreitech.io', 'Marcelo', 123789456, 'Manager', 'some address 123', 'info@kreitech.io', 'Kreitech LLC', 123456789, 'antonio@kreitech.io', 'Antonio', 987654321, 'CTO','antonio@kreitech.io', 'Antonio', 987654321, 'CTO','antonio@kreitech.io', 'Antonio', 987654321, 'CTO');

INSERT INTO public."Application" ("id", "createdAt", "modifiedAt", "businessId", "applicableRegulations", "applicationDRRegionStored","applicationHostingEntity", "applicationHostingManagement", "applicationHostingType", "applicationName","applicationOwner", "applicationRegionStored", "applicationType", "comments", "connectionType", "dataRetentionReq", "description","encryptedDataTransfer", "hasDRHosting", "hasNameAndInitials", "technologyOwner", "hasAge", "hasBillingHistory", "hasBiometricData", "hasBirthdate", "hasCivilJusticeInfo", "hasCriminalInfo", "hasDriversLicenceNumber", "hasEmailAddress", "hasEthnicOrigin", "hasFinancialInfo","hasGender", "hasHealthInfo", "hasHomeAddress", "hasHouseholdInfo", "hasIdNumbers", "hasLocation", "hasMaritalStatus", "hasMedicalInfo", "hasMinorInfo","hasMobileNumber", "hasNationality", "hasPhysicalCharacteristics", "hasReligiousPhilosophicalPoliticalBeliefs", "hasSexualBehaviour","hasSocialMedia","hasStudentInfo", "hasTelephoneNumber", "hasTradeUnionMembership", "hasUniqueDeviceId", "modules","linkedApps") VALUES ('ckvrkwbr40020vvodaqftfvf8', '2021-11-09 04:13:41.632', '2021-11-09 04:13:41.632', 'ckvrj0w120106hxodcemu00d8','{Three,One}', 'SA', 'AWS', '', 'One',  'Testeros', 'juano', 'SA', 'Two', '', 'filetransfer', '1 year', 'Testeros description', false, true, true,'Juano', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,false, true, false, false, false, false, false, false, true, false, false, false, false, '{Two}',null);


```
## Testing and Usage of APP

### Login	and see:	
Email Address
Sign In
Privacy Policy
Terms of Service
Check your Mailbox


### Main Page		

The "MyDPO" logo goes back to home

"Log Out"	botton works

"Search"feature works

Company Infois visible

### Data Entry and management

Create Company	

Create App		

View Company	

View App		

Edit Company	

Edit App		

Delete Company		

Delete App		

### Export Reports

Company Diagram	Download

Download Report	Excel report

# Cypress testing

## Prerequisites
- Node 16.13.0 (or up LTS versions recommended)
- Yarn 1.22.17 (or up)
- Repo cloned (git clone https://github.com/NYCyberLawyer/PRIVACYMAP.git)

## Locally

Run `cd PRIVACYMAP/myDPO-automation/`.

- Install dependencies:

```bash
npm install
```
- Run the project:

```bash
npm run cy:open
```

- Follow the instructions to run manually the tests:
	- Select the option with Configured on.
	- Choose the browser to run the test and press Start
	- Select the test to run (check-page.cy.js)

### Headless
- We can run the tests in headless mode:

```bash
npm run cy:run
```

# On server

- Install NodeJS V16.x:
- Install dependencies:

```bash
npm install
```

- Run the project:
```bash
npm run cy:run
```

# Update configurations

- Change baseUrl configuration in the file `cypress.config.js`:

```js
baseUrl: 'http://localhost:3000'
```

- Change the fixture in the file `cypress/fixture/user.json` adding a valid email to run the tests:

```js
{
  "email": "validemail@email.com",
}
```

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

# MyDPO Developer Comments

## Description

**mydpo** folder contains code related to the web platform. Using Next.JS/React, GraphQL, Prisma. The code is centralized in **mydpo/src** folder. The following will be described the content of each section (folders).

###  server  
Contains all the code related to the backend side of the platform, api definition, database interaction, etc.
Into server folder will find other subfolder, next will describe each one.
- **passport**: code related with user login, signup or manage of magiclink. For the creation of magiclinks https://github.com/mxstbr/passport-magic-login.
- **graphql**: contains api definition, for each class used in the system there are a folder, for example folders with the name: Application, Business, etc. Otherwise in each of these folders, you can find  database queries related to this classes.
- **db**: all database definitions, migrations, etc.

###  pages 
Contains all the code related to the frontend side of the platform.
Into pages folder will find other subfolder, next will describe each one.
-  **api**: contains callback code for magiclinks, to login to the system.
-  **app**: this folder contains all the internal pages of the platform. The following will explain the content of each sub folder.
   - **settings**: page dedicated to user profile.
   - **add-business**: this page enable to create a new business.
   - **[slug]**: in this subfolder there are pages related with some specific business
	 - **add-application**: page to add application to an specific business
	 - **diagram**: all the components/functions to manage diagrams, for example generate business diagram, one of the main functionalities  in the platform. The library used to generate the diagrams is https://github.com/knsv/mermaid#readme.
	 - **edit**: page to edit the business selected.
	 - **[appId]**: in this subfolder there are pages related with some specific app in the business.
		- **edit**: this page enable to edit fields of the selected app in a specific business.
		- **index**: page where apps from specific business are listed

###  clients 
Contains all the code related to components used in other pages in the frontend side of the platform.
Into clients folder will find other subfolder, next will describe each one.
  - **components**: have some components used in the site, work as a helper.
  - **graphql**: contains graphql definition of methods.
  - **stylesheets**: list of styles used in pages of the site.
  - **hook**: only have some method to create pagination.



## License 

Apache License 2.0 - See licence File
