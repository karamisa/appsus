const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                {/* <Route path="/mail/details" element={<MailDetails/>} /> */}
                {/* <Route path="/mail/details/:emailId" element={<MailDetails/>} /> */}
                {/* <Route path="/mail/compose" element={<MailCompose/>} /> */}
                <Route path="/note" element={<NoteIndex />} />
                {/* <Route path="/note/details" element={<NoteDetails />} /> */}
                {/* <Route path="/note/details/:noteId" element={<NoteDetails />} /> */}
            </Routes>
        </section>
    </Router>
}
