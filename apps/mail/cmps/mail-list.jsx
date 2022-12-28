import { MailPreview } from '../cmps/mail-preview.jsx'

export function MailList({ emails }) {
    return (
        <div className="mail-list">
            {emails.map(email => (
                <MailPreview key={email.id} email={email} />
            ))}
        </div>
    )
}

