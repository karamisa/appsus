const { useState, useEffect } = React

import { notesService } from "../services/note.service.js"


export function NoteFilter({ onSetFilter }){

    const [filterByToEdit, setFilterByToEdit] = useState(notesService.getFilterBy())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { value, name: field, type } = target
        // value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            return {...prevFilter, [field]: value}
        })
    }


    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    return <section className="note-filter">
        <form className="filter-form" onSubmit={onSubmitFilter}>
            {/* <label htmlFor="title">Title:</label> */}
            <input type="list"
                id="type"
                name="type"
                placeholder="Search by type"
                onChange={handleChange} /> 
            <datalist>
                <option value="note-txt">text</option>
                <option value="note-img">image</option>
                <option value="note-todos">todo</option>
            </datalist>
            



        </form>

    </section>



}