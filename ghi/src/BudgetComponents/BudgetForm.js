import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from '../ErrorNotification';
import { useCreateBudgetMutation } from '../store/budgetsApi';
import BulmaInput from '../BulmaInput';


function BudgetForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [budget, setBudget] = useState(0);
    const [home_country, setHomeCountry] = useState('');
    const [destination_country, setDestinationCountry] = useState('');
    const [account_id, setAccount] = useState(0);
    const [error, setError] = useState('');
    const [createBudget, result] = useCreateBudgetMutation();

    async function handleSubmit(e) {
        e.preventDefault();
        createBudget({title, start_date, end_date, budget, 
            home_country, destination_country, account_id,});
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
                            <label htmlFor="title">Title</label>
                            <BulmaInput onChange={setTitle} value={title.title} required placeholder="Title" type="text" name="title" id="title" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="startDate">Start Date</label>
                            <BulmaInput onChange={setStartDate} value={start_date.start_date} required placeholder="Start Date" type="date" name="startDate" id="startDate" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endDate">End Date</label>
                            <BulmaInput onChange={setEndDate} value={end_date.end_date} required placeholder="End Date" type="date" name="endDate" id="endDate" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="budget">Budget</label>
                            <BulmaInput onChange={setBudget} value={budget.budget} required placeholder="Budget" type="number" name="budget" id="budget" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="homeCountry">Home Country</label>
                            <BulmaInput onChange={setHomeCountry} value={home_country.home_country} required placeholder="Home Country" type="text" name="homeCountry" id="homeCountry" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="destinationCountry">Destination Country</label>
                            <BulmaInput onChange={setDestinationCountry} value={destination_country.destination_country} required placeholder="Destination Country" type="text" name="destinationCountry" id="destinationCountry" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="account_id">Account</label>
                            <BulmaInput onChange={setAccount} value={account_id.account_id} required placeholder="account_id" type="number" name="account_id" id="account_id" className="form-control"/>
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


export default BudgetForm;
