const { Link, Outlet } = ReactRouterDOM

export function MailPreview({ email, onClick}) {
    const { subject, isRead, body, sentAt, isStared } = email;
    const previewClassName = isRead ? 'mail-preview read' : 'mail-preview unread';
    const staredClassName = isStared ? 'mail-preview stared' : 'mail-preview unstared'
    return (
        <div className={previewClassName}>
            <div className={staredClassName}>
                <i class="fa-solid fa-star"></i>
            </div>
            <div className="subject">{subject}</div>
            <div className="body">{body.length > 50 ? `${body.substring(0, 50)}...` : body}</div>
            <div className="date">{sentAt}</div>
        </div>
    )
}
