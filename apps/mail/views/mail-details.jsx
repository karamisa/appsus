const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { utilService } from '../../../services/util.service.js'

export function MailDetails() {
    const [email, setEmail] = useState(null);
    const [nextEmailId, setNextEmailId] = useState(null)
    const { emailId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadEmail()
    }, [emailId])

    function loadEmail() {
        mailService.get(emailId)
            .then((email) => {
                console.log(email)
                setEmail(email)
            })
            .catch((err) => {
                console.log('Had issues in email details', err)
                navigate('/mail')
            })


        mailService.getNextEmailId(emailId)
            .then(setNextEmailId)
    }

    function onGoBack() {
        navigate('/mail')
    }

    function onRemoveEmail(emailId) {
        mailService.remove(emailId).then(() => {
            navigate(`/mail/details/${nextEmailId}`)
        })
    }

    if (!email) return <div>loading...</div>

    return (
        <section className="email-details-container">
            <div className="email-details">
                <div className="email-details-header">
                    <button className="details-back" onClick={() => onGoBack()}>Back to List</button>
                    <button className="details-remove" onClick={() => onRemoveEmail(email.id)}>Delete</button>
                </div>
                <div className="details-subject">{email.subject}</div>
                <div className="email-description">
                    <div className="details-sender"><span className="bold black">From: </span>{email.from}</div>
                    <div className="details-date">{ utilService.getFullDate(email.sentAt)}</div>
                </div>
                <div className="details-body">{email.body}</div>
            </div>
        </section>
    )
}
