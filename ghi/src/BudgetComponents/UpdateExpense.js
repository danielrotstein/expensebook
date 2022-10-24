import { useState, useEffect } from 'react';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';
import { useGetCategoriesQuery, useUpdateExpenseMutation, useGetExpenseQuery } from '../store/expensesApi';
import { useGetCurrencyRatesQuery } from '../store/exchangeRatesApi';
import BulmaInput from '../BulmaInput';
import Notification from '../Notification';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import getSymbolFromCurrency from 'currency-symbol-map'


function UpdateExpenseForm(props) {
    const expense_id = props.expense_id
    // const expense_id = JSON.parse(localStorage.getItem('expense_id'));
    console.log("EXPENSE ID", expense_id)
    const { data, isLoading } = useGetExpenseQuery(expense_id);
    console.log("DATA", data)

    const { 
        data: budgetsData, 
        error: budgetsError, 
        isLoading: budgetsIsLoading 
    } = useGetBudgetsQuery();
    const { 
        data: categoriesData, 
        error: categoriesError, 
        isLoading: categoriesIsLoading 
    } = useGetCategoriesQuery();

    const {
        data: currencyData,
        error: currencyError,
        isLoading: currencyIsLoading
    } = useGetCurrencyRatesQuery(props.homeCurrency);

    console.log("CURRENCY DATA", currencyData)
    console.log("PROPS", props)

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [expense_total, setExpenseTotal] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [budget_id, setBudgetID] = useState(0)
    const [updateExpense, updated_expense] = useUpdateExpenseMutation(expense_id);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [expense_converted, setExpenseConverted] = useState(0)
    // const [total, setTotal] = useState(0);


    useEffect(() => {
        if (!(isLoading)) {
            const value = data.budget_id
            setBudgetID(value)
        }
    } , [data])


    const handleCategoryIdInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCategory({ ...category, [name]: parseInt(value) });
    };


    async function handleSubmit(e) {
        e.preventDefault();
        handleClose();
        const category_id = category.category_id
        updateExpense({ expense_id, title, date, expense_total, expense_converted, description, category_id, budget_id});
    }

    function setExpenseAndConvert(expense_total){
        setExpenseConverted(Number(parseFloat(expense_total / currencyData.rates[props.destinationCurrency]).toFixed(2)))
        setExpenseTotal(Number(expense_total))
    }

    if (budgetsIsLoading || categoriesIsLoading || currencyIsLoading ) {
        return (
          <div className="container">
            <Notification type="info">Loading...</Notification>
          </div>
        );
    } else {
        
        return (
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-one-third">
                        <ErrorNotification error={budgetsError} />
                        <ErrorNotification error={categoriesError} />
                        <ErrorNotification error={currencyError} />
                        <Button className="btn" id={props.remaining < 0 ? "over-budget" : null} onClick={handleShow}>
                            Update
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title className="expense-popup-title">Update Expense</Modal.Title>
                            </Modal.Header>

                        <Modal.Body>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="mb-3">
                                <BulmaInput onChange={setTitle} value={title.title} required placeholder="Title" type="text" name="title" id="title" className="form-control input" label="Title"/>
                            </div>
                            <div className="mb-3">
                                <BulmaInput onChange={setDate} value={date.date} required placeholder="Date" type="date" name="date" id="date" className="form-control input" label="Date"/>
                            </div>
                            <div className="mb-3">
                                <BulmaInput onChange={setExpenseAndConvert} value={expense_total.expense_total} required placeholder="Expense Total" type="number" name="expenseTotal" id="expenseTotal" className="form-control input" label="Expense Total"/>
                            </div>
                            <div className="mb-3 text-left">
                                <label htmlFor='convertedTotal'>Home Currency Total
                                ({props.homeCurrency})
                                </label>
                                <p name="convertedTotal"
                                    placeholder='0'

                                    >
                                    {getSymbolFromCurrency(props.homeCurrency)}
                                    {console.log("HOME CURRENCY", props.homeCurrency)}
                                    {parseFloat(expense_total / currencyData.rates[props.destinationCurrency]).toFixed(2)}
                                </p>
                            </div>
                            <div className="mb-3">
                                <BulmaInput onChange={setDescription} value={description.description} required placeholder="Description" type="text" name="description" id="description" className="form-control input" label="Description"/>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleCategoryIdInputChange} value={category.category_id} required name="category_id" id="category" className="form-select category-input input" label="Select a Category">
                                    <option value="">Categories:</option>
                                    {
                                        categoriesData.map(category => {
                                            return <option key={category.id} value={category.id}>{category.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="field">
                                <button className="btn btn-primary expense-save" onClick={() => handleSubmit}>Save</button>
                            </div>
                        </form> 
                        </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}


export default UpdateExpenseForm;