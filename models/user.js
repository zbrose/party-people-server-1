const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  eventAttending: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  hostedEvents: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
})


//If we do join table version
// const AttendeSchema = mongoose.Schema({
//   Attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] ,
//   EventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
// })

module.exports = mongoose.model('User', UserSchema)
