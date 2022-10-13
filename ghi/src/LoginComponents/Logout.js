import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '../store/accountsApi';
import ErrorNotification from '../ErrorNotification';

function LogoutButton() {
    const navigate = useNavigate();
    const [logOut, { data }] = useLogOutMutation;

    useEffect(() => {
        if(data) {
            navigate('/');
        }
    }, [data, navigate]);

    return (
        <div className='buttons'>
            <button onClick={logOut} className="button">
                Log out
            </button>
        </div>
    );
}