import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTokenMutation } from '../store/accountsApi';
import ErrorNotification from '../ErrorNotification';
import BulmaInput from '../BulmaInput';
// import { Link } from 'react-router-dom';


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
        console.log("localStorage token: ", localStorage.getItem('token'))
        console.log("TOKEN", result.data.access_token)
    } else if (result.isError) {
        setError(result.error);
    }

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-one-third">

                <div className="navbar-nav mr-auto">
                   </div>
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
                </div>
            </div>
    )
}

  export default Login;