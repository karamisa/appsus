const { Link, Outlet } = ReactRouterDOM

export function MailPreview({ email }) {
    const { subject, isRead } = email;
    const subjectClassName = isRead ? 'subject subject-read' : 'subject subject-unread';
    return (
        <div className="email-preview">
            <div className={subjectClassName}>
                {subject.length > 50 ? `${subject.substring(0, 50)}...` : subject}
                <Link to={`/mail/details/${email.id}`}>Details</Link>
            </div>
        </div>
    );
};
