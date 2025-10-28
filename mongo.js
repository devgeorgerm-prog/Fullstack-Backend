const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting...')

mongoose.connect(url).then(result => {
    console.log('Connected!')
}).catch(err => console.log('Error connecting to MongoDB', err.message))

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

phonebookSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)