require('dotenv').config()
const express = require('express')
let morgan = require('morgan')
const app = express()

const Note = require('./models/note')
app.use(express.json())

app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time[4] ms :body'))

let phonebook = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456",
        "important": true
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "important": true

    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "important": false
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "important": false

    }
]

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]


app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.get('/api/phonebook', (req, res) => {
    res.json(phonebook)
})

app.get('/info', (req, res) => {
    const now = new Date();
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${now}</p>    
    `)
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        res.json(note)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    return String(Math.floor(Math.random() * 100))
}
app.post('/api/notes', (req, res) => {
    const body = req.body
    if (!body.content){
        return res.status(400).json({error: 'content missing'})
    }

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
})