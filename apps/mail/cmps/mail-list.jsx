import { MailPreview } from '../cmps/mail-preview.jsx'

export function MailList({ emails }) {
    return (
        <div className="email-list">
            {emails.map(email => (
                <MailPreview key={email.id} email={email} />
            ))}
        </div>
    )
}

