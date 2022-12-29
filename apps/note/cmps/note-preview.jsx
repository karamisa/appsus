
export function NotePreview({ note, onRemoveNote, saveChanges}) {


    return <div key={note.id} className="notes-previews-container">
        <DynamicCmp type={note.type} note={note} saveChanges={saveChanges} onRemoveNote={onRemoveNote}/>
    </div >


}



function DynamicCmp(props) {
    switch (props.type) {
        case 'note-txt':
            return <TextNote {...props} />
        case 'note-img':
            return <ImgNote {...props} />
        case 'note-todos':
            return <TodoNote {...props} />
    }
}


function TextNote({ note, saveChanges, onRemoveNote }) {

    function handleEdit(ev) {
        console.log(ev)
        let {innerText: txt} = ev.target
        saveChanges({txt},note.id)
    }

    return <section className='note-preview' style={note.style}>
        <button type="button" className="pin-note">📌</button>
        <h4>{note.info.title}</h4>
        <p contentEditable suppressContentEditableWarning={true} onBlur={handleEdit}>{note.info.txt}</p>
        <button className="remove-btn btn" onClick={() => onRemoveNote(note.id)}>delete</button>
    </section>

}

function ImgNote({ note, onRemoveNote }) {
    return <section className='note-preview' style={note.style}>
        <button type="button" className="pin-note">📌</button>
        <h4>{note.info.title}</h4>
        <img src={note.info.url} alt={note.info.title} />
        <button className="remove-btn btn" onClick={() => onRemoveNote(note.id)}>delete</button>
    </section>

}

function TodoNote({ note, saveChanges, onRemoveNote }) {

    function handleEdit(ev) {
        console.log(ev)
        if (ev.target.id==='title'){
        var updatedinfo = {...note.info, title: ev.target.innerText}
        console.log(updatedinfo)
        saveChanges(updatedinfo,note.id)
        }

    }

    return <section className='note-preview' style={note.style}>
        <button type="button" className="pin-note">📌</button>
        <h4>{note.info.title}</h4>
        <ul className="todo-list">
            <li contentEditable suppressContentEditableWarning={true} onBlur={handleEdit} id="todo">get li map here</li>
        </ul>
        <button className="remove-btn btn" onClick={() => onRemoveNote(note.id)}>delete</button>

    </section>


}