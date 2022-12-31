import { NotePreview } from "./note-preview.jsx"


export function NoteList({ notes, onRemoveNote, onNoteClicked, saveChanges}) {

    return <section className="notes-list">
    {
        notes.map(note => 
            <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onNoteClicked={onNoteClicked} saveChanges={saveChanges}/>       
        )
    }
</section>

}
