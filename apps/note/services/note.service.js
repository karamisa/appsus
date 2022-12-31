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
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getNewEmptyNote(type = 'note-txt', title = '', value = '') {
    let emptyItem = {}
    switch (type) {
        case 'note-txt':
            emptyItem = {
                id,
                type: 'note-txt',
                isPinned: false,
                info: {
                    title: title,
                    txt: value,
                },
                style: {
                    backgroundColor: 'blue'
                }
            }
            break
        case 'note-img':
            emptyItem = {
                id: '',
                type: 'note-img',
                isPinned: false,
                info: {
                    title: title,
                    url: value,
                },
                style: {
                    backgroundColor: '#fff'
                }
            }
            break
        case 'note-todos':
            emptyItem = {
                id: '',
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: title,
                    todos: [
                        { txt: value, doneAt: null }
                    ]
                },
                style: {
                    backgroundColor: '#fff'
                }
            }
            break
        case 'note-video':
            emptyItem = {
                id: '',
                type: 'note-video',
                isPinned: false,
                info: {
                    title: title,
                    url: 'https://www.youtube.com/embed/' + _getId(value),
                },
                style: {
                    backgroundColor: '#fff'
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
   const NOTES_JSON=[
        {
           "id":"n101",
           "type":"note-txt",
           "isPinned":false,
           "info":{
              "title":"NOTES!!!!",
              "txt":"I think that CSS may have finally clicked for me during sprint 3. I feel like I learned so much."
           },
           "style":{
              "backgroundColor":"#fff"
           }
        },
        {
           "id":"n104",
           "type":"note-todos",
           "isPinned":true,
           "info":{
              "title":"Get my stuff together",
              "todos":[
                 {
                    "txt":"Get my life together",
                    "doneAt":null
                 }
              ]
           },
           "style":{
              "backgroundColor":"#fff"
           }
        },
        {
           "id":"hjCNa",
           "type":"note-video",
           "isPinned":true,
           "info":{
              "title":"Coding Academy",
              "url":"https://www.youtube.com/embed/FWy_LbhHtug"
           },
           "style":{
              "backgroundColor":"#fff475"
           }
        },
        {
           "id":"YU1LS",
           "type":"note-img",
           "isPinned":false,
           "info":{
              "title":"JS Wallpaper!",
              "url":"https://www.computerhope.com/jargon/j/javascript.png"
           },
           "style":{
              "backgroundColor":"#1467ec"
           }
        },
        {
           "id":"o09Tl",
           "type":"note-todos",
           "isPinned":true,
           "info":{
              "title":"TODOs For Sprint 3",
              "todos":[
                 {
                    "txt":"Make App Skeleton",
                    "doneAt":1672514491352
                 },
                 {
                    "txt":"Make Mail Service",
                    "doneAt":1672514490748
                 },
                 {
                    "txt":"Make Mail Cmps",
                    "doneAt":1672514490170
                 },
                 {
                    "txt":"Design Mail CSS",
                    "doneAt":1672514489648
                 },
                 {
                    "txt":"Make Note Service",
                    "doneAt":1672514489167
                 },
                 {
                    "txt":"Develop Notes Cmps",
                    "doneAt":1672514488668
                 },
                 {
                    "txt":"Design Notes CSS",
                    "doneAt":1672514488118
                 },
                 {
                    "txt":"Fix Bugs",
                    "doneAt":null
                 }
              ]
           },
           "style":{
              "backgroundColor":"#e7e0e0"
           }
        },
        {
           "id":"ezefD",
           "type":"note-img",
           "isPinned":false,
           "info":{
              "title":"React",
              "url":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
           },
           "style":{
              "backgroundColor":"#fff"
           }
        },
        {
           "id":"dyZdA",
           "type":"note-img",
           "isPinned":true,
           "info":{
              "title":"",
              "url":"https://images7.memedroid.com/images/UPLOADED808/6368782c7bef3.jpeg"
           },
           "style":{
              "backgroundColor":"#ccff90"
           }
        },
        {
           "id":"igSGW",
           "type":"note-img",
           "isPinned":false,
           "info":{
              "title":"",
              "url":"apps/note/img/meme1.png"
           },
           "style":{
              "backgroundColor":"#fff"
           }
        },
        {
           "id":"YBYNY",
           "type":"note-video",
           "isPinned":false,
           "info":{
              "title":"LEARN CSS",
              "url":"https://www.youtube.com/embed/TUD1AWZVgQ8"
           },
           "style":{
              "backgroundColor":"#fbbc04"
           }
        },
        {
           "id":"6dlgJ",
           "type":"note-txt",
           "isPinned":false,
           "info":{
              "title":"My Bad Habits",
              "txt":"- Watching too much TV \n- Not cleaning my room\n- Forgetting to work-out\n- Spending an hour trying to figure out how to center a div"
           },
           "style":{
              "backgroundColor":"#1467ec"
           }
        },
        {
           "id":"DWiUE",
           "type":"note-todos",
           "isPinned":true,
           "info":{
              "title":"Learn How To Code",
              "todos":[
                 {
                    "txt":"Learn JavaScript Basics",
                    "doneAt":""
                 },
                 {
                    "txt":"Learn CSS basics",
                    "doneAt":""
                 },
                 {
                    "txt":" JS Array Methods",
                    "doneAt":""
                 },
                 {
                    "txt":"JS Matrices",
                    "doneAt":""
                 },
                 {
                    "txt":"Spring 1 - Minesweeper",
                    "doneAt":""
                 },
                 {
                    "txt":"JS Libraries",
                    "doneAt":""
                 },
                 {
                    "txt":"Sprint 2 - JS Canvas",
                    "doneAt":""
                 },
                 {
                    "txt":"JS Promises ",
                    "doneAt":""
                 },
                 {
                    "txt":"CRUDL",
                    "doneAt":""
                 },
                 {
                    "txt":"MVC",
                    "doneAt":""
                 },
                 {
                    "txt":"JS Frameworks",
                    "doneAt":""
                 },
                 {
                    "txt":"jQuery",
                    "doneAt":""
                 },
                 {
                    "txt":"React",
                    "doneAt":""
                 },
                 {
                    "txt":"Routing/URL Params",
                    "doneAt":null
                 }
              ]
           },
           "style":{
              "backgroundColor":"#eb7d7d"
           }
        }
     ]
     const notes =  JSON.parse(JSON.stringify(NOTES_JSON))
    
    utilService.saveToStorage(NOTES_KEY, notes)

}

function _getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null
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