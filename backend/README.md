# Express API for Warehouse app

This repository serves as server-side application that is a part of the interview process for candidates attending on the position in CloudTalk.

## Installing

1. On the root folder run ````npm install```` to install necessary packages
2. Run ````npm run start```` to run the server application.
By default application will run on `http://localhost:3000`

## Overview

* The API endpoints are available under the `/api` URL. 
* Swagger documentation is available at `/api-docs`.
* The application is served with CORS disabled for testing purposes.

## Assignment

1. Warehouse application, needs API for following features

   1. Table of products that are available
   2. Product definition (required properties)

      1. ID
      2. Name
      3. Quantity
      4. Unit price (euros)

   3. Product manipulation

      1. CRUD operations

   4. Shipments (optional)

2. Please at the development consider

   1. Development best practises
   2. Testing
   3. Simulate a situation in which you work with the team (pay attention to how you work with Git)

3. This is a bare minimum, there are no limits to creativity, just keep in mind what we wanted

We wish you good luck and a clear mind! We are looking forward to seeing you!

PS: We should be able to run application locally, thus start the backend and be able to use endpoints through the curl/postman.
