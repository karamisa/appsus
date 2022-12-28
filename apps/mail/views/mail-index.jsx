const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM

import { MailFilter } from '../cmps/mail-filter.jsx';
import { MailList } from '../cmps/mail-list.jsx';
import { MailFolderList } from '../cmps/mail-folder-list.jsx'

import { mailService } from './../services/mail.service.js';

export function MailIndex() {
    const [criteria, setCriteria] = useState({})
    const [emails, setEmails] = useState([])

    useEffect(() => {
        console.log(criteria)
        loadEmails()
    }, [criteria])


    function loadEmails() {
        mailService.query(criteria).then(emailsToUpdate => {
            setEmails(emailsToUpdate)
        })
    }

    function onChangeFolder(folder) {
        setCriteria((prevCriteria) => ({ ...prevCriteria, status: folder }))
    }


    function onChangeFilter({ isRead, searchTerm: txt }) {
        setCriteria((prevCriteria) => ({ ...prevCriteria, txt, isRead }))
    }

    return (
        <section className="mail-index full main-layout">
            <div className="mail-toolbar-container">
                <MailFilter onChangeFilter={onChangeFilter} />
            </div>
            <div className='mail-folder-list-container'>
                <MailFolderList onChangeFolder={onChangeFolder} />
            </div>
            <div className="mail-body-container">
                <MailList emails={emails} />
                <div className="mail-compose-container">
                    <Outlet />
                </div>
            </div>


        </section>
    )
}