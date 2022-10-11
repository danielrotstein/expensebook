import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-black'>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">ExpenseBook</NavLink>
                    <NavLink className="navbar-brand" to="/budgets">Budgets</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Nav;
