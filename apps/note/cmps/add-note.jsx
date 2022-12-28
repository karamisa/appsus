
const { useState, useEffect } = React
import { notesService } from "../services/note.service.js"

export function AddNote() {

    const [noteType, setNoteType] = useState('note-txt')
    const [noteToEdit, setNoteToEdit] = useState(notesService.getNewEmptyNotes(noteType))

    useEffect(() => {
    }, [noteType])
    
    
    function onSelectType(noteType) {
        console.log('noteType', noteType)
        setNoteType(noteType)
        // setNoteToEdit()
    }


    function submitNote({target}) {
    
    console.log('target', target)
    let { type , value, value3, value4 } = target
    console.log('type', type)
    console.log('value', value)
    console.log('value3', value3)
    console.log('value4', value4)
    }

    console.log('noteToEdit', noteToEdit)

    // function submitNote(ev) {
    //     ev.preventDefault()
    //     let newNote = {}
    //     switch (noteType) {
    //         case 'note-txt':
    //             newNote = {
    //                 type: "note-txt",
    //                 isPinned: false,
    //                 info: {
    //                     title: ev.target[1].value,
    //                     txt: ev.target[2].value
    //                 },
    //                 style: {
    //                     backgroundColor: ev.target[6].value
    //                 }
    //             }
    //             break
    //         case 'note-img':
    //             newNote = {
    //                 type: "note-img",
    //                 isPinned: false,
    //                 info: {
    //                     title: ev.target[1].value,
    //                     url: ev.target[2].value,
    //                   },
    //                 style: {
    //                     backgroundColor: ev.target[6].value
    //                 }
    //             }
    //             break
    //         case 'note-todos':
    //             newNote = {
    //                 type: "note-todos",
    //                 isPinned: false,
    //                 info: {
    //                     label: "Get my stuff together",
    //                     title: ev.target[1].value,
    //                     url: ev.target[2].value,
    //                     todos: [
    //                         { txt: ev.target[4].value, doneAt: null },
    //                         { txt: "Coding power", doneAt: 187111111 }
    //                     ]
    //                   },
    //                 style: {
    //                     backgroundColor: ev.target[8].value
    //                 }
    //             }
    //             break
    //     }

    //     console.log('ev', ev)
    //     console.log('ev target title', ev.target[1].value)
    //     console.log('ev target text', ev.target[2].value)
    //     console.log('ev target bck', ev.target[6].value)
    //     console.log('newNote', newNote)
    // }



    console.log('noteType-open', noteType)

    return <section className="add-note">
        <h2>Add a note...</h2>

        <form className="flex column" onSubmit={submitNote}>
            <button type="button" className="pin-note">📌</button>
            <input type="text" className="title" placeholder="title.." value=""/>

            <DynamicCmp type={noteType} />

            <section className="add-note-footer">
                <div className="flex space-between">
                    <datalist id="colorList">
                        <option value="#fee7df"></option>
                        <option value="#6ebfb9"></option>
                        <option value="#bee1e5"></option>
                        <option value="#f2c643"></option>
                    </datalist>
                    <div>
                        <button type="button" className="edit-btn close">Close</button>
                        <button className="edit-btn save">Add</button>
                    </div>
                    <button className="edit-btn color-btn" >
                        <input type="color" value="#bfc0d4" list="colorList" />
                    </button>
                    <div className="note-type">
                        <button className="txt-btn" onClick={() => onSelectType('note-txt')}>txt</button>
                        <button className="img-btn" onClick={() => onSelectType('note-img')}>img</button>
                        <button className="todo-btn" onClick={() => onSelectType('note-todos')}>todo</button>
                    </div>
                </div>
            </section>
        </form>
    </section>
}

function DynamicCmp({ type } = 'note-txt') {
    switch (type) {
        case 'note-txt':
            return <TextNote />
        case 'note-img':
            return <ImgNote />
        case 'note-todos':
            return <TodoNote />
    }
}


function TextNote() {

    return <div className="edit-note-txt">
        <textarea name="" id="txt-input" rows="1" placeholder="Your text..." className="free-txt">
        </textarea>
    </div>
}

function ImgNote() { // use && to rander form or img when available
    return <div className="flex edit-note-img">
        <form className="img-uploader flex align-center">
            <input type="text" name="img-url" placeholder="Enter URL" />
            <h3>OR</h3>
            <button type="button" className="imt-upload-btn">
                "Upload image"
                <input type="file" className="file-input" />
            </button>
        </form>
        <div className="img-container">
            <input type="file" className="file-input absolute-full change-img" />
        </div>
    </div>
}

function TodoNote() {
    return <div className="edit-note-todo">
        <ul className="todo edit clean-list">
            <li>
                <div className="flex align-center">
                    <button type="button">X</button>
                    <input type="checkbox" name="checkbox" />
                    <input type="text" />
                </div>
            </li>
        </ul>
        <button type="button">+</button>
    </div>
}