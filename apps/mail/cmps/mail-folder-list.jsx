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
                    </div>
                    Inbox
                </div>
                <div
                    className="folder-item sent"
                    onClick={() => onChangeFolder('sent')}
                >
                    <div className="folder-icon">
                        <i className="fas fa-envelope-open"></i>
                    </div>
                    Sent
                </div>
                <div
                    className="folder-item trash"
                    onClick={() => onChangeFolder('trash')}
                >
                    <div className="folder-icon">
                        <i className="fas fa-trash-alt"></i>
                    </div>
                    Trash
                </div>
                <div
                    className="folder-item drafts"
                    onClick={() => onChangeFolder('draft')}
                >
                    <div className="folder-icon">
                        <i className="fas fa-file"></i>
                    </div>
Drafts
                </div>
            </div>
    );
}
