import { useState, useEffect } from 'react';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';
import { useGetCurrencyRatesQuery } from '../store/exchangeRatesApi';
import { useGetCategoriesQuery } from '../store/expensesApi';
import { useCreateExpenseMutation } from '../store/expensesApi';
import BulmaInput from '../BulmaInput';
import Notification from '../Notification';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import getSymbolFromCurrency from 'currency-symbol-map'


function ExpenseForm(props) {
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


    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [expense_total, setExpenseTotal] = useState(0);
    const [expense_converted, setExpenseConverted] = useState(0)
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    const [error, setError] = useState('');
    const [createExpense, result] = useCreateExpenseMutation();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleCategoryIdInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCategory({ ...category, [name]: parseInt(value) });
    };


    async function handleSubmit(e) {
        e.preventDefault();
        const budget_id = props.props
        const category_id = category.category_id
        createExpense({title, date, expense_total, expense_converted, description,
            budget_id, category_id,});
        setExpenseConverted(0);
        }


    // let homeCountry = "";
    // let destination = "";
    // async function currencyCodeInfo(){
    //     try{
    //         destination += budgetsData[parseInt(props.props)-1]["destination_country"];
    //         homeCountry += budgetsData[parseInt(props.props)-1]["home_country"];
    //     } catch(err) {
    //         console.log("")
    //     }
    // }
    // currencyCodeInfo();
    // console.log("props", props)

    
    const {
        data: currencyData,
        error: currencyError,
        isLoading: currencyIsLoading
    } = useGetCurrencyRatesQuery(props.homeCurrency);


    function setExpenseAndConvert(expense_total){
        setExpenseConverted(Number(parseFloat(expense_total / currencyData.rates[props.destinationCurrency]).toFixed(2)))
        setExpenseTotal(Number(expense_total))
    }


    if (budgetsIsLoading || categoriesIsLoading || currencyIsLoading) {
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
                        <ErrorNotification error={error} />
                        <Button className="btn btn-primary" id={props.remaining < 0 ? "over-budget" : null} variant="dark my-3" onClick={handleShow}>
                            Add Expense
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title className="expense-popup-title">Add Expense</Modal.Title>
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
                                <BulmaInput onChange={setExpenseAndConvert} value={expense_total.expense_total} required placeholder="Expense Total" type="float" name="expenseTotal" id="expenseTotal" className="form-control" label={`Expense Total
                                ${props.destinationCurrency}`} />
                            </div>
                            <div className="mb-3 text-left">
                                <label htmlFor='convertedTotal'>Home Currency Total
                                ({props.homeCurrency})
                                </label>
                                <p id="converted-total" name="convertedTotal"
                                    placeholder='0'
                                    >
                                    {getSymbolFromCurrency(props.homeCurrency)}
                                    {expense_converted}
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
                                <button className="btn btn-primary expense-save" onClick={handleClose}>Save</button>
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


export default ExpenseForm;
