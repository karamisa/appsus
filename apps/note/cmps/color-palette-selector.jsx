export function ColorPaletteSelector({note, saveChanges}) {
    function onSetColor(color){
        const updatedStyle = {backgroundColor: color}
        saveChanges('style', updatedStyle, note.id)
    }
    return (
    <div className='note-color-btn-container'>
        <button className='note-menu-btn'>
            <i className="fas fa-palette" aria-hidden="true"></i>
        </button>
        <div className="note-colors-palette-container color-select">
            <div className="note-colors-palette white" onClick={()=> onSetColor('white')}></div>
            <div className="note-colors-palette blue" onClick={()=> onSetColor('blue')}></div>
            <div className="note-colors-palette orange" onClick={()=> onSetColor('orange')}></div>
            <div className="note-colors-palette yellow" onClick={()=> onSetColor('yellow')}></div>
            <div className="note-colors-palette green" onClick={()=> onSetColor('green')}></div>
        </div>
    </div>
    )
}