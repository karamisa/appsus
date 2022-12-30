const { NavLink } = ReactRouterDOM

export function MailFolderList({ onChangeFolder }) {
    return (
        <section className="mail-folder-list">
            <div className="side-folder">   
            <div className="compose-container" onClick={() => (true)}>
            <NavLink
                className="compose-btn flex space-between"
                to="/mail/compose"
                >
               <i className="fa-solid fa-pencil"></i>
               <span>Compose</span>
            </NavLink>
            </div>
            <div className="folders-container">
            <div
                className="folder-item inbox"
                onClick={() => onChangeFolder('inbox')}
                >

                <div className="folder-icon" label="Inbox">
                    <i className="fas fa-inbox"></i>
                    <span>Inbox</span>
                </div>

            </div>
            <div
                className="folder-item sent"
                onClick={() => onChangeFolder('sent')}
                >
                <div className="folder-icon">
                    <i className="fas fa-envelope-open"></i>
                    <span>Sent</span>
                </div>
            </div>
            <div
                className="folder-item trash"
                onClick={() => onChangeFolder('trash')}
                >
                <div className="folder-icon">
                    <i className="fas fa-trash-alt"></i>
                    <span>Trash</span>
                </div>
            </div>
            <div
                className="folder-item drafts"
                onClick={() => onChangeFolder('draft')}
                >
                <div className="folder-icon">
                    <i className="fas fa-file"></i>
                    <span>Drafts</span>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}
