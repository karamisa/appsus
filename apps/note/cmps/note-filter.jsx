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



    return (
        <section className="note-filter-list">
            <div className="side-filter">  
            <div className="filter-container">
                <div
                    className={`filter-item ${filterByToEdit.type === '' ? 'active' : ''} note-all`}
                    onClick={() => onSelectFilter('')}
                >
                    <div className="filter-icon flex" label="All">
                        <i className="fa-regular fa-lightbulb"></i>
                        <span className="filter-name">Notes</span>
                    </div>
                </div>
                <div
                    className={`filter-item ${filterByToEdit.type === 'note-txt' ? 'active' : ''} note-txt`}
                    onClick={() => onSelectFilter('note-txt')}
                >
                    <div className="filter-icon flex" label="Text">
                        <i className='far fa-sticky-note'></i>
                        <span className="filter-name">Text</span>
                    </div>
                </div>
                <div
                    className={`filter-item ${filterByToEdit.type === 'note-video' ? 'active' : ''} note-video`}
                    onClick={() => onSelectFilter('note-video')}
                >
                    <div className="filter-icon flex" label="Videos">
                        <i className='fab fa-youtube'></i>
                        <span className="filter-name">Videos</span>
                    </div>
                </div>
                <div
                    className={`filter-item ${filterByToEdit.type === 'note-img' ? 'active' : ''} note-img`}
                    onClick={() => onSelectFilter('note-img')}
                >
                    <div className="filter-icon flex" label="Images">
                        <i className='far fa-images'></i>
                        <span className="filter-name">Images</span>
                    </div>
                </div>
                <div
                    className={`filter-item ${filterByToEdit.type === 'note-todos' ? 'active' : ''} note-todos`}
                    onClick={() => onSelectFilter('note-todos')}
                >
                    <div className="filter-icon flex" label="Todos">
                        <i className='far fa-list-alt'></i>
                        <span className="filter-name">Todos</span>
                    </div>
                </div>
            </div>
            </div>

        </section>
    )
}