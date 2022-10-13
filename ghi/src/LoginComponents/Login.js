import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTokenMutation } from '../store/accountsApi';
import ErrorNotification from '../ErrorNotification';
import BulmaInput from '../BulmaInput';


function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [createToken, result] = useCreateTokenMutation();
    
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target);
        createToken(new FormData(e.target));
    }

    if (result.isSuccess) {
        navigate("/budgets");
    } else if (result.isError) {
        setError(result.error);
    }


    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-one-third">
                    <ErrorNotification error={error} />
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <BulmaInput onChange={setEmail} value={email.email} required placeholder="Email" 
                            type="email" name="username" id="email" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <BulmaInput onChange={setPassword} value={password.password} 
                            required placeholder="Password" type="password" name="password" id="password" 
                            className="form-control"/>
                        </div>
                        <div className="field">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

  export default LogIn;