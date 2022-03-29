const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
  title: String,
  address: String,
  city: String,
  state: String,
  zipcode: Number,
  time: String,
  date: Date,
  description: String,
  category: String,
  image: String,
  hype: Number,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model('Event', EventSchema)