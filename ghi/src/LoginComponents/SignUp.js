import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateAccountsMutation } from '../store/accountsApi';
import { useCreateTokenMutation } from '../store/accountsApi';
import ErrorNotification from '../ErrorNotification';
import BulmaInput from '../BulmaInput';
import { NavLink } from 'react-router-dom';

function SignUpForm() {
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [createAccount, result] = useCreateAccountsMutation();
  
    async function handleSubmit(e) {
        e.preventDefault();
        createAccount({first_name, last_name, email, password});
    }

    if (result.isSuccess) {
        localStorage.setItem('email', JSON.stringify(email));
        navigate("/");
        window.location.reload();
    } else if (result.isError) {
        navigate("/");
        alert("User name has already been used. Please try again. ");
    }

    return (
        <div className="container">
            <div className="auth-form-div">
            <ErrorNotification error={error} />
                <form onSubmit={(e) => handleSubmit(e)} className="auth-form">
                    <div className="signup-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#70c244" className="bi bi-person-circle budget-form-icon" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        <br />
                        <div className="auth-div mb-3">
                            <div className="auth-input">
                                <label htmlFor="first_name">First Name</label>
                                <BulmaInput onChange={setFirstName} value={first_name} required placeholder="First Name" type="text" name="first_name" id="first_name" className="form-control input"/>
                            </div>
                            <br />
                            <div className="auth-input">
                                <label htmlFor="last_name">Last Name</label>
                                <BulmaInput onChange={setLastName} value={last_name} required placeholder="Last Name" type="text" name="last_name" id="last_name" className="form-control input"/>
                            </div>
                            <br />
                            <div className="auth-input">
                                <label htmlFor="email">Email</label>
                                <BulmaInput onChange={setEmail} value={email} required placeholder="Email"
                                type="email" name="email" id="email" className="form-control input"/>
                            </div>
                            <br />
                            <div className="auth-input">
                                <label htmlFor="password">Password</label>
                                <BulmaInput onChange={setPassword} value={password}
                                required placeholder="Password" type="password" name="password" id="password"
                                className="form-control input"/>
                                <p className="member">Already have an account? <NavLink to="/login">Login</NavLink></p>
                            </div>
                        </div>
                        <button className="btn btn-primary signup-button">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm;
