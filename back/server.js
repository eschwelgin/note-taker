const express = require('express')
const app = express()
const path = require("path")
let database = require("../db/db.json")
// let databaseObj = JSON.parse(database)
const PORT = process.env.PORT || 3000 
const fs = require('fs')

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'), function (err) {
        if (err) { console.log(err)
        } else { console.log('Sent:', "index.html")
        }
    })
    console.log(`${req.method} from ${req.ip} 
            for ${req.hostname}${req.url} params=${JSON.stringify(req.params)} query=${JSON.stringify(req.query)}`)
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'), function (err) {
        if (err) { console.log(err)
        } else { console.log('Sent:', "notes.html")
        }
    })
    console.log(`${req.method} from ${req.ip} 
            for ${req.hostname}${req.url} params=${JSON.stringify(req.params)} query=${JSON.stringify(req.query)}`)
});

app.get('/api/notes/', (req, res) => {
    res.json(database)
    console.log(`${req.method} from ${req.ip} 
            for ${req.hostname}${req.url} params=${JSON.stringify(req.params)} query=${JSON.stringify(req.query)}`)
    console.log('Sent DB')
})
    

app.get('/*/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'), function (err) {
        if (err) { console.log(err)
        } //else { console.log('/* Hit')}
    })
    // console.log(req.method, req.url, req.params, req.query)
});

function databaseId() {
    const length = database.map (database => database.id)
    return (length.length)
};

app.post('/api/notes', (req, res) => {
    //curl -H "Content-Type: application/json" --data '{"title":"Test 4","text":"Test Text"}' localhost:3000/api/notes
    res.status(200)
        .send(`Note Updated \n`)
    database.push({"id":databaseId(),"title":req.body.title,"text":req.body.text})
    // database.push(req.body)
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(database, null, 4), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('DataBase Updated')
            console.log(database)
        }
    })
    // console.log(databaseId())



})

app.delete('/api/notes/:id', (req, res) => {
    //curl -X "DELETE" localhost:3000/api/notes/1
    console.log(`Delete note "${req.params.id}"`)
    database.splice(req.params.id, 1)
    res.status(200).send(`${req.params.id} deleted \n`)
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(database), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('DataBase Updated')
            console.log(database)
        }
    })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
