const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { AddNotes } from "../cmps/add-notes.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { NoteList } from "../cmps/note-list.jsx"

import { notesService } from "../services/note.service.js"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(notesService.getFilterBy())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        notesService.query().then(notes => {
            console.log(notes)
            setNotes(notes)
        })
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

    function saveChanges(info, noteId) {//handles a change in text note
        const updatedNote = notes.find(note => note.id === noteId)
        updatedNote.info = info
        notesService.save(updatedNote)
    }


    function onAddNote(name, value) {
        const newNote = notesService.getNewEmptyNote(name, value)
        notesService.save(newNote).then((note) => {
            setNotes((prevNotes) => [note, ...prevNotes])
        })
        console.log(newNote)
    }



    return <section className="notes-index">
        <header>
            <div>LOGO</div>
            <div>NAV</div>
        </header>
        <section className='notes-app main-content'>
            <NoteFilter onSetFilter={onSetFilter} />
            <AddNotes onAddNote={onAddNote} />
            {notes && < NoteList notes={notes} onRemoveNote={onRemoveNote} onNoteClicked={onNoteClicked} saveChanges={saveChanges} />}
        </section>
    </section>




}