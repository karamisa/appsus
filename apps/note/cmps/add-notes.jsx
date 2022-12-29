const { useState, useEffect } = React
import { notesService } from "../services/note.service.js"

export function AddNotes() {

    const [noteType, setNoteType] = useState('note-txt')
    const [value, setValue] = useState('')
    const [placeholder, setPlaceholder] = useState('Enter new note here...')
    const [fieldName, setFieldName] = (useState('info.txt'))
    // const [newNote, setNote] = useState(notesService.createEmptyNote())


    useEffect(() => {
    }, [noteType])


    function onSelectType(noteType) {
        console.log('noteType', noteType)
        const newType = noteType
        // setNoteType(newType)
        setPlaceholder(getPlaceholder(newType))
    }


    function onSubmitNote(ev) {
        ev.preventDefault()
        addNote()
    }

    function addNote() {
   
        notesService.createNote(value.newNoteValue, noteType)
        // setNote(notesService.createEmptyNote())
        // console.log('newNote', newNote)
        // newNote.type = noteType

    }



    function handleChange({ target }) {
        let { name: field } = target
        // let { value, name: field } = target
        console.log('target.value', target.value)
        // value = (type === 'number') ? +value : value
        // setFilterByToEdit(prevFilter => {
        //     return { ...prevFilter, [field]: value }
        // })
        // console.log('value', value)
        console.log('field', field)
        // console.log('type', type)
        setValue((prevNote) => ({ ...prevNote, [field]: target.value }))

        console.log('value', value)
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
                        name="newNoteValue"
                        // value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onBlur={addNote} />
                </form>
                    <div className="buttons">
                        {setButtons()}
                    </div>
                    {/* <button>Save</button> */}
                    <button type="button">Cancel</button>
            </div>
        </section>


    </div>
}