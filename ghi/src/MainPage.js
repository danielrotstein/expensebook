import { Link, NavLink } from 'react-router-dom';

function MainPage() {
    return (
        <div className="container-fluid">
            <NavLink className="nav-link" to="/$converter">Currency Converter</NavLink>
            <h1>Main Page Content</h1>
        </div>
    )
}

export default MainPage;
