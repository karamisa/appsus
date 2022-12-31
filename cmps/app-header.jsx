const { Link, NavLink } = ReactRouterDOM

const { useState } = React


export function AppHeader() {
    const [isShown, setShown] = useState(false)

    function onToggleMenu() {
        setShown((prevStat) => (prevStat, !isShown ))
    }

    function onCloseMenu(){
        setShown((prevStat) => (prevStat, false ))
    }


    return <header className="app-header">
        <Link to="/" className="app-header-logo">
            <img src="assets/img/horse.png" className="img-logo" />
            <h3>Appsus</h3>
        </Link>
        <nav className={`main-nav ${isShown ? 'show-bar' : ''}`}>
            <ul className="flex clean-list nav-list">
                <li><NavLink to="/" onClick={() => onCloseMenu()}>Home</NavLink></li>
                <li><NavLink to="/about" onClick={() => onCloseMenu()}>About</NavLink></li>
                <li><NavLink to="/mail" onClick={() => onCloseMenu()}>Mail</NavLink></li>
                <li><NavLink to="/note" onClick={() => onCloseMenu()}>Note</NavLink></li>
            </ul>
        </nav>
        <button className="menu-toggle-btn" onClick={() => onToggleMenu()}>☰</button>
        <div className={`nav-bar-screen ${isShown ? 'show-screen' : ''}`} onClick={() => onCloseMenu()}></div>
    </header>
}
