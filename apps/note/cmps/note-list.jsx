import { NotePreview } from "./note-preview.jsx"

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote}) {

    return <ul className="note-list grid full">
    {
        notes.map(note => <li key={note.id} className="flex space-between column" >
            <NotePreview note={note}/>
           <section className="btns">
             {/* <Link className="select-btn btn" to={`/note/details/${note.id}`}></Link> */}
           <button className="remove-btn btn" onClick={() => onRemoveNote(note.id)}>delete</button>          
           </section>
        
        </li>)
    }
</ul>

}
