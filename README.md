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

### Build instructions and set up
Run `docker-compose up -d`.
Navigate to /mydpo and run `yarn install && cp .env.example .env && yarn prisma:deploy && yarn dev`. (if you don't use a sudo user, execute `sudo chmod 777 database -R`).
Navigate to /api and run `yarn install && yarn dev`. MyDPO web app will be served on `localhost:3000` and MyDPO api on `localhost:9999`. Remember to change both `.env` files to fully customize the ports and connection strings

### Useful commands

`docker exec -it mydpo_postgres_1 psql -U postgres -W postgres` for performing SQL Queries to the Docker Database. Remember to select the database using the next command `\c database_name` (default database_name is mydpo).

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

### API
GET Companies (Postman)		

GET Company and Apps Info (Postman)		

POST Company (Postman)		

POST App Company (Postman)	

PUT Company (Postman)		

PUT App Company (Postman)		

DELETE Company (Postman)	

DELETE App Company (Postman)		


## License 

Apache License 2.0 - See licence File
