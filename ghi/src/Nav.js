import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">ExpenseBook</NavLink>
                    <NavLink className="navbar-brand" to="/budgets">Budgets</NavLink>
                    <NavLink className="navbar-brand" to="/login">Login</NavLink>
                    <NavLink className="navbar-brand" to="/login">Logout</NavLink>
                    {/* <NavLink className="navbar-brand" to="/CurrencyConverter">CurrencyConverter</NavLink> */}
                </div>
            </nav>
        </div>
    )
}

export default Nav;
