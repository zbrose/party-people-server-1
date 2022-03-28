const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  eventsAttending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  hostedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
})


module.exports = mongoose.model('User', UserSchema)
