import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from '../ErrorNotification';
import { useCreateBudgetMutation } from '../store/budgetsApi';
import BulmaInput from '../BulmaInput';


function BudgetForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [budget, setBudget] = useState(0);
    const [home_country, setHomeCountry] = useState('');
    const [destination_country, setDestinationCountry] = useState('');
    const [account_id, setAccount] = useState(0);
    const [error, setError] = useState('');
    const [createBudget, result] = useCreateBudgetMutation();

    const handleNextClick = () => {
        setStep(step + 1);
    };

    const handleResetClick = () => {
        setStep(1);
    };

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
            <div className="budget-form-div">
                <ErrorNotification error={error} />
                <form onSubmit={(e) => handleSubmit(e)} className="create-budget-form">
                    {step == 1 
                        ? <div className="create-budget mb-3">
                            <div className="input-div">
                                <label htmlFor="title">Let's add a title to your budget</label>
                                <BulmaInput onChange={setTitle} value={title.title} required type="text" name="title" id="title" className="form-control input"/>
                                <div className="form-buttons-div d-flex">
                                    {!(title.length) 
                                        ? <button className="btn btn-primary form-button" id="first-button">Next</button>
                                        : <button onClick={handleNextClick} className="btn btn-primary form-button" id="first-button">Next</button>
                                    }
                                </div>
                            </div>
                        </div> : null
                    }
                    {step == 2
                        ? <div className="create-budget mb-3">
                            <div className="input-div">
                                <label htmlFor="startDate">When are you departing?</label>
                                <BulmaInput onChange={setStartDate} value={start_date.start_date} required type="date" name="startDate" id="startDate" className="form-control input"/>
                                <br />
                                <label htmlFor="endDate">And when are you returning?</label>
                                <BulmaInput onChange={setEndDate} value={end_date.end_date} required type="date" name="endDate" id="endDate" className="form-control input"/>
                                <div className="form-buttons-div d-flex">
                                    <p className="reset-button" onClick={handleResetClick}>Reset</p>
                                    {!(start_date) || !(end_date) 
                                        ? <button className="btn btn-primary form-button">Next</button>
                                        : <button onClick={handleNextClick} className="btn btn-primary form-button">Next</button>
                                    }
                                </div>
                            </div>
                        </div> : null
                    }
                    {step == 3
                        ? <div className="create-budget mb-3">
                            <div className="input-div">
                                <label htmlFor="budget">What's your target budget?</label>
                                <BulmaInput onChange={setBudget} value={budget.budget} required type="number" name="budget" id="budget" className="form-control input"/>
                                <div className="form-buttons-div d-flex">
                                    <p className="reset-button" onClick={handleResetClick}>Reset</p>
                                    {!(budget) 
                                    ? <button className="btn btn-primary next-button">Next</button>
                                    : <button onClick={handleNextClick} className="btn btn-primary next-button">Next</button>
                                }
                                </div>
                            </div>
                        </div> : null
                    }
                    {step == 4
                        ? <div className="create-budget mb-3">
                            <div className="input-div">
                                <label htmlFor="homeCountry">Where are you based?</label>
                                <BulmaInput onChange={setHomeCountry} value={home_country.home_country} required type="text" name="homeCountry" id="homeCountry" className="form-control input"/>
                                <br />
                                <label htmlFor="destinationCountry">And where are you traveling to?</label>
                                <BulmaInput onChange={setDestinationCountry} value={destination_country.destination_country} required type="text" name="destinationCountry" id="destinationCountry" className="form-control input"/>
                                <div className="form-buttons-div d-flex">
                                    <p className="reset-button" onClick={handleResetClick}>Reset</p>
                                    {!(home_country) || !(destination_country)
                                        ? <button className="btn btn-primary form-button">Next</button>
                                        : <button onClick={handleNextClick} className="btn btn-primary form-button">Next</button>
                                    }
                                </div>
                            </div>
                        </div> : null
                    }
                    {step == 5
                        ? <div className="create-budget mb-3">
                            <div className="input-div">
                                <label htmlFor="account_id">Account ID</label>
                                <BulmaInput onChange={setAccount} value={account_id.account_id} required type="number" name="account_id" id="account_id" className="form-control input"/>
                                <div className="form-buttons-div d-flex">
                                    <p className="reset-button" onClick={handleResetClick}>Reset</p>
                                    <button className="btn btn-primary form-button">Save</button>
                                </div>
                            </div>
                        </div> : null
                    }
                </form>
            </div>
        </div>
    )
}


export default BudgetForm;
