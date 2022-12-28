import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const EMAIL_KEY = 'emailDB'

let gLoggedinUser = { 
    email: 'user@appsus.com',  
    fullname: 'Mahatma Appsus' 
}

let gFilterby
_createEmails()



export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    getLoggedinUser,
    setFilterBy,
    getFilterBy
}


function query(criteria = {}) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {    
            if (criteria.txt) {
                const regex = new RegExp(criteria.txt, 'i')
                emails = emails.filter(email => regex.test(email.body))
            }
            if (criteria.isRead) {
                emails = emails.filter(email => email.isRead === criteria.isRead)
            }
            if (criteria.isStared) {
                emails = emails.filter(email=> email.isStared === criteria.isStared)
            }
            if (criteria.lables) {
                // check for lables
            }
            return emails
        })
}



function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function setFilterBy(type){
    
}

function getEmptyEmail(subject = '', body = ''.isRead = '', sentAt = '', to = '') {
    return {
        id: '',
        subject,
        body,
        isRead,
        sentAt,
        to
    }
}

function getLoggedinUser() {
    return gLoggedinUser
}




//Private
function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        _createDemoEmails()
    }
}


function _createDemoEmails() {
    const DEMO_EMAILS = [
        {
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStared: false,
            sentAt: 1551133930594,
            to: 'user@appsus.com'
        },
        {
            id: 'e102',
            subject: 'Hello from Paris!',
            body: 'I hope you\'re doing well. I\'m having a great time here in Paris. How about you?',
            isRead: false,
            isStared: false,
            sentAt: 1551144930000,
            to: 'momo@momo.com'
        },
        {
            id: 'e103',
            subject: 'Important update',
            body: 'We have made some changes to our project plan. Please see the attached document for details.',
            isRead: false,
            isStared: false,
            sentAt: 1551154930294,
            to: 'momo@momo.com'
        },
        {
            id: 'e104',
            subject: 'Invitation to our wedding',
            body: 'We are thrilled to invite you to our wedding on June 21st. We hope you can join us for this special occasion.',
            isRead: false,
            isStared: true,
            sentAt: 1551165931594,
            to: 'user@appsus.com'
        },
        {
            id: 'e105',
            subject: 'Thank you for your help',
            body: 'I really appreciate your help on the project. We wouldn\'t have been able to finish it on time without your support.',
            isRead: false,
            isStared: true,
            sentAt: 1551175430594,
            to: 'user@appsus.com'
        }]

    utilService.saveToStorage(EMAIL_KEY, DEMO_EMAILS)
}



