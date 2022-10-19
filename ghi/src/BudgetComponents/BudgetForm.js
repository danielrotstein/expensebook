import { useState } from 'react';
import ErrorNotification from '../ErrorNotification';
import { useCreateBudgetMutation } from '../store/budgetsApi';
import { useGetBudgetsByOneUserQuery } from '../store/budgetsApi';
import BulmaInput from '../BulmaInput';
import countries from '../CountryList';
import { useNavigate } from "react-router-dom";


function BudgetForm(props) {
    const email = JSON.parse(localStorage.getItem('email'));
    const { data, error, isLoading } = useGetBudgetsByOneUserQuery(email);

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [budget, setBudget] = useState(0);
    const [home_country, setHomeCountry] = useState('');
    const [destination_country, setDestinationCountry] = useState('');
    const [account_id, setAccountID] = useState(data[0].account_id)
    const [createBudget, result] = useCreateBudgetMutation();


    const handleNextClick = () => {
        setStep(step + 1);
    };


    const handleResetClick = () => {
        setStep(1);
    };


    const handleHomeCountryInputChange = (e) => {
        const value = e.target.value;
        setHomeCountry(value);
    };


    const handleDestinationCountryInputChange = (e) => {
        const value = e.target.value;
        setDestinationCountry(value);
    };


    const handleConfirmClick = (data) => {
        const value = data[0].account_id
        setAccountID(value)
    }


    async function handleSubmit(e) {
        e.preventDefault();
        createBudget({title, start_date, end_date, budget,
            home_country, destination_country, account_id});
    }


    if (result.isSuccess) {
        navigate("/budgets");
    } else if (result.isError) {
        // setError(result.error);
        console.log("ERROR")
    }

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    } else {
        return (
            <div className="container">
                <div className="budget-form-div">
                    <ErrorNotification error={error} />
                    <form onSubmit={(e) => handleSubmit(e)} className="create-budget-form">
                        {step == 1
                            ? <div className="create-budget-card">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#70c244" className="bi bi-currency-exchange budget-form-icon" viewBox="0 0 16 16">
                                    <path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/>
                                </svg>
                                <div className="create-budget mb-3" id="less-margin-top">
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
                                </div>
                            </div> : null
                        }
                        {step == 2
                            ? <div className="create-budget-card">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#70c244" className="bi bi-calendar-day budget-form-icon" viewBox="0 0 16 16">
                                    <path d="M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332h.684zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a1.806 1.806 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98v4.105zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43zm.094 5.093h.672V7.418h-.672v4.105z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <div className="create-budget mb-3">
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
                                </div>
                            </div> : null
                        }
                        {step == 3
                            ? <div className="create-budget-card">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#70c244" className="bi bi-piggy-bank budget-form-icon" viewBox="0 0 16 16">
                                    <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z"/>
                                    <path fillRule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"/>
                                </svg>
                                <div className="create-budget mb-3" id="less-margin-top">
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
                                </div>
                            </div> : null
                        }
                        {step == 4
                            ? <div className="create-budget-card mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="#70c244" className="bi bi-airplane-engines budget-form-icon" viewBox="0 0 16 16">
                                        <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0ZM7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1c.213 0 .458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7V3Z"/>
                                </svg>
                                <div className="create-budget mb-3">
                                    <div className="input-div">
                                        <label htmlFor="homeCountry">Where are you based?</label>
                                        <select onChange={handleHomeCountryInputChange} value={home_country.home_country} required name="homeCountry" id="homeCountry" className="form-select input">
                                            <option value="">Home Country</option>
                                            {
                                                countries.map(country => {
                                                    return <option key={country.name} value={country.name}>{country.name}</option>
                                                })
                                            }
                                        </select>
                                        <br />
                                        <label htmlFor="destinationCountry">And where are you traveling to?</label>
                                        <select onChange={handleDestinationCountryInputChange} value={destination_country.destination_country} required name="destinationCountry" id="destinationCountry" className="form-select input">
                                            <option value="">Destination Country</option>
                                            {
                                                countries.map(country => {
                                                    return <option key={country.name} value={country.name}>{country.name}</option>
                                                })
                                            }
                                        </select>
                                        <div className="form-buttons-div d-flex">
                                            <p className="reset-button" onClick={handleResetClick}>Reset</p>
                                            {!(home_country) || !(destination_country)
                                                ? <button className="btn btn-primary form-button">Confirm</button>
                                                : <button onClick={handleConfirmClick} value={account_id.account_id} className="btn btn-primary form-button">Confirm</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                        }
                    </form>
                </div>
            </div>
        )
    }
}


export default BudgetForm;
