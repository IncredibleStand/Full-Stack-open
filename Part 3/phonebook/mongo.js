const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://incrediblestand:${password}@cluster0.npfkz.mongodb.net/phoneBookApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)


// Only password provided -> LIST entries
if (process.argv.length === 3) {
  PhoneBook.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`)
    })
    mongoose.connection.close()
  })
}
// Password, Name, and Number provided -> ADD entry
else {
  const name = process.argv[3]
  const number = process.argv[4]

  if (process.argv.length < 5) {
    console.log(`Your Usage: node mongo.js ${password} ${name}`)
    console.log('Expected Usage: node mongo.js <password> <name> <number>')

    mongoose.connection.close()
    process.exit(1)
  }

  const phoneBookEntry = new PhoneBook({
    name: name,
    number: number,
  })

  phoneBookEntry.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

