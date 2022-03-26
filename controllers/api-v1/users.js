const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../../models")
const requiresToken = require("../requiresToken")
const user = require("../../models/user")
const event = require("../../models/event")

// GET /users
router.get("/", async (req, res) => {
  try {
    const allUsers = await db.User.find()
    res.json(allUsers)
  } catch (err) {
    console.log(err)
  }
})

// PUT /users/:id
router.put("/:id", async (req, res) => {
  try {
    const options = { new: true }
    const updatedUser = await db.User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      options
    )
    res.json(updatedUser)
  } catch (err) {
    console.log(err)
  }
})

// DELETE /users/:id // ****** NEED TO REMOVE USER FROM EVENTS ATTENDANCE LIST AND REMOVE THEM AS HOSTS
router.delete("/:id", async (req, res) => {
  try {

    //go through eventsAttending array, get eventId, go to the event and delete userId from attendees array, save
    foundUser = await db.User.findById(req.params.id)
    for (const eventAttending of foundUser.eventsAttending) {
      // console.log("eventsssssssssssss",eventAttend)
      foundEvent = await db.Event.findById(eventAttending)
      // console.log("foundevent!!", foundEvent)
      eventIndex = foundEvent.attendees.indexOf(foundUser.id)
      // console.log(eventIndex)
      foundEvent.attendees.splice(eventIndex, 1)
      await foundUser.save()
    }
    //go through user's hostedEvents list
    //foreach hosted Events, get the eventId, and delete the hostId, save

    // for (const hEvent of hostedEvents.hEvents) {
    //   await db.Event.findByIdAndDelete(hEvent)
    //   //cant make an event without a userId... which means we would just have to delete the event once the user is gone?
    // }

    //delete user
    // await db.User.findByIdAndDelete(req.params.id)
    res.json("user deleted from attendees")
  } catch (err) {
    console.log(err)
  }
})

// POST /users/register -- CREATE a new user
router.post("/register", async (req, res) => {
  try {
    // check if the user exist already -- dont allow them to sign up again
    const userCheck = await db.User.findOne({
      email: req.body.email,
    })

    if (userCheck)
      return res
        .status(409)
        .json({
          msg: "did you forget that you already signed up w that email? 🧐",
        })

    // hash the pass (could validate if we wanted)
    const salt = 12
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // create a user in th db
    const newUser = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    })

    // create a jwt payload to send back to the client
    const payload = {
      name: newUser.name,
      email: newUser.email,
      id: newUser.id,
    }

    // sign the jwt and send it (log them in)
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    })

    res.json({ token })
  } catch (err) {
    console.log(err)
    res.status(503).json({ msg: "oops server error 503 🔥😭" })
  }
})
// POST /users/login -- validate login credentials
router.post("/login", async (req, res) => {
  // try to find the use in the db that is logging in
  const foundUser = await db.User.findOne({
    email: req.body.email,
  })

  // if the user is not found -- return and send back a message that the user needs to sign up
  if (!foundUser)
    return res.status(400).json({ msg: "bad login credentials 😢" })

  // check the password from the req.body again the password in the db
  const matchPasswords = await bcrypt.compare(
    req.body.password,
    foundUser.password
  )
  console.log(matchPasswords)

  // if the provided info does not match -- send back an error message and return
  if (!matchPasswords)
    return res.status(400).json({ msg: "bad login credentials 😢" })

  // create a jwt payload
  const payload = {
    name: foundUser.name,
    email: foundUser.email,
    id: foundUser.id,
  }

  // sign the jwt
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  })

  // send it back
  res.json({ token })
})

// GET /users/auth-locked -- example of checking an jwt and not serving data unless the jwt is valid
router.get("/auth-locked", requiresToken, (req, res) => {
  // here we have acces to the user on the res.locals
  console.log("logged in user", res.locals.user)
  res.json({
    msg: "welcome to the auth locked route, congrats on geting thru the middleware 🎉",
  })
})

module.exports = router
