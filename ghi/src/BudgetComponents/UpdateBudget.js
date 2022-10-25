import { useState, useEffect } from 'react';
import ErrorNotification from '../ErrorNotification';
import { useUpdateBudgetMutation } from '../store/budgetsApi';
import BulmaInput from '../BulmaInput';
import Modal from 'react-bootstrap/Modal';
import countries from '../CountryList';
import { useNavigate } from "react-router-dom";
import { useGetOneAccountQuery } from '../store/accountsApi';

function UpdateBudgetForm(props) {
    const budget_id = props.props
    const email = JSON.parse(localStorage.getItem('email'));
    const { data, error, isLoading } = useGetOneAccountQuery(email);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [budget, setBudget] = useState(0);
    const [home_country, setHomeCountry] = useState('');
    const [destination_country, setDestinationCountry] = useState('');
    const [account_id, setAccountID] = useState(0)
    const [updateBudget, result] = useUpdateBudgetMutation(budget_id);


    const handleHomeCountryInputChange = (e) => {
        const value = e.target.value;
            setHomeCountry(value);
    };


    const handleDestinationCountryInputChange = (e) => {
        const value = e.target.value;
            setDestinationCountry(value);
        console.log("setDestinationCountry: ", destination_country)
    };

    useEffect(() => {
        if (!(isLoading)) {
            const value = data.id
            setAccountID(value)
        }
    } , [data])

    async function handleSubmit(e) {
        e.preventDefault();
        handleClose();
        updateBudget({ budget_id, title, start_date, end_date, budget,
            home_country, destination_country, account_id });
    };


    if (result.isSuccess) {
        navigate("/budgets");
    } else if (result.isError) {
        // setError(result.error);
        console.log("ERROR")
    }


    return (
        <>
            <ErrorNotification />
            <ErrorNotification />
            <a id="show" onClick={handleShow}>Update</a>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className="budget-popup-title">Update Budget</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <BulmaInput onChange={setTitle} value={title.title} required type="text" name="title" id="title" className="form-control input" placeholder="Title" label="Title" />
                        </div>
                        <div className="mb-3">
                            <BulmaInput onChange={setStartDate} value={start_date.start_date} required type="date" name="startDate" id="startDate" className="form-control input" label="Start Date" />
                        </div>
                        <div className="mb-3">
                            <BulmaInput onChange={setEndDate} value={end_date.end_date} required type="date" name="endDate" id="endDate" className="form-control input" label="End Date" />
                        </div>
                        <div className="mb-3">
                            <BulmaInput onChange={setBudget} value={budget.budget} required type="number" name="budget" id="budget" className="form-control input" label="Budget" placeholder="Budget" />
                        </div>
                        <div className='mb-3'>
                            <select onChange={handleHomeCountryInputChange} value={home_country.home_country} required name="homeCountry" id="homeCountry" className="form-select input">
                                    <option value="">Home Country</option>
                                    {
                                        countries.map(country => {
                                            return <option key={country.name} value={country.currency_code}>{country.name}</option>
                                        })
                                    }
                            </select>
                        </div>
                        <div className='mb-3'>
                            <select onChange={handleDestinationCountryInputChange} value={destination_country.destination_country} required name="destinationCountry" id="destinationCountry" className="form-select input">
                                    <option value="">Destination Country</option>
                                    {
                                        countries.map(country => {
                                            return <option key={country.name} value={country.currency_code}>{country.name}</option>
                                        })
                                    }
                            </select>
                        </div>
                        <div className="field">
                            <button className="btn btn-primary expense-save">Save</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateBudgetForm;
