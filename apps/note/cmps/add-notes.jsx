const { useState } = React

export function AddNotes({ onAddNote }) {

    const [noteType, setNoteType] = useState('note-txt')
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')

    function onSelectType(noteType) {
        setNoteType(noteType)
        setValue('')
    }

    function onSubmitNote(ev) {
        ev.preventDefault()
        if (value !== '') {
            onAddNote(noteType, title, value)
            setValue('')
            setTitle('')
        }
    }


    function handleChange({ target }) {
        let { value, name } = target
        if (name === noteType) setValue(value)
        if (name === 'title') setTitle(value)

    }

    // function onBlur(e) {
    //     console.log(e)
    //     if (e.target.name !== 'title') {
    //         if (value !== '') {
    //             onAddNote(noteType, title, value)
    //             setValue('')
    //             setTitle('')
    //         }
    //     }
    // }

    function setButtons(noteType) {
        const buttonsIcons = [
            <i onClick={() => onSelectType('note-txt')} className={(noteType === 'note-txt') ? 'far fa-sticky-note active' : 'far fa-sticky-note'}></i>,
            <i onClick={() => onSelectType('note-video')} className={(noteType === 'note-video') ? 'fab fa-youtube active' : 'fab fa-youtube'}></i>,
            <i onClick={() => onSelectType('note-img')} className={(noteType === 'note-img') ? 'far fa-images active' : 'far fa-images'}></i>,
            <i onClick={() => onSelectType('note-todos')} className={(noteType === 'note-todos') ? 'far fa-list-alt active' : 'far fa-list-alt'}></i>]
        const buttons = buttonsIcons.map((icon, idx) => <div
            className="button-type" key={idx} >{icon}</div>)
        return buttons
    }

    function getPlaceholder(noteType) {
        switch (noteType) {
            case 'note-txt':
                return 'Take a note...'
            case 'note-img':
                return 'Enter image url...'
            case 'note-video':
                return 'Enter Youtube url...'
            case 'note-todos':
                return 'Enter todo here...'
        }
    }

    return (
        <section className="add-note">
            <form onSubmit={onSubmitNote} name='add-note-form'>
                <input
                    className='form-add-title'
                    type="text"
                    value={title}
                    name='title'
                    placeholder='Title'
                    onChange={handleChange} />
                <input
                    type="text"
                    className='form-add-value'
                    value={value}
                    name={noteType}
                    placeholder={getPlaceholder(noteType)}
                    onChange={handleChange} />
                <div className="form-menu">
                    <div className='add-options'>
                        {setButtons(noteType)}
                    </div>
                    <button className='add-btn' onClick={onSubmitNote}>Add</button>
                </div>
            </form>
        </section>
    )
}