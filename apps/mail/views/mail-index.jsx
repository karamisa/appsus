const { useState, useEffect } = React

import { MailFilter } from '../cmps/mail-filter.jsx';
import { MailList } from '../cmps/mail-list.jsx';
import { MailFolderList } from '../cmps/mail-filter.jsx'

import { mailService } from './../services/mail.service.js';

export function MailIndex() {
    // const [criteria, setCriteria] = useState({})
    const [emails, setEmails] = useState([])

    useEffect(()=>{
        loadEmails()
    },[])

    function loadEmails(){
        mailService.query().then(emailsToUpdate => {
            setEmails(emailsToUpdate)
        })
    }
    return <section className="mail-index full main-layout">
        {/* <MailFolderList /> */}
        {/* <MailFilter /> */}
        <div>
        <MailList emails={emails} />
        </div>
    </section>
}

