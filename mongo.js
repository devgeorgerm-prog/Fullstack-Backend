const mongoose = require('mongoose')

if (process.env.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://devgeorgerm_db_user:${password}@cluster0.9zepjxc.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    important: true
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })
note.save().then(result => {
    console.log('note saved')
    mongoose.connection.close()
})