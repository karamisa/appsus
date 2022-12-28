

export function NotePreview({note}){


function getClassName(){

return "note-review"
}



return <article className="note-preview">
    <div>
        <DynamicCmp type={note.type} note={note}/>
    </div>
    </article>

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


function TextNote({note}){

    return <div>
        <p>{note.id}</p>
        <p>{note.type}</p>
        <p>{note.info.txt}</p>
    </div>

}

function ImgNote({note}){
    return <div>
        <p>{note.id}</p>
        <p>{note.type}</p>
        <p>{note.info.title}</p>
        <img src={note.url} alt={note.info.title} />
    </div>


}
function TodoNote({note}){
    return <div>
        <p>{note.id}</p>
        <p>{note.type}</p>
        <p>{note.lable}</p>
        <ul className="todo-list">
        <li>get li map here</li>
        </ul>
        
    </div>


}