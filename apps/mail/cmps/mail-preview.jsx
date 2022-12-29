const { Link, Outlet } = ReactRouterDOM

export function MailPreview({ email, onToggleMailProp }) {
    const { subject, isRead, body, sentAt, isStared } = email;
    const previewClassName = isRead ? 'mail-preview read' : 'mail-preview unread';
    const staredClassName = isStared ? 'mail-preview stared' : 'mail-preview unstared'
    return (
        <div key = {email.id}>
            <div  className={staredClassName} onClick={() => { onToggleMailProp('isStared', !isStared, email.id) }}>
                {isStared && <i className="fa-solid fa-star"></i>}
                {!isStared && <i className="fa-regular fa-star"></i>}
            </div>
            <div className="subject">{subject}</div>
            <div className="body">
                {/* {body.length > 50 ? `${body.substring(0, 50)}...` : body} */}
                {body}
            </div>
            <div className="date">sentAt: {sentAt}</div>
            <div className="preview-btn" onClick={() => {onToggleMailProp('isRead', !isRead, email.id)}}>
                {isRead && <i className="fa-regular fa-envelope"></i>}
                {!isRead && <i className="fa-regular fa-envelope-open"></i>}
            </div>
            <div className="preview-btn">
                <i className="fas fa-trash-alt"></i>
            </div>
        </div>
    )
}