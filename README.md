

# Final Project

<br>

## Description

This is an app to manage and organize your trips with your travel colleagues. The app helps to organize, manage and track all you need in your trip (activities, budget, weather, map,..). Everything you need to stop worrying and enjoy your trip.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **500:** As an anon/user I can see a 500 page if the server isn't working
-  **Signup:** As a user I want to sign up on the webpage so that I can see my privates screens
-  **Login:** As a user I want to be able to log in on the webpage so that I can get back to my account
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Trips:** As a user I can add a trips
-  **Join Trips:** As a user I can join to coleague trip
-  **Edit Trips:** As a user I can edit a trip
-  **Add Activities:** As a user I can add activities to a trip
-  **Edit Activities:** As a user I can edit a activities  to update their information 
-  **View Activities Calendar:** As a user I want to see the activities calendar
-  **View remaining days:** As a user I want to see the  remaining days in dashboard
-  **Add expense to budget:** As a user I want to add expense to control the trip budget



## Backlog

User profile:
- see my profile
- see my trips
- add a your total world to explore in %


Dashboard:
- Move the cards
- Add a MapBox card
- Add weather card
- Create relationns with budget and travelers

Chat:
 - Add a trip group chat
 - See the other users profile


<br>


# Client / Frontend

## Routes
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                       | SplashScreen         | public      | Redirect to login (anon) or dashboard (user)            |
| `/auth/signup`            | Signup               | anon only   | Signup form, link to login, navigate to '/' after signup|
| `/auth/login`             | Login                | anon only   | Login form, link to signup, navigate to '/' after login |
| `/auth/logout`            | n/a                  | anon only   | Navigate to '/' after logout, expire session            |
| `/trip/create`            | TripCreate           | user only   | Create a trip                                           |
| `/trip/edit/:id`            | TripUpdate           | user only   | Update a trip                                         |
| `/trip/delete/:id`            | n/a                  | user only   | Delete a trip and redirect to '/'                   |
| `/trip/join/:id      `        | TripJoin             | user only   | Join a trip                                         |
| `/dashboard/:id  `        | Dashboard            | user only   | Shows trip dashboard with components, if notrip -> '/trip/create'  |
| `/tournaments/:id`        | TournamentDetail     | user only   | Details of a tournament to edit                         |
| `/activity/create/:id`        | ActivityCreate       | user only   | Create a activity                                   |
| `/tournaments/edit/:id`        | ActivityUpdate       | user only   | Update a activity                                  |
| `/budget/create:id`          | BudgetCreate         | user only   | Create a budget form, navigate to '/'                |
| `/budget/newExpense/id:`      | NewExpense           | user only   | Add a new expense                                   |


## Components

- SplashScreen

- Signup

- Login

- TripCreate

- TripUpdate

- TripJoin

- Dashboard

- TournamentDetail

- ActivityCreate

- BudgetCreate

- NewExpense


  

 

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
  
- Trip Service

  - trip.add(id)
  - trip.update(id)
  - trip.join(id)
  - trip.delete(id)
  
- Activities Service
  
  - activities.list(id)
  - activities.add(id)
  - activities.update(id)
  - activities.delete()id
  
- Budget Service 

  - budget.detail(id)
  - budget.add(id)
  - budget.delete(id)

- Country Service

  - country.get(name)
  
 - Map Service
 
  - map.post(id)
  - map.get(id)

- Weather Service
 
  - weather.get(id)


<br>


# Server / Backend


## Models

User model

```javascript
{
  name: String
  email: String ,// required & unique
  password: String, // required
  trips: [ObjectID<Trips>]
}
```

Trip model

```javascript
 {
   name: String
   users: [ObjectID<Users>],
   date: Date,
   country: String
   activities: [{
    name: String,
    date: Date,
    tickets: [String, String, ...]
    location: String
   }...]
   budget: {
    expectet: {
     hotel: Number,
     transport: Number,
     food: Number,
     gifts: Number,
     others: Number,
    },
    current: {
     hotel: Number,
     transport: Number,
     food: Number,
     gifts: Number,
     others: Number,
    }
   },
   countryApi: {
    name: String,
    emergencyNum: String,
    population: String,
    language: String,
    history: String,
    ...
   }
 }
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | /dashboard                  | Saved session                | 200            | 404          | Check if user is logged in and return dashboard page           |
| POST        | /auth/signup                | {email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | /auth/login                 | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | /auth/logout                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | /dashboard/:id              | {id, Trip}                   |                |              | Show specific trip                                     |
| POST        | /trip/create                | {}                           | 201            | 400          | Create and save a new trip                    |
| PUT         | /trip/edit/:id              | {name, date, country}        | 200            | 400          | edit tournament                                              |
| DELETE      | /tip/delete/:id             | {id}                         | 201            | 400          | delete trip                                            |
| PUT         | /budget/newExpense          | {id}                         | 200            | 400          | add expense                                                  |
| GET         | /activity/create            | {id}                         | 200            | 400          | add activity player                                         |
| PUT         | /activity/edit/:id           |{name,location, date, tickets} | 201          | 400          | edit activity                                                  |
| DELETE      | /activity/delete/:id        | {id}                         | 200            | 400          | delete activity                                                |


<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/TBI9P7xP/final-project) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
