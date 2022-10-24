import { useState, useEffect } from 'react';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery,useUpdateBudgetMutation } from '../store/budgetsApi';
import { useGetCategoriesQuery, useUpdateExpenseMutation, useGetExpenseQuery } from '../store/expensesApi';
import { useGetCurrencyRatesQuery } from '../store/exchangeRatesApi';
import BulmaInput from '../BulmaInput';
import Notification from '../Notification';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import countries from '../CountryList';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useGetOneAccountQuery } from '../store/accountsApi';

function UpdateBudgetForm(props) {
    const { budget_id } = useParams();
    console.log("budget_id", budget_id)
    const email = JSON.parse(localStorage.getItem('email'));
    console.log("email: ", email);
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

    const handleConfirmClick = () => {
        const value = data.id;
            setAccountID(value);

    }

    async function handleSubmit(e) {
        e.preventDefault();
        updateBudget({ title, start_date, end_date, budget,
            home_country, destination_country, account_id });
    }

    if (result.isSuccess) {
        navigate("/budgets");
    } else if (result.isError) {
        // setError(result.error);
        console.log("ERROR")
    }


    return (
<div className="container">
                <div className="columns is-centered">
                    <div className="column is-one-third">
                        <ErrorNotification />
                        <ErrorNotification />
                        <Button className="btn" id="show" onClick={handleShow}>
                            Update
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title className="budget-popup-title">Update Budget</Modal.Title>
                            </Modal.Header>

                        <Modal.Body>
                        <form>
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
                            <div className="field">
                                <button className="btn btn-primary expense-save">Save</button>
                            </div>
                        </form> 
                        </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
    )
}

export default UpdateBudgetForm;