# MyDPO Developer Comments

## Description

**mydpo** folder contains code related to the web platform. Using Next.JS/React, GraphQL, Prisma. The code is centralized in mydpo/src folder. The following will be described the content of each section (folders).

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
