import { Link, NavLink } from 'react-router-dom';
import { useGetTokenQuery, useLogOutMutation } from './store/accountsApi';
import { useEffect } from 'react';

function Logout() {
    const [logOut, { data }] = useLogOutMutation();
  

    useEffect(() => {
      if (data) {
        localStorage.clear();
        console.log("email before clear local storage: ", localStorage.getItem('email'));
        console.log("token before clear local storage: ", localStorage.getItem('token'));
      }
    }, [data]);
  

    return (
        <div className="buttons">
            <Link to={'/login'}><button onClick={logOut} className="button is-light">
                Log out
            </button></Link>
        </div>
    );
  }
  

function Nav() {
    const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">ExpenseBook</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          {tokenLoading
                            ? <></>
                            : token
                              ? <>                            
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/budgets">Budgets</NavLink>
                                </li>
                                <li className="nav-item">
                                    <Logout className="nav-link" />
                                </li>
                              </>
                              : 
                              <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                                </li>                              
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
