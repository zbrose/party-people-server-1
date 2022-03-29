const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const db = require("../../models")
const requiresToken = require("../requiresToken")
const user = require("../../models/user")
const event = require("../../models/event")

// GET /events
router.get("/", async (req, res) => {
  try {
    const allEvents = await db.Event.find()
    res.json(allEvents)
  } catch (err) {
    console.log(err)
  }
})

// GET /events/:id
router.get("/:id", async (req, res) => {
  try {
    const foundEvent = await db.Event.findOne({_id: req.params.id }).populate('host attendees').exec()
    res.json(foundEvent)
  } catch (err) {
    console.log(err)
  }
})

// POST /events/create -- CREATE a new event
router.post("/create/:id", async (req, res) => {
  // USE TOKEN TO IDENTIFY USER
  try {
    const foundUser = await db.User.findOne({
      _id: req.params.id,
    })

    const newEvent = await db.Event.create({
      title: req.body.title,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      time: req.body.time,
      date: req.body.date,
      description: req.body.description,
      category: req.body.category,
      hype:1,
    })

    // // add user as host to the event
    newEvent.host = foundUser.id
    // // add hosted event to the user
    foundUser.hostedEvents.push(newEvent.id)
    // // save everytng
    await newEvent.save()
    await foundUser.save()

    res.json([foundUser, newEvent])
  } catch (err) {
    console.log(err)
    res.status(503).json({ msg: "oops server error 503 🔥😭" })
  }
})

// PUT /events/:id -- edit the event details
router.put("/:id", async (req, res) => {
  try {
    const options = { new: true }
    const updatedEvent = await db.Event.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      options
    )
    res.json(updatedEvent)
  } catch (err) {
    console.log(err)
  }
})

// Once User clicks 'Attend' on event page
router.put("/:eventId/:userId/attend", async (req, res) => {
  try {
    const foundUser = await db.User.findOne({
      _id: req.params.userId,
    })
    const foundEvent = await db.Event.findOne({
      _id: req.params.eventId,
    })

    foundEvent.attendees.push(foundUser.id)
    foundUser.eventsAttending.push(foundEvent.id)

    await foundEvent.save()
    await foundUser.save()

    res.json([foundUser, foundEvent])
  } catch (err) {
    console.log(err)
  }
})

// Once User
router.put("/:eventId/:userId/unattend", async (req, res) => {
  try {

    const updatedEvent = await db.Event.findOneAndUpdate(
        { _id: req.params.eventId },
        { $pull: { attendees: req.params.userId } }
    )

    const updatedUser = await db.User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { eventsAttending: req.params.eventId } }
    )

    res.json([updatedUser, updatedEvent])
  } catch (err) {
    console.log(err)
  }
})

//update hype 

router.put("/:eventId/hype", async (req, res) => {
  try {
    const foundEvent = await db.Event.findOne({
      _id: req.params.eventId,
    })

    const updatedEvent = await db.Event.findOneAndUpdate(
      { _id: req.params.eventId },
      { hype: foundEvent.hype +1},)
    res.json(updatedEvent)
  } catch (err) {
    console.log(err)
  }
})

//no need from user id
router.delete("/:eventId", async (req, res) => {
  try {
    //pull eventId from any user that has this id in their eventsAttending
    await db.User.updateMany({ $pull: { eventsAttending: req.params.eventId } })


    await db.Event.findByIdAndDelete(req.params.eventId)

    res.json("event deleted")
  } catch (err) {
    console.log(err)
  }
})

// router.delete("/:eventId/:userId/delete", async (req, res) => {
//   try {
//     // go through attendance list and deleting event ID from those users' eventsAttending array using their Ids to find them
//     foundEvent = await db.Event.findById(req.params.eventId)

//     // delete from attendee's eventsAttending array
//     for (const attendee of foundEvent.attendees) {
//       foundUser = await db.User.findById(attendee)
//       eventIndex = foundUser.eventsAttending.indexOf(foundEvent.id)
//       foundUser.eventsAttending.splice(eventIndex, 1)
//       await foundUser.save()
//     }

//     // delete from host's hostedEvents array
//     foundHost = await db.User.findById(req.params.userId)
//     eventIndex = foundHost.hostedEvents.indexOf(foundEvent.id)
//     foundHost.hostedEvents.splice(eventIndex, 1)
//     await foundHost.save()

//     // delete event from database
//     await db.Event.findByIdAndDelete(req.params.id)

//     res.json("event deleted")
//   } catch (err) {
//     console.log(err)
//   }
// })
// 623e7f61f6f8c79867ce350b
module.exports = router
