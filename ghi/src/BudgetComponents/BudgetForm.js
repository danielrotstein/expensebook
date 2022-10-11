import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from '../ErrorNotification';
import { useCreateBudgetMutation } from '../store/budgetsApi';
import BulmaInput from '../BulmaInput';


function BudgetForm() {
    const navigate = useNavigate();
    // const [budget, setBudget] = useState({
    //     title: "",
    //     startDate: "",
    //     endDate: "",
    //     budget: "",
    //     homeCountry: "",
    //     destinationCountry: "",
    // });
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [homeCountry, setHomeCountry] = useState('');
    const [destinationCountry, setDestinationCountry] = useState('');
    const [error, setError] = useState('');
    const [createBudget, result] = useCreateBudgetMutation();

    async function handleSubmit(e) {
        e.preventDefault();
        createBudget({title, startDate, endDate, budget, homeCountry, destinationCountry});
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
                    <form onSubmit={() => handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title">Title</label>
                            <BulmaInput onChange={setTitle} value={title.title} required placeholder="Title" type="text" name="title" id="title" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="startDate">Start Date</label>
                            <BulmaInput onChange={setStartDate} value={startDate.start_date} required placeholder="Start Date" type="date" name="startDate" id="startDate" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endDate">End Date</label>
                            <BulmaInput onChange={setEndDate} value={endDate.end_date} required placeholder="End Date" type="date" name="endDate" id="endDate" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="budget">Budget</label>
                            <BulmaInput onChange={setBudget} value={budget.budget} required placeholder="Budget" type="number" name="budget" id="budget" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="homeCountry">Home Country</label>
                            <BulmaInput onChange={setHomeCountry} value={homeCountry.home_country} required placeholder="Home Country" type="text" name="homeCountry" id="homeCountry" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="destinationCountry">Destination Country</label>
                            <BulmaInput onChange={setDestinationCountry} value={destinationCountry.destination_country} required placeholder="Destination Country" type="text" name="destinationCountry" id="destinationCountry" className="form-control"/>
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
