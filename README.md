# MyDPO

## Running MyDPO locally
### Requisites
- Docker
- Node 16.13.0 (or up)

### Build instructions
Run `docker-compose up -d`.
Navigate to /mydpo and run `yarn install && cp .env.example .env && yarn prisma:deploy && yarn dev`.
Navigate to /api and run `yarn install && yarn dev`. MyDPO web app will be served on `localhost:3000` and MyDPO api on `localhost:9999`. Remember to change both `.env` files to fully customize the ports and connection strings

### Useful commands

`docker exec -it mydpo_postgres_1 psql -U postgres -W postgres` for performing SQL Queries to the Docker Database

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

INSERT INTO public."Business" (id, "createdAt", "modifiedAt", "consultancyFirmId", "businessContactEmail", "businessContactName", "businessContactPhone", "businessContactPosition", "companyAddress", "companyEmail", "companyName", "companyPhone", "technicalContactEmail", "technicalContactName", "technicalContactPhone", "technicalContactPosition") VALUES ('ckvrj0w120106hxodcemu00d8', '2021-11-09 03:21:15.302', '2021-11-09 03:21:15.302', 'ckvjuluhp000008l40bgq5x3y', 'marcelo@kreitech.io', 'Marcelo', 123789456, 'Manager', 'some address 123', 'info@kreitech.io', 'Kreitech LLC', 123456789, 'antonio@kreitech.io', 'Antonio', 987654321, 'CTO');
INSERT INTO public."Business" (id, "createdAt", "modifiedAt", "consultancyFirmId", "businessContactEmail", "businessContactName", "businessContactPhone", "businessContactPosition", "companyAddress", "companyEmail", "companyName", "companyPhone", "technicalContactEmail", "technicalContactName", "technicalContactPhone", "technicalContactPosition") VALUES ('ckvs6poq50323vvod3cyqldqw', '2021-11-09 14:24:23.405', '2021-11-09 14:24:23.405', 'ckvjuluhp000008l40bgq5x3y', 'fafafa@oino.us', 'fafafa', 123123, 'CEO', 'some address 123', 'info@oino.us', 'OINO LLC', 123456, 'dadada@oino.us', 'dadada', 321321, 'CTO');
INSERT INTO public."Business" (id, "createdAt", "modifiedAt", "consultancyFirmId", "businessContactEmail", "businessContactName", "businessContactPhone", "businessContactPosition", "companyAddress", "companyEmail", "companyName", "companyPhone", "technicalContactEmail", "technicalContactName", "technicalContactPhone", "technicalContactPosition") VALUES ('ckvs6qr160361vvod0bvcanl8', '2021-11-09 14:25:13.050', '2021-11-09 14:25:13.050', 'ckvjuluhp000008l40bgq5x3y', 'lalala@fake.com', 'lalala', 2132122, 'CEO', 'asdsad 123', 'asda@fake.com', 'Fake LLC', 123123, 'vavava@fake.com', 'vavava', 32112311, 'CTO');

INSERT INTO public."Application" (id, "createdAt", "modifiedAt", "businessId", "applicableRegulations", "applicationDRRegionStored", "applicationHostingEntity", "applicationHostingManagement", "applicationHostingType", "applicationId", "applicationName", "applicationOwner", "applicationRegionStored", "applicationType", comments, "connectionType", "dataRetentionReq", description, "encryptedDataTransfer", "hasDRHosting", "hasNameAndInitials", "technologyOwner", "hasAge", "hasBillingHistory", "hasBiometricData", "hasBirthdate", "hasCivilJusticeInfo", "hasCriminalInfo", "hasDriversLicenceNumber", "hasEmailAddress", "hasEthnicOrigin", "hasFinancialInfo", "hasGender", "hasHealthInfo", "hasHomeAddress", "hasHouseholdInfo", "hasIdNumbers", "hasLocation", "hasMaritalStatus", "hasMedicalInfo", "hasMinorInfo", "hasMobileNumber", "hasNationality", "hasPhysicalCharacteristics", "hasReligiousPhilosophicalPoliticalBeliefs", "hasSexualBehaviour", "hasSocialMedia", "hasStudentInfo", "hasTelephoneNumber", "hasTradeUnionMembership", "hasUniqueDeviceId", modules) VALUES ('ckvrkwbr40020vvodaqftfvf8', '2021-11-09 04:13:41.632', '2021-11-09 04:13:41.632', 'ckvrj0w120106hxodcemu00d8', '{Three,One}', 'SA', 'AWS', '', 'One', null, 'Testeros', 'juano', 'SA', 'Two', '', 'filetransfer', '1 year', 'Testeros description', false, true, true, 'juano', false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, false, '{Two}');
INSERT INTO public."Application" (id, "createdAt", "modifiedAt", "businessId", "applicableRegulations", "applicationDRRegionStored", "applicationHostingEntity", "applicationHostingManagement", "applicationHostingType", "applicationId", "applicationName", "applicationOwner", "applicationRegionStored", "applicationType", comments, "connectionType", "dataRetentionReq", description, "encryptedDataTransfer", "hasDRHosting", "hasNameAndInitials", "technologyOwner", "hasAge", "hasBillingHistory", "hasBiometricData", "hasBirthdate", "hasCivilJusticeInfo", "hasCriminalInfo", "hasDriversLicenceNumber", "hasEmailAddress", "hasEthnicOrigin", "hasFinancialInfo", "hasGender", "hasHealthInfo", "hasHomeAddress", "hasHouseholdInfo", "hasIdNumbers", "hasLocation", "hasMaritalStatus", "hasMedicalInfo", "hasMinorInfo", "hasMobileNumber", "hasNationality", "hasPhysicalCharacteristics", "hasReligiousPhilosophicalPoliticalBeliefs", "hasSexualBehaviour", "hasSocialMedia", "hasStudentInfo", "hasTelephoneNumber", "hasTradeUnionMembership", "hasUniqueDeviceId", modules) VALUES ('ckvs6nckw0290vvodruzcvhlv', '2021-11-09 14:22:34.352', '2021-11-09 14:22:34.352', 'ckvrj0w120106hxodcemu00d8', '{Three,One}', 'NA', 'AWS', '', 'One', null, 'Slack', 'juano', 'SA', 'One', '', 'filetransfer', '3 years', 'chat app', true, true, true, 'juano', false, false, false, false, false, false, false, true, false, true, true, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, true, '{Two}');
```
