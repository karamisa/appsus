const { useState, useEffect } = React
const {Link} = ReactRouterDOM

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
        notesService.query(filterBy).then(notes => setNotes(notes))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    function onRemoveNote(noteId) {
        // BooksService.remove(bookId)
        //     .then(() => {
        //         const updatedBooks = books.filter(book => book.id !== bookId)
        //         setBooks(updatedBooks)
        //         showSuccessMsg('Book Removed!')
        //     })
        //     .catch((err) => {
        //         console.log('Had issues removing', err)
        //         showErrorMsg('Could not remove book, try again please!')
        //     })
    }


console.log('notes', notes)

    return <section className="notes-index">note app
    
    <NoteFilter onSetFilter={onSetFilter} />

<hr />


{notes && < NoteList notes={notes} onRemoveNote={onRemoveNote} />}
       


    </section>




}
