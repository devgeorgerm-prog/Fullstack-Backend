const express = require('express')
let morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time[4] ms :body'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
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
    res.json(notes)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const now = new Date();
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${now}</p>    
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) return res.json(person)
    else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    return String(Math.floor(Math.random() * 100))
}
app.post('/api/persons', (req, res) => {
    const body = req.body
    const findDuplicate = persons.find(person => person.name === body.name)
    if (!body.name || body.name === "") {
        return res.status(400).json({
            error: 'No name'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'No Number'
        })
    } else if (findDuplicate) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
})