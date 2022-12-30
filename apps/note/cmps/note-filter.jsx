const { useState, useEffect } = React

import { notesService } from "../services/note.service.js"


export function NoteFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(notesService.getFilterBy())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function onSelectFilter(type) {
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, type: type }
        })
    }




    return <section className="note-filter">
        Filter By:
        <button className="select-txt" onClick={() => onSelectFilter('note-txt')}>TEXT</button>
        <button className="select-txt" onClick={() => onSelectFilter('note-img')}>IMAGE</button>
        <button className="select-txt" onClick={() => onSelectFilter('note-todos')}>TODO</button>
        <button className="select-txt" onClick={() => onSelectFilter('')}>ALL</button>
    </section>
}