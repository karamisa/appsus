import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'notesDB'
let gFilterBy = { type: '' }

export const notesService = {
    // getNotes,
    query,
    getNoteById,
    removeNoteById,
    save,
    getEmptyNote,
    getNewEmptyNotes,
    createEmptyNote,
    createNote,
    getNextNoteId,
    getPrevNoteId,
    setFilterBy,
    getFilterBy,
}

_createNotes()

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
    if (note.id) {
        return storageService.put(NOTES_KEY, note) //change to update?
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getEmptyNote(type = 'note-txt', backgroundColor = '#ffffff') {
    const emptyItem = _setInfoType(type)
    // return { id: '', vendor, maxSpeed }
    return { id: '', type, info, backgroundColor }
}


function getNewEmptyNotes(type) {
    let emptyItem = {}
    switch (type) {
        case 'note-txt':
            emptyItem = {
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                },
                style: {
                    backgroundColor: '#ffffff'
                }
             }
            break
        case 'note-img':
            emptyItem = {
                type: 'note-img',
                isPinned: false,
                info: {
                    title: '',
                    url: '',
                },
                style: {
                    backgroundColor: '#ffffff'
                }
             }
            break
        case 'note-todos':
            emptyItem = {
                type: 'note-todo',
                isPinned: false,
                info: {
                    lable: '',
                    title: '',
                    todos:[
                        {txt:'' , doneAt: null}
                    ]
                },
                style: {
                    backgroundColor: '#ffffff'
                }
             }
            break
    }
    return emptyItem
}

function _setInfoType(type) {
    let emptyItem = {}
    switch (type) {
        case 'note-txt':
            emptyItem = { txt: '' }
            break
        case 'note-img':
            emptyItem = { url: '' }
            break
        case 'note-todos':
            emptyItem = { todos: [getNewTodo()] }
            break
    }
    return emptyItem
}

function getNewTodo() {
    return emptyTodo = { txt: '', done: null, id: utilService.makeId() }
}


function createEmptyNote(){
    return {
        type: '',
        isPinned: false,
        info: {},
        style: {
            backgroundColor: '#ffffff',
        }
    }
}


function createNote(value, type) { //use this one
    let notes = utilService.loadFromStorage(NOTES_KEY)
    const infoKey = _setInfoByType(type)

    let note = {
        id: utilService.makeId(),
        type: type,
        isPinned: false,
        info: {
            [infoKey]: value,
        },
        style: {
            backgroundColor: '#ffffff',
        }

    }
    if (type === 'note-todos') note.info.todos = []
    notes.unshift(note);
    utilService.saveToStorage(NOTES_KEY, notes)
    return note.id
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


function addTodo(value, noteId) {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].info.todos.unshift(_createTodo(value))
    utilService.saveToStorage(NOTES_KEY, notes)
    // return Promise.resolve()
}

function _createTodo(txt) {
    return {
        id: utilService.makeId(),
        txt,
        isDone: false,
    }
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

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _createDemoKeepNotes() {

    const notes = [
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: 'bobiandme',
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        }
    ]

    utilService.saveToStorage(NOTES_KEY, notes)

}

function _createNotes() {  //takes notes from sotrage. if there aren't any. create and add to sotrage.

    let notesDB = utilService.loadFromStorage(NOTES_KEY)
    if (!notesDB || !notesDB.length) {
        _createDemoKeepNotes()
        // _save(NOTES_KEY, notesDB)
        // return notesDB
    }

}
