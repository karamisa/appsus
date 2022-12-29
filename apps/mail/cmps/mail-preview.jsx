

export function MailPreview({ email, onToggleMailProp }) {

    function onHandleToggleIsRead(){
        onToggleMailProp('isRead', !email.isRead, email.id)
    }

    function onHandleToggleIsStared(){
        {onToggleMailProp('isStared', !email.isStared, email.id)}
    }

    function onHandleRemove() {
        {onToggleMailProp('removedAt', Date.now(), email.id)}
    }

    let readClassName = email.isRead ? "fa-regular fa-envelope-open" : "fa-regular fa-envelope"
    const staredClassName = email.isStared ? "fa-regular fa-star" :  "fa-solid fa-star"
    return (
        <div>
            <div onClick={() => onHandleToggleIsStared()}>
                 <i className={staredClassName}></i>

            </div>
            <div className="subject">{email.subject}</div>
            <div className="body">
                {/* {body.length > 50 ? `${body.substring(0, 50)}...` : body} */}
                {email.body}
            </div>
            <div className="date">sentAt: {email.sentAt}</div>
            <div onClick={() => onHandleToggleIsRead()}>
                <i className={readClassName}> </i>
            </div>
            <div className="preview-btn" onClick={()=>onHandleRemove()}>
                <i className="fas fa-trash-alt"></i>
            </div>
        </div>
    )
}

//Sent the 