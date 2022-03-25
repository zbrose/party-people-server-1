# Party People

## Project Idea
Are you a party person? Have you ever been at home and wondered where the party's at? Well, we got the solution for you! Welcome to Party People! The website where you can see the best parties near you. And if none of them interest you, you can create your own event!

## User Stories
As a user, I want to be able to create my own account
As a user, I want to login to my account
As a user, I want to find events by location, category, date, etc
As a user, I want to see event details
As a user, I want to RSVP events
As a user, I want to see all the events I RSVP'ed to or am hosting
As a user, I want to create my own events
As a user(host), I want to be able to edit and delete my hosted event
As a user, I want to review the events I attended (stretch)
As a user(host), I want to review the attendees (stretch)

## MVP
- See all events on the Home Page
- Search events
- All users can create an event
- Creator of event(host) can edit and delete event
- Other users can attend/unattend event

## STRETCH GOALS
- Styling change when filtering a specific category
- Map API to show location
- Geolocation
- Hype buttons for events
- Comments on event's page
- Review Host/Attendees
- Category Selection on Profile Page

## RESTFUL ROUTING CHART

| VERB | URL pattern | Action | Description |
|------|-------------|--------|-------------|
| GET  | /           | Read   | show all events |
| POST | /users/login          | Read   | display login form |
| POST | /users/register        | Create  | display sign up form |
| GET  | /users/:id       | Read  | display user profile |
| GET  | /events/:id       | Read  | display event|
| POST | users/:id/event | Create | create event|
| PUT | event/id | Update | update event posting |
| PUT | /users/:id | Update | Update User Profile |
| DELETE | /event/:id | Delete | delete event |
| DELETE | /event/:id/users/:id | Delete | delete user off attendance list |

## WIREFRAMES
![wireframe](https://cdn.discordapp.com/attachments/919468128432455700/956715039669239869/Capture.JPG)

## ERD
![eventtable](https://cdn.discordapp.com/attachments/919468128432455700/956715040008966224/Capture2.JPG)
![usertable](https://cdn.discordapp.com/attachments/919468128432455700/956715040273235998/Capture3.JPG)
