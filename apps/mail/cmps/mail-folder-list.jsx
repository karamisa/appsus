const { NavLink } = ReactRouterDOM

export function MailFolderList({ onChangeFolder }) {
    return (
        <div className="mail-folder-list">
            <NavLink
                className="compose-btn"
                to="/mail/compose"
            >
                Compose
            </NavLink>
            <div
                className="folder-item inbox"
                onClick={() => onChangeFolder('inbox')}
            >

                <div className="folder-icon">
                    <i className="fas fa-inbox"></i>
                    Inbox
                </div>

            </div>
            <div
                className="folder-item sent"
                onClick={() => onChangeFolder('sent')}
            >
                <div className="folder-icon">
                    <i className="fas fa-envelope-open"></i>
                    Sent
                </div>
            </div>
            <div
                className="folder-item trash"
                onClick={() => onChangeFolder('trash')}
            >
                <div className="folder-icon">
                    <i className="fas fa-trash-alt"></i>
                    Trash
                </div>
            </div>
            <div
                className="folder-item drafts"
                onClick={() => onChangeFolder('draft')}
            >
                <div className="folder-icon">
                    <i className="fas fa-file"></i>
                    Drafts
                </div>
            </div>
        </div>
    );
}
