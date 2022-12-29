import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'notesDB'
let gFilterBy = { type: '' }
_createNotes()

export const notesService = {
    // getNotes,
    query,
    getNoteById,
    removeNoteById,
    save,
    getNewEmptyNote,
    getNextNoteId,
    getPrevNoteId,
    setFilterBy,
    getFilterBy,
}


function query() {
    // console.log('gFilterBy query', gFilterBy)
    return storageService.query(NOTES_KEY)
        .then(notes => {
            if (gFilterBy.type) {
                // const regex = new RegExp(gFilterBy.txt, 'i')
                notes = notes.filter(note => note.type === gFilterBy.type)
            }
            // if (gFilterBy.minScore) {
            //     notes = notes.filter(note => note.score >= gFilterBy.minScore)
            // }
            return notes
        })
}

function getNoteById(id) {
    return storageService.get(NOTES_KEY, id)
}

function removeNoteById(id) {
    return storageService.remove(NOTES_KEY, id)
}

function save(note) { //add if not empty?
    if (note.id && !note._id) {
        return storageService.put(NOTES_KEY, note) 
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getNewEmptyNote(type='note-txt',value='') {
    let emptyItem = {}
    switch (type) {
        case 'note-txt':
            emptyItem = {
                id:'',
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: '',
                    txt: value,
                },
                style: {
                    backgroundColor: 'blue'
                }
             }
            break
        case 'note-img':
            emptyItem = {
                id:'',
                type: 'note-img',
                isPinned: false,
                info: {
                    title: '',
                    url: value,
                },
                style: {
                    backgroundColor: 'skyblue'
                }
             }
            break
        case 'note-todos':
            emptyItem = {
                id:'',
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: value, 
                    todos:[
                        {txt:'' , doneAt: null}
                    ]
                },
                style: {
                    backgroundColor: 'red'
                }
             }
            break
    }
    return emptyItem
}

function getNextNoteId(noteId) {
    return storageService.query(NOTES_KEY)
    .then(notes => {
        var idx = notes.findIndex(note => note.id === noteId)
        if (idx === notes.length - 1) idx = -1
        return notes[idx + 1].id
    })
}

function getPrevNoteId(noteId) {
    return storageService.query(NOTES_KEY)
    .then(notes => {
        let idx = notes.findIndex(note => note.id === noteId)
        if (idx === 0) idx = notes.length - 0
        return notes[idx - 1].id
    })
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    // console.log('filterBy', filterBy)
    if (filterBy.type !== undefined) gFilterBy.type = filterBy.type
    // if (filterBy.minScore !== undefined) gFilterBy.minScore = filterBy.minScore
    return gFilterBy
}

function _createDemoKeepNotes() {
    
    const notes = [
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                title: 'NOTES!!!!',
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: 'rgb(235 100 30)'
            }
        },
        {
            id: "n102",
            type: "note-img",
            isPinned:true,
            info: {
                url: `/apps/note/img/bobiandme.png`,
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: 'rgb(235 125 125)'
            }
        },
        {
            id:'n104',
            type: "note-todos",
            isPinned:false,
            info: {
                title: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            },
            style: {
                backgroundColor: 'rgb(40 67 299)'
            }
        }
    ]
    
    utilService.saveToStorage(NOTES_KEY, notes)
    
}

function _createNotes() {
    
    let notesDB = utilService.loadFromStorage(NOTES_KEY)
    if (!notesDB || !notesDB.length) {
        _createDemoKeepNotes()
    }
    
}

function getNewTodo() {
    return emptyTodo = { txt: '', done: null, id: utilService.makeId() }
}

function _setInfoByType(type) {
     switch (type) {
        case 'note-txt':
            return 'txt'
        case 'note-img':
            return 'url'
        case 'note-todos':
            return 'title'
    }
}

function _createTodo(txt) {
    return {
        id: utilService.makeId(),
        txt,
        isDone: false,
    }
}