const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js";

export function MailDetails() {
    const [ email, setEmail ] = useState(null);
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

    if(!email) return <div>loading...</div>

    return (
        <div className="email-details">
            <div className="subject">Subject: {email.subject}</div>
            <div className="sender">From: {email.sender}</div>
            <div className="body">{email.body}</div>
            <button onClick={() => onRemoveEmail(email.id)}>Delete</button>
            <button onClick={() => onGoBack()}>Back to List</button>
        </div>
    )
}
