import { MailPreview } from '../cmps/mail-preview.jsx'

export function MailList({ emails , onToggleMailProp }) {
    return (
        <div className="mail-list">
            <ul className="flex flex-column clean-list mail-space">
            {emails.map(email => (
                <MailPreview key={email.id} email={email} onToggleMailProp={onToggleMailProp} />
            ))}
            </ul>
        </div>
    )
}

