import { NotePreview } from "./note-preview.jsx"


export function NoteList({ notes, onRemoveNote, onNoteClicked, saveChanges }) {

    return <section className="notes-list-full">

        <div className='notes-pinned'>
            <div className='note-list-title'>Pinned</div>
            <div className="notes-list">
                {
                    notes.map(note =>
                        note.isPinned && <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onNoteClicked={onNoteClicked} saveChanges={saveChanges} />
                    )
                }
            </div>
        </div>
        <div className='notes-others'>
            <div className='note-list-title'>Others</div>
            <div className="notes-list">
                {
                    notes.map(note =>
                        (!note.isPinned) && <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onNoteClicked={onNoteClicked} saveChanges={saveChanges} />
                    )
                }
            </div>
        </div>
    </section>

}
