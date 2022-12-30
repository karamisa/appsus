const { NavLink } = ReactRouterDOM
const { useState } = React

export function MailFolderList({ onChangeFolder }) {
    const [folder, setFolder] = useState('inbox')



function onChangeFolder(folder){
    setFolder((prevStat) => (prevStat, folder))
    
    console.log('folder', folder)
}


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
                className={`folder-item ${folder=== 'inbox' ? 'active-folder' : ''} inbox`}
                onClick={() => onChangeFolder('inbox')}
                >

                <div className="folder-icon flex" label="Inbox">
                    <i className="fas fa-inbox"></i>
                    <span className="folder-name">Inbox</span>
                </div> 
            </div>
            <div
                className={`folder-item ${folder=== 'sent' ? 'active-folder' : ''} sent`}
                onClick={() => onChangeFolder('sent')}
                >
                <div className="folder-icon flex">
                    <i className="fas fa-envelope-open"></i>
                    <span className="folder-name">Sent</span>
                </div>
            </div>
            <div
                className={`folder-item ${folder=== 'trash' ? 'active-folder' : ''} trash`}
                onClick={() => onChangeFolder('trash')}
                >
                <div className="folder-icon flex">
                    <i className="fas fa-trash-alt"></i>
                    <span className="folder-name">Trash</span>
                </div>
            </div>
            <div
                className={`folder-item ${folder=== 'draft' ? 'active-folder' : ''} draft`}
                onClick={() => onChangeFolder('draft')}
                >
                <div className="folder-icon flex">
                    <i className="fas fa-file"></i>
                    <span className="folder-name">Drafts</span>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}
