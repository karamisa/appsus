import { MailPreview } from '../cmps/mail-preview.jsx'

export function MailList({ emails , onToggleMailProp }) {
    return (
        <div className="mail-list">
            {emails.map(email => (
                <MailPreview key={email.id} email={email} onToggleMailProp={onToggleMailProp} />
            ))}
        </div>
    )
}

