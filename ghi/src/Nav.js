import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-black'>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">ExpenseBook</NavLink>
            </div>
        </nav>

    )
}

export default Nav;
