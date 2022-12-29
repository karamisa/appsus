

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
    const staredClassName = email.isStared ? "fa-regular fa-star" :  "fa-solid fa-star starred"
    let isBold = email.isRead ? 'un-bold black' : ''
    let isReadMail = email.isRead ? '' : 'read'
    return (
        <li className={`flex align-center mail-preview ${isReadMail} `}>
            <div onClick={() => onHandleToggleIsStared()}>
                 <i className={staredClassName}></i>
            </div>
            <h3 className={`sender clean-space text-overflow ${isBold}`}>sender's name</h3>
            <section className="content flex">   
            <h3 className={`subject clean-space ${isBold}`}>{email.subject}</h3>
            <h3 className="body clean-space">
                {/* {body.length > 50 ? `${body.substring(0, 50)}...` : body} */}
                {email.body}
            </h3>
            </section>
            <h3 className="date clean-space">{email.sentAt}</h3>
            <div onClick={() => onHandleToggleIsRead()}>
                <i className={readClassName}> </i>
            </div>
            <div className="preview-btn" onClick={()=>onHandleRemove()}>
                <i className="fas fa-trash-alt"></i>
            </div>
        </li>
    )
}

//Sent the 