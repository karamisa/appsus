const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { MailCompose } from "./apps/mail/views/mail-compose.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"


export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />}>
                    <Route path="/mail/compose" element={<MailCompose />} />
                </Route>
                <Route path="/mail/details" element={<MailDetails/>} />
                <Route path="/mail/details/:emailId" element={<MailDetails/>} />
          
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/:noteId" element={<NoteIndex />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
