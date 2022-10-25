import { Link, NavLink } from 'react-router-dom';
import { useGetTokenQuery, useLogOutMutation } from './store/accountsApi';
import { useEffect } from 'react';


function Logout() {
    const [logOut, { data }] = useLogOutMutation();


    useEffect(() => {
      if (data) {
        localStorage.clear();
      }
    }, [data]);


    return (
        <div className="buttons">
            <Link to={'/login'}><button onClick={logOut} className="btn btn-primary logout">
                Log Out
            </button></Link>
        </div>
    );
  }


function Nav() {
    const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
    return (
        <div className="custom-nav">
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">ExpenseBook</NavLink>
                    <div className="navbar-default">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          {tokenLoading
                            ? <></>
                            : token
                            ? <>
                                <NavLink className="nav-link" to="/budgets">Budgets</NavLink>
                                <NavLink className="nav-link" to="/$converter">Converter</NavLink>
                                <Logout className="nav-link" />
                            </>
                            :
                            <>
                                <NavLink className="nav-link" to="/$converter">Converter</NavLink>
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                                <NavLink className="nav-link" id="signup" to="/signup">Sign Up</NavLink>
                            </>
                          }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Nav;