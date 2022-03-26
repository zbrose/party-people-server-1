const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../../models')
const requiresToken = require('../requiresToken')
const user = require('../../models/user')
const event = require('../../models/event')

// GET /events
router.get('/', async (req, res) => {
  try {
    const allEvents = await db.Event.find()
    res.json( allEvents )
  } catch(err) {
    console.log(err)
  }
})

// GET /events/:id
router.get('/:id', async (req, res) => {
    try {
        const foundEvent = await db.Event.findOne({_id: req.params.id})
        res.json( foundEvent )
    } catch(err) {
        console.log(err)
    }
})

// POST /events/create -- CREATE a new event
router.post('/create/:id', async  (req, res) => { // USE TOKEN TO IDENTIFY USER
  try {
    const foundUser = await db.User.findOne({
        _id: req.params.id
    })  

    const newEvent = await db.Event.create({
        title: req.body.title,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        date: req.body.date,
        description: req.body.description,
        category: req.body.category
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
    res.status(503).json({ msg: 'oops server error 503 🔥😭' }) 
  }
})

// PUT /events/:id -- edit the event details
router.put('/:id', async (req, res) => {
    try{
        const options = {new:true}
        const updatedEvent = await db.Event.findOneAndUpdate({
            _id: req.params.id
        },req.body,options)
        res.json(updatedEvent)
    } catch(err) {
        console.log(err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        // go through attendance list and deleting event ID from those users' eventsAttending array using their Ids to find them

        // delete event from database
        await db.Event.findByIdAndDelete(req.params.id)

        res.json('event deleted')
    } catch(err) {
        console.log(err)
    }
})

module.exports = router