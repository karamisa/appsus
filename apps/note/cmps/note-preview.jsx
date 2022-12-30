import { NotePreviewMenu } from "./note-preview-menu.jsx"


export function NotePreview({ note, onRemoveNote, saveChanges }) {
    return <div key={note.id} className="notes-previews-container">
        <DynamicCmp type={note.type} note={note} saveChanges={saveChanges} onRemoveNote={onRemoveNote} />
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
        case 'note-video':
            return <TodoVideo {...props} />
    }
}


function TextNote({ note, saveChanges, onRemoveNote }) {

    function handleEdit(ev) {
        console.log(ev)
        let { innerText: txt } = ev.target
        const updatedInfo = { ...note.info, txt }
        saveChanges('info', updatedInfo, note.id)
    }

    return <section className='note-preview' style={note.style}>
        <h4>{note.info.title}</h4>
        <p contentEditable suppressContentEditableWarning={true} onBlur={handleEdit}>{note.info.txt}</p>
        <NotePreviewMenu note={note} onRemoveNote={onRemoveNote} saveChanges={saveChanges} />
    </section>
}

function ImgNote({ note, saveChanges, onRemoveNote }) {
    return <section className='note-preview' style={note.style}>
        <h4>{note.info.title}</h4>
        <img src={note.info.url} alt={note.info.title} />
        <NotePreviewMenu note={note} onRemoveNote={onRemoveNote} saveChanges={saveChanges} />
    </section>

}

function TodoNote({ note, saveChanges, onRemoveNote }) {

    function handleEdit(ev) {
        console.log(ev)
        if (ev.target.id === 'nextToDo' && ev.target.value) {
            const newTodo = { txt: ev.target.value, doneAt: null }
            var updatedinfo = { ...note.info, todos: [...note.info.todos, newTodo] }
            console.log(updatedinfo)
            saveChanges('info', updatedinfo, note.id)
            ev.target.value = ''
        }
        if (ev.target.id === 'todoTitle') {
            let { innerText: txt } = ev.target
            var updatedinfo = { ...note.info, title: txt }
            console.log(updatedinfo)
            saveChanges('info', updatedinfo, note.id)
        }
    }

    function onToggleTodo(idx) {
        const todoToUpdate = note.info.todos[idx]
        todoToUpdate.doneAt = (!todoToUpdate.doneAt) ? Date.now() : ''
        const updatedToDos = note.info.todos.map((todo, todoIdx) => (todoIdx === idx) ? todoToUpdate : todo)
        const updatedinfo = { ...note.info, todos: updatedToDos }
        saveChanges('info', updatedinfo, note.id)
    }

    function onRemoveTodo(idx) {
        note.info.todos.splice(idx, 1)
        var updatedinfo = { ...note.info }
        saveChanges('info', updatedinfo, note.id)
    }

    return <section className='note-preview' style={note.style}>
        <h4
            id='todoTitle'
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={handleEdit}
        >
            {note.info.title}
        </h4>
        <ul className="todo-list">
            {
                note.info.todos.map((todo, idx) => {
                    return <li key={idx}>
                        <div className='todo-list-item'>
                            <div
                                className={(!todo.doneAt) ? 'todo-incomplete' : 'todo-complete'}
                                id="todo"
                                onClick={() => onToggleTodo(idx)}
                            >
                                {todo.txt}
                            </div>
                                <i className="fa-solid fa-x" onClick={() => onRemoveTodo(idx)}></i>
                        </div>
                    </li>
                })
            }
            <input className='next-todo-input' id='nextToDo' placeholder='I need to...' onBlur={handleEdit} onKeyPress={(e) => { (e.key === 'Enter' ? handleEdit(e) : null) }} />
        </ul>
        <NotePreviewMenu note={note} onRemoveNote={onRemoveNote} saveChanges={saveChanges} />
    </section>
}

function TodoVideo({ note, saveChanges, onRemoveNote }) {
    return <section className='note-preview' style={note.style}>
        <h4>{note.info.title}</h4>
        <iframe width='100%' src={note.info.url} ></iframe>
        <NotePreviewMenu note={note} onRemoveNote={onRemoveNote} saveChanges={saveChanges} />
    </section>
}

