const express = require('express')
const app = express()
const path = require("path")
const PORT = process.env.PORT || 3000 

app.get('/', (_, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html'), function (err) {
    if (err) { console.log(err)
    } else { console.log('Sent:', "index.html")
    }
}));

app.get('/notes', (_, res) => res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'), function (err) {
    if (err) { console.log(err)
    } else { console.log('Sent:', "notes.html")
    }
}));

app.get('/api/notes/', (_, res) => res.sendFile(path.join(__dirname, '..', 'db', 'db.json'), function (err) {
    if (err) { console.log(err)
    } else { console.log('Sent:', "db.json")
    }
}));

app.get('/*', (_, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html'), function (err) {
    if (err) { console.log(err)
    } else { console.log('Sent:', "index.html")
    }
}));

app.post('/api/notes', (_, res) => {
    console.log("post req recieved")
})

app.delete('/api/notes/:id', (_, res) => {
    console.log("delete req recieved for note")
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
