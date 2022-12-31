import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const EMAIL_KEY = 'emailDB'

let gLoggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createEmails()



export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmailToSend,
    getLoggedinUser,
    getNextEmailId,
    getPrevEmailId
}


function query(criteria = { status: 'inbox' }) {
    return storageService.query(EMAIL_KEY)

        .then(emails => {
            if (criteria.status) {
                if (criteria.status === 'inbox') emails = emails.filter(email => email.to === gLoggedinUser.email && email.removedAt === null)
                if (criteria.status === 'sent') emails = emails.filter(email => email.from === gLoggedinUser.email && email.removedAt === null)
                if (criteria.status === 'trash') emails = emails.filter(email => email.removedAt !== null)
                if (criteria.status === 'draft') emails = emails.filter(email => email.sentAt === null && email.removedAt === null)
            }

            if (criteria.txt) {
                const regex = new RegExp(criteria.txt, 'i')
                emails = emails.filter(email => regex.test(email.body))
            }
            if (criteria.isRead) {
                emails = emails.filter(email => email.isRead == JSON.parse(criteria.isRead))
            }
            if (criteria.isStared) {
                emails = emails.filter(email => email.isStared === JSON.parse(criteria.isStared))
            }
            if (criteria.lables) {
                console.log('here')
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

function getNextEmailId(emailId) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            var idx = emails.findIndex(email => email.id === emailId)
            if (idx === emails.length - 1) idx = -1
            return emails[idx + 1].id
        })
}

function getPrevEmailId(emailId) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            var idx = emails.findIndex(email => email.id === emailId)
            if (idx === 0) idx = emails.length
            return emails[idx - 1].id
        })
}

function getEmptyEmailToSend(subject = '', body = '', to = '', sentAt = null) {
    return {
        id: '',
        subject,
        body,
        isRead: true,
        isStared: false,
        sentAt,
        removedAt: null,
        from: gLoggedinUser.email,
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
    var DEMO_EMAILS = [];
    var length = 40;

    for (var i = 0; i < length; i++) {
        DEMO_EMAILS.push(_generateEmailData());
    }

    utilService.saveToStorage(EMAIL_KEY, DEMO_EMAILS)
}



function _generateEmailData() {
    const id = 'e' + Math.floor(Math.random() * 10000000)
    const subjects = ['Miss you!', 'Important update', 'New project proposal', 'Quick question', 'Looking for feedback']
    const subject = subjects[Math.floor(Math.random() * subjects.length)]
    const bodies = ['Would love to catch up sometimes',
        'Hello, how are you doing? I hope this email finds you well. I just wanted to reach out and see if you might be available to catch up sometime. I miss seeing you and would love to hear how you have been doing lately. Let me know if you have some free time and we can set something up. Take care!',
        'Hi there, I just wanted to let you know about an important update that has come up. Please see the attached file for all the details. If you have any questions or concerns, feel free to let me know. Thanks!',
        'Hello! I am writing to you today with a new project proposal that I think could be really exciting for both of us. I have included all the details in the attached file, and I would love to discuss it further with you at your earliest convenience. What do you think?',
        'Hey, I hope you are doing well. I just had a quick question that I was hoping you might be able to help with. If you have a minute, I would really appreciate it if we could discuss this briefly. Let me know if you are available. Thanks!',
        'Hello, I hope this email finds you well. I am writing to ask for your feedback on something that I have been working on. I value your opinion and would love to hear your thoughts on this. If you have some time, I would really appreciate it if you could take a look at the attached file and let me know what you think. Thanks in advance for your help!',
        'Please see the attached update', 'I have a new project proposal for you', 'Can we discuss this briefly?', 'I would appreciate your thoughts on this'];
    const bodiesWithLongerSubjects = ['Hello, I hope this email finds you well. I just wanted to reach out and see if you might be available to catch up sometime. I miss seeing you and would love to hear how you have been doing lately. Let me know if you have some free time and we can set something up. Take care!', 'Hi there, I just wanted to let you know about an important update that has come up. Please see the attached file for all the details. If you have any questions or concerns, feel free to let me know. Thanks!', 'Hello! I am writing to you today with a new project proposal that I think could be really exciting for both of us. I have included all the details in the attached file, and I would love to discuss it further with you at your earliest convenience. What do you think?', 'Hey, I hope you are doing well. I just had a quick question that I was hoping you might be able to help with. If you have a minute, I would really appreciate it if we could discuss this briefly. Let me know if you are available. Thanks!', 'Hello, I hope this email finds you well. I am writing to ask for your feedback on something that I have been working on. I value your opinion and would love to hear your thoughts on this. If you have some time, I would really appreciate it if you could take a look at the attached file and let me know what you think. Thanks in advance for your help!',];
    const body = Math.random() > 0.5 ? bodies[Math.floor(Math.random() * bodies.length)] : bodiesWithLongerSubjects[Math.floor(Math.random() * bodiesWithLongerSubjects.length)];
    const isRead = Math.random() > 0.5;
    const isStared = Math.random() > 0.5
    const sentAt = Math.random() > 0.5 ? Date.now() : null
    const removedAt = Math.random() > 0.5 ? null : Date.now();
    const from = Math.random() > 0.5 ? 'user' + Math.floor(Math.random() * 10000) + '@example.com' : 'user@appsus.com'
    const to = Math.random() > 0.5 ? 'user' + Math.floor(Math.random() * 10000) + '@example.com' : 'user@appsus.com'

    return {
        id,
        subject,
        body,
        isRead,
        isStared,
        sentAt,
        removedAt,
        from,
        to
    }
}


