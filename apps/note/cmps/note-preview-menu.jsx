import { ColorPaletteSelector } from "./color-palette-selector.jsx"


export function NotePreviewMenu({ note, saveChanges, onRemoveNote }) {
    function handleClick(btn) {
        if (btn === 'pin') {
            saveChanges('isPinned', !note.isPinned, note.id)
        }
        if (btn === 'remove') {
            onRemoveNote(note.id)
        }
    }

    const pinClassName = note.isPinned ? "fa-solid fa-thumbtack pin-yellow" : "fa-solid fa-thumbtack pin-regular"
    return (
        <div className='note-menu'>
            <ColorPaletteSelector note={note} saveChanges={saveChanges}/>
            <button className="note-menu-btn" onClick={() => handleClick('remove')}>
                <i className="fas fa-trash-alt" aria-hidden="true"></i>
            </button>
            <button type="button" className="note-menu-btn" onClick={() => handleClick('pin')}>
                <i className={pinClassName}></i>
            </button>

        </div>
    )
}