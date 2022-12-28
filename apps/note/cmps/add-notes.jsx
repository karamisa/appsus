const { useState, useEffect } = React
import { notesService } from "../services/note.service.js"

export function AddNotes() {

    const [noteType, setNoteType] = useState('note-txt')
    const [value, setValue] = useState('')
    const [placeholder, setPlaceholder] = useState('Enter new note here...')
    const [newNote, setNote] = useState(notesService.createEmptyNote())

    useEffect(() => {
        setNote()
    }, [noteType])


    function onSelectType(noteType) {
        console.log('noteType', noteType)
        const newType = noteType
        setNoteType(newType)
        getPlaceholder(newType)
    }


    function onSubmitNote(ev) {
        ev.preventDefault()
        addNote()
    }

    function addNote(ev) {
        ev.preventDefault()
    }



    function handleChange({ target }) {
        // let { value, name: field, type } = target
        console.log('target.value', target.value)
        // value = (type === 'number') ? +value : value
        // setFilterByToEdit(prevFilter => {
        //     return { ...prevFilter, [field]: value }
        // })
        // console.log('value', value)
        // console.log('field', field)
        // console.log('type', type)
        // setNoteInfoToEdit((prevNote) => ({ ...prevNote, [field]: value }))
    }


   

    function setButtons() {
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
        <h2>Add notes takeII</h2>
        <section className="add-note">
            <div className="add-input">
                <form onSubmit={onSubmitNote}>
                    <input
                        type="text"
                        name="value"
                        value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onBlur={addNote} />
                    <div className="buttons">
                        {setButtons()}
                    </div>
                    {/* <button>Save</button> */}
                    <button type="button">Cancel</button>
                </form>
            </div>
        </section>


    </div>
}