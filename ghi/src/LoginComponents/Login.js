import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTokenMutation } from '../store/accountsApi';
import ErrorNotification from '../ErrorNotification';
import BulmaInput from '../BulmaInput';


function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [first_name, setFirstName] = useState('');
    // const [last_name, setLastName] = useState('');
    const [error, setError] = useState('');
    const [createToken, result] = useCreateTokenMutation();
    
    async function handleSubmit(e) {
        e.preventDefault();
        createToken({username: email, password});
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
                            <BulmaInput onChange={setEmail} value={email.email} required placeholder="Email" type="email" name="email" id="email" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <BulmaInput onChange={setPassword} value={password.password} required placeholder="Password" type="password" name="password" id="password" className="form-control"/>
                        </div>

                        {/* <div className="mb-3">
                            <label htmlFor="first_name">First Name</label>
                            <BulmaInput onChange={setFirstName} value={first_name.first_name} required placeholder="first_name" type="text" name="first_name" id="first_name" className="form-control"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="last_name">Last Name</label>
                            <BulmaInput onChange={setLastName} value={last_name.last_name} required placeholder="last_name" type="text" name="last_name" id="last_name" className="form-control"/>
                        </div> */}



                        
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