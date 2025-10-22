const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://devgeorgerm_db_user:${password}@cluster0.9zepjxc.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})


const Phonebooks = mongoose.model('phonebook', phonebookSchema)

if (process.argv.length > 5) {
    console.log('Invalid')
    mongoose.connection.close()
} else if (process.argv.length < 4) {
    Phonebooks.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
} else {
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const phonebook = new Phonebooks({
        name: newName,
        number: newNumber
    })

    phonebook.save().then(result => {
        console.log(`added ${newName} ${newNumber} to phonebook`)
        mongoose.connection.close()
    })
}