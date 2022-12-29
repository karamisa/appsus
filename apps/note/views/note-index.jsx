const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { AddNote } from "../cmps/add-note.jsx"
import { AddNotes } from "../cmps/add-notes.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"

import { notesService } from "../services/note.service.js"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(notesService.getFilterBy())
    //the set filter should be determined by type


    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        notesService.query().then(notes => setNotes(notes))
    }

    function onSetFilter(filterBy) {
        notesService.setFilterBy(filterBy)
        setFilterBy(filterBy)
    }


    function onRemoveNote(noteId) {
        console.log('noteId', noteId)
        notesService.removeNoteById(noteId)
            .then(() => {
                const updatedNotes = notes.filter(note => note.id !== noteId)
                setNotes(updatedNotes)
                //         showSuccessMsg('Note Removed!')
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                //         showErrorMsg('Could not remove note, try again please!')
            })
    }

    function onNoteClicked(noteId) {
        console.log('noteId', noteId)
    }

function saveChanges(text, noteId){//handles a change in text note
    console.log('text', text)
    console.log('noteId', noteId)
    const updatedNote = notes.find(note => note.id === noteId)
    updatedNote.info.txt = text
    notesService.save(updatedNote)
}


function onAddNote({target}){
    console.log('here')
    const {name, value} = target
    const newNote= notesService.createNote(name,value)
    setNotes((prevNotes)=> newNote.concat(prevNotes))
}

    console.log('notes', notes)

    return <section className="notes-index">

        <NoteFilter onSetFilter={onSetFilter} />

        <hr />

        {/* <AddNote /> */}
        <AddNotes onAddNote={onAddNote}/>

        <hr />

        {notes && < NoteList notes={notes} onRemoveNote={onRemoveNote} onNoteClicked ={onNoteClicked} saveChanges={saveChanges}/>}



    </section>




}
