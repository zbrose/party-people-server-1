# Party People

## Project Idea
Are you a party person? Have you ever been at home and wondered where the party's at? Well, we got the solution for you! Welcome to Party People! The website where you can see the best parties near you. And if none of them interest you, you can create your own event!

#### Disclaimer*
We understand this app would have been better served on a relational database but since the focus of the project was to create a MERN app, we opted to simulate join tables using Mongoose.

## User Stories
As a user, I want to be able to create my own account
As a user, I want to login to my account
As a user, I want to find events by category
As a user, I want to see event details
As a user, I want to RSVP events
As a user, I want to see all the events I RSVP'ed to or am hosting
As a user, I want to create my own events
As a user(host), I want to be able to edit and delete my hosted event
As a user, I want to review the events I attended (stretch)
As a user(host), I want to review the attendees (stretch)

## Approach

We agreed on one idea we were all excited about. On a miro.com, we created wiredframes and flowchart of our vision for the app. We made a routing chart and routes and decided on our schemas. We mob-coded all the backend and then split front end components between the team. We colloborated on resolving bugs.

## MVP
- [x] See all events on the Home Page
- [x] Filter categories
- [x] Users can create an event
- [x] Creator of event(host) can edit and delete event
- [x] Users can attend/unattend event
- [x] Users can add profile picture
- [x] Users can add event image to their event

## STRETCH GOALS
- Styling change when filtering a specific category
- [x] Map API to show location
- [x] Geolocation
- [x] Hype buttons for events
- Comments on event's page
- Review Host/Attendees
- [x] Category Selection on Profile Page


## Server ROUTES

| VERB | URL pattern | Action | Description |
|------|-------------|--------|-------------|
| GET  | / | Read   | show all events |
| POST | /users/login | Read   | display login form |
| POST | /users/register | Create  | display sign up form |
| POST | /users/ | Create  | display sign up form |
| GET  | /users/:id | Read  | display user profile |
| PUT | /users/:id | Update | update User Profile |
| PUT | /users/:id/upload | update  | update user's photo |
| POST | /events | Create | create event|
| GET  | /events/:id       | Read  | display event|
| PUT | events/:id | Update | update event posting |
| PUT | events/:id/upload | Update | update event photo |
| DELETE | /events/:id | Delete | delete event |
| DELETE | /events/:eventId/:userId/unattend | Delete | delete user off attendance list |
| PUT | /events/:eventId/:userId/attend | Update | add user to attendance list |

## Client ROUTING CHART

| VERB | URL pattern | Action | Description |
|------|-------------|--------|-------------|
| GET  | / | Read   | show all events |
| POST | /register        | Create  | user sign up page |
| GET  | /login | Read  | check user |
| Get | /profile | Read   | display user info |
| POST | /events/new | Create | create event|
| GET  | /events/:id       | Read  | display event detail|
| PUT | event/:id | Update | update event posting |
| DELETE | /event/:id | Delete | delete event |


## WIREFRAMES
![wireframe](https://cdn.discordapp.com/attachments/919468128432455700/956715039669239869/Capture.JPG)

## ERD
![eventtable](https://cdn.discordapp.com/attachments/919468128432455700/956715040008966224/Capture2.JPG)
![usertable](https://cdn.discordapp.com/attachments/919468128432455700/956715040273235998/Capture3.JPG)


## tech used

### server
- express - web framework 
- mongoose - mongodb database manager
- mongodb - nonrelational database
- dotenv -stored configuration in the environment separate from code
- bcrypt - hashes users pw
- cors - allows our server to request information from cloudinary
- jsonwebtoken - used for user authorization
- multer - middleware for handling uploading images

### client
- react - used as frontend framework
- react-bootstrap - style frontend
- dayjs - easily format dates from server
- axios - pull data from database
- react-router-dom - implement/simulate dynamic routing in webapp
- react-map-gl - facilitate use of mapbox

### other
- canva.com (wireframes)
- mapbox - third party app to map user and event locations
- cloudinary - third party app to upload/access/edit images

## installation instructions
### client
1. head over to https://github.com/brnguy/party-people-server
2. fork and clone to your terminal, then run `[npm i]` to install:
```[react [react-bootstrap] [dayjs] [react-router-dom] [react-map-gl] [axios]```
3. open code
4. add your react server url to .env.local
5. "npm start" on terminal to start

### server 
1. fork and clone to your terminal, then run [npm i] to install:
```[express] [bcrypt] [dotenv] [ejs] [env] [express] [cors] [jsonwebtoken] [multer] [cloudinary]```
2. create a cloudinary account
3. open code
4. add the mongodb url, port, jwtsecret='(your secret here)', cloudinaryurl, cloudname into your .env file
5. "nodemon" on terminal to start


## sources used
- TOM BOMBADIL - https://www.youtube.com/watch?v=hhFAB-Z9Kb0
- images from Unsplash.com
- original artwork(logos, gifs, background) by Triston 
- https://gist.github.com/RichLogan/9903043 (dropdown for the states)
- https://devtrium.com/posts/async-functions-useeffect (how to use async functions in useEffects)
- Starbucks/stella

## post project reflections
- learning when to put a variable in a state vs creating a variable on the front end
- using routes to have static state
- using ternary to delay react states
- effective/constant communication and team collaboration was very important to all of us and it kept the project work smooth and overall a great experience
