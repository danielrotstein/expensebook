import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTokenMutation } from '../store/accountsApi';
import ErrorNotification from '../ErrorNotification';
import BulmaInput from '../BulmaInput';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [createToken, result] = useCreateTokenMutation();
    
    async function handleSubmit(e) {
        e.preventDefault();
        createToken(new FormData(e.target));
    }

    if (result.isSuccess) {
        navigate("/budgets");
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('token', JSON.stringify(result.data.access_token));
        console.log("localStorage email: ", localStorage.getItem('email'));
        console.log("localStorage token: ", localStorage.getItem('token'));
        console.log("TOKEN: ", result.data.access_token);
        console.log("RESULT: ", result);
        
    } else if (result.isError) {
        setError(result.error);
    }

    return (
        <div className="container">
            <div className="auth-form-div">
            <ErrorNotification error={error} />
                <form onSubmit={(e) => handleSubmit(e)} className="auth-form">
                    <div className="auth-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#70c244" className="bi bi-box-arrow-in-right budget-form-icon" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                            <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                        <div className="auth-div mb-3">
                            <div className="auth-input">
                                <label htmlFor="email">Email</label>
                                <BulmaInput onChange={setEmail} value={email.email} 
                                required placeholder="Email" 
                                type="email" name="username" id="email" 
                                className="form-control input"/>
                            </div>
                            <br />
                            <div className="auth-input">
                                <label htmlFor="password">Password</label>
                                <BulmaInput onChange={setPassword} value={password.password} 
                                required placeholder="Password" 
                                type="password" name="password" id="password" 
                                className="form-control input"/>
                            </div>
                            <button className="btn btn-primary auth-button">Login</button>
                        </div>
                    </div> 
                </form>                  
            </div>
        </div>
    )
}

  export default Login;
