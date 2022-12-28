const { useState, useEffect } = React
const {Link} = ReactRouterDOM

import { AddNote } from "../cmps/add-note.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"

import { notesService } from "../services/note.service.js"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [filterBy , setFilterBy] = useState(notesService.getFilterBy())
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


console.log('notes', notes)

    return <section className="notes-index"> 
    
    <NoteFilter onSetFilter={onSetFilter} />

<hr />

    <AddNote />

<hr />

{notes && < NoteList notes={notes} onRemoveNote={onRemoveNote} />}
       


    </section>




}
