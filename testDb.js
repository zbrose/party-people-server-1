const db = require('./models')

// const testUser = async () => {
//   try {
//     const newUser = await db.User.create({
//       name: 'Bryan',
//       email: 'bryan@weston.gov',
//       password: 'password1234'
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

// const testEvent = async () => {
//   try {
//     const newEvent = await db.Event.create({
//       title: "Video Games",
//       address: "1234 Howdy St",
//       city: "San Diego",
//       state: "CA",
//       zipcode: "92111",
//       date: new Date(),
//       description: "Party at my house",
//       category: "Video Games",
//     })
//   } catch (err) {
//     console.log(err)
//   }
// }

// testUser()
// testEvent()

const foundUser = db.User.findOne({
  email: "weston@weston.gov"
})  

console.log(foundUser)