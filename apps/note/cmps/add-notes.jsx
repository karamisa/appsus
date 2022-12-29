const { useState, useEffect } = React
import { notesService } from "../services/note.service.js"

export function AddNotes({ onAddNote }) {

    const [noteType, setNoteType] = useState('note-txt')
    const [value, setValue] = useState('')
    const [placeholder, setPlaceholder] = useState('Enter new note here...')

    function onSelectType(noteType) {
        setNoteType(noteType)
        setButtons(noteType)
        setPlaceholder(getPlaceholder(noteType))
        setValue('')
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        if (ev.target.value!=='') {
            console.log()
            onAddNote(ev.target[0].name, ev.target[0].value)
            setValue('')
    }}


    function handleChange({ target }) {
        let { value } = target
        setValue(value)
    }

    function handleBlur(ev){
        if (ev.target.value!=='') {
            console.log(ev.target.name, ev.target.value)
        onAddNote(ev.target.name, ev.target.value)
        setValue('')
    }
}


    function setButtons(noteType) {
        const buttonsIcons = [
            <i onClick={() => onSelectType('note-txt')} className={`far fa-sticky-note ${(noteType === 'note-txt') ? 'active' : ''}`}></i>,
            // <i onClick={() => onSelectType('note-video')} className={`fab fa-youtube ${(noteType === 'note-video') ? 'active' : ''} `}></i>,
            <i onClick={() => onSelectType('note-img')} className={`far fa-images ${(noteType === 'note-img') ? 'active' : ''}`}></i>,
            <i onClick={() => onSelectType('note-todos')} className={`far fa-list-alt ${(noteType === 'note-todos') ? 'active' : ''}`}></i>]
        const buttons = buttonsIcons.map((icon, idx) => <button
            className="button-type" key={idx} >{icon}</button>)
        return buttons
    }

    function getPlaceholder(noteType) {
        switch (noteType) {
            case 'note-txt':
                return 'Enter new note here...'
            case 'note-img':
                return 'Enter image url...'
            // case 'note-video':
            //     return 'Enter video url...'
            case 'note-todos':
                return 'Enter Todo title here...'
        }
    }

    return <div>
        <h2>Add notes take</h2>
        <section className="add-note">
            <div className="add-input">
                <form onSubmit={onSubmitNote}>
                    <input
                        type="text"
                        value={value}
                        name={noteType}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onBlur={(event) => handleBlur(event)} />
                        <button>Add</button>
                </form>
                <div className="buttons">
                    {setButtons()}
                </div>
                {/* <button>Save</button> */}
                {/* <button type="button">Cancel</button> */}
            </div>
        </section>


    </div>
}