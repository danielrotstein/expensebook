import { NavLink } from 'react-router-dom';
import { useLogOutMutation } from './store/accountsApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Logout() {
    const navigate = useNavigate();
    const [logOut, { data }] = useLogOutMutation();
  
    useEffect(() => {
      if (data) {
        navigate('/');
        localStorage.clear();
        console.log("email before clear local storage: ", localStorage.getItem('email'));
        console.log("token before clear local storage: ", localStorage.getItem('token'));
      }
    }, [data, navigate]);
  
    return (
      <div className="buttons">
        <button onClick={logOut} className="button is-light">
          Log out
        </button>
      </div>
    );
  }
  

function Nav() {
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-black'>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">ExpenseBook</NavLink>
                    <NavLink className="navbar-brand" to="/budgets">Budgets</NavLink>
                    <NavLink className="navbar-brand" to="/login">Login</NavLink>
                    <NavLink className="navbar-brand" to="/signup">Signup</NavLink>
                    <Logout />
                    {/* <NavLink className="navbar-brand" to="/CurrencyConverter">CurrencyConverter</NavLink> */}
                </div>
            </nav>
        </div>
    )
}

export default Nav;
