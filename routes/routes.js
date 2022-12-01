const express = require('express');
const path= require('path');
const notes = require('./notes');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.get('/', (req,res) => 
res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);

//GET request for notes

app.get('/api/notes/:notes_id', (req,res) => {
    if (req.params.notes_id){
        console.info(`${req.method} notes received`);
        const notesId = req.params.notes_id;
        for (let i = 0; i < notes.length; i++) {
            const currentNotes = notes[i];
            if (currentNotes.notes_id === notesId){
                res.json(currentNotes);
                return;
            }
        }
        res.status(404).send('notes not found');
    } else{
        res.status(400).send('notes id not provided');
    }
});


//POST used to post the note to the page. 
app.post('/api/notes', (req,res) => {
    console.info(`${req.method} request received to add another note`);

    const { note, title } = req.body;

    if (note && title) {
        const newNote = {
            note,
            title,
        };

        const response = {
            status: 'success',
            body:newNote,
        };

        console.log(response);
        res.status(201).json(response);
    }else{
        res.status(500).json('error in posting note');
    }
}); 

app.listen(PORT, () => 
console.log(`app listening at http://localhost:${PORT}`)
);