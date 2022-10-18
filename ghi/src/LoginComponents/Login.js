// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTokenMutation } from '../store/accountsApi';
// import { useGetOneAccountQuery } from '../store/accountsApi';
import { useGetTokenQuery } from '../store/accountsApi';
import ErrorNotification from '../ErrorNotification';
import BulmaInput from '../BulmaInput';

import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom';


function Login() {
    // const navigate = useNavigate();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [createToken, result] = useCreateTokenMutation();
    // const [getToken, token_result] = useGetTokenQuery();

    // const {account_result} = useGetOneAccountQuery({});
    // console.log("createToken data: ", result.data);
    // console.log("getOneAccount data: ", account_result.data);
    console.log("email: ", email);
 
    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(e.target);
        createToken(new FormData(e.target));

        console.log("e.target: ", e.target);
        // save value in localStorage for later use
        localStorage.setItem('email', JSON.stringify(email));
        // localStorage.setItem('token', JSON.stringify(true));
        // token = localStorage.getItem('token');
        // console.log("localStorage email: ", localStorage.getItem('email'));
        // console.log("localStorage token: ", localStorage.getItem('token'));
    }

    // if (result.isSuccess) {
    //     navigate("/budgets");
    // } else if (result.isError) {
    //     setError(result.error);
    // }


    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-one-third">

                <div className="navbar-nav mr-auto">
                   </div>
                   {/* {localStorage.getItem('token') ? ( 
                     <div className="navbar-nav ml-auto">
                       <li className="nav-item">
                         <Link to={"/Logout"} className="nav-link">
                           {email}
                         </Link>
                       </li>
                         <Link to={"/expenses"} className="nav-link">                         
                          Expenses
                         </Link>
                       <li className="nav-item">
                         <a href="/Logout" className="nav-link">
                           LogOut
                         </a>
                       </li>
                     </div>
                   ) : (
                     <div className="navbar-nav ml-auto">
                       <li className="nav-item">
                         <Link to={"/Login"} className="nav-link">
                           Login
                         </Link>
                       </li>
          
                       <li className="nav-item">
                         <Link to={"/SignUp"} className="nav-link">
                           Sign Up
                         </Link>
                       </li> */}
                     
                    <ErrorNotification error={error} />
                    
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <BulmaInput onChange={setEmail} value={email.email} 
                            required placeholder="Email" 
                            type="email" name="username" id="email" 
                            className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <BulmaInput onChange={setPassword} value={password.password} 
                            required placeholder="Password" 
                            type="password" name="password" id="password" 
                            className="form-control"/>
                        </div>
                        <div className="field">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form> 
                    </div>                    
                   {/* )} */}
                </div>
            </div>
        // </div>

    )
}

  export default Login;