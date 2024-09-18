# Frontend coding challenge - ParkingBusiness

Hi there! In this coding challenge, you will build the frontend for an existing backend application.

## Context

The application belongs to ParkingBusiness, a company that operates parking garages. This is a pilot project for one of the buildings owned by ParkingBusiness. If this project is successful, they will likely want to extend the software to manage all of their parking buildings.

The building looks like the following:

- Floor 1: Parking spaces 1 – 75
- Floor 2: Parking spaces 76 – 150

Each parking space in the building has a requirement:

- Space 1 – 50: Spaces used for residents of the building (no charge)
- Space 51 – 130: Cars € 5,00 per hour
- Space 131 – 150: Motorcycles € 3,00 per hour

## Backend

A backend implementation is available [here](https://parkdemeer-afde952e3fef.herokuapp.com/api/docs#/Authentication/AuthController_me). It is already implemented and deployed, so you can simply consume it from the client.

You can use the following credentials to log in:
- username: `super@parkdemeer.nl`
- password: `SUPER_USER_SECRET_PASS_KEEP_SECRET_AND_ROTATE_EVERY_ONCE_IN_A_WHILE`

A successful login will return a `Set-Cookie` header, which you can use as a `Cookie` in subsequent requests.

## Stories to implement

### PBF-01: Overall Project Setup

1. Setup your project in a Git hosting of your choice.
2. The frontend should be implemented as a Javascript Single Page Application. You can use JS framework of your choice.
3. There should be a README explaining how to install and run the frontend.
4. The use of a CSS framework (such as Bootstrap) is discouraged - we want to see how you work directly with CSS.

### PBF-02: Login/logout

1. When the app starts, make a call to the auth endpoint that gives you your current user; if the user is logged in, redirect them to the dashboard. Otherwise, redirect them to the login page.
2. Allow the user to login and logout of the app, by entering `email` and `password`.
3. From the dashboard, allow the user to logout.

### PBF-03: Dashboard

1. Show an overview of the building, consuming the data provided by the backend.
2. The overview should show three areas: residents, non-resident cars and non-resident motorcycles.
3. The overview should give a clear idea of how much occupancy there is, both as a number (digital indicator) and a graphic proportion (analog indicator).
4. Add any other helpful pieces of information that you think would be useful to the parking operator when they see the overview.

### PBF-04: Sessions

1. Build a table that shows all the parking sessions, consuming the session data provided by the backend.
2. The backend was built hastily, so it provides no filtering functionality. You'll have to implement filtering on the client-side until the backend is improved.
3. Allow the operator to filter and sort by the most important fields of the sessions: session type (resident, non-resident car, non-resident motorbike), start date, end date, session status (active/inactive).
4. Provide a button to end a parking session; this is useful for when there's an issue with the scanner and a session has to be ended through manual intervention.

### PBF-05: Extra credit

1. Provide revenue metrics, either for individual sessions or generally for a time period.
2. Add any other features that you think would be interesting to a parking operator.