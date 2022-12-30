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

    function saveChanges(field, value, noteId) {//handles a change in text note
        console.log(value)
        const noteToUpdate = notes.find(note => note.id === noteId)
        const updatedNote = {...noteToUpdate, [field]: value}
        console.log(updatedNote)
        const idx = notes.findIndex(note => note.id===noteId)
        const updatedNotes = notes.map((note,noteIdx)=> (noteIdx===idx) ? updatedNote : note )
        setNotes(updatedNotes)
        notesService.save(updatedNote).then((updatedNote)=>{
            console.log(updatedNote)
            })
        }
          

    function onAddNote(name, title, value) {
        const newNote = notesService.getNewEmptyNote(name, title, value)
        setNotes((prevNotes) => [newNote, ...prevNotes])
        notesService.save(newNote)
    }



    return <section className="notes-index">
        <section className='notes-app main-content'>
            <AddNotes onAddNote={onAddNote} />
            <NoteFilter onSetFilter={onSetFilter} />
            {notes && < NoteList notes={notes} onRemoveNote={onRemoveNote} onNoteClicked={onNoteClicked} saveChanges={saveChanges} />}
        </section>
    </section>




}