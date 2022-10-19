import { useState, useEffect } from 'react';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';
import { useGetCurrencyRatesQuery } from '../store/exchangeRatesApi';
import { useGetCategoriesQuery } from '../store/expensesApi';
import { useCreateExpenseMutation } from '../store/expensesApi';
import BulmaInput from '../BulmaInput';
import Notification from '../Notification';
// import ExchangeRates from '../ExchangeRates';

// Modal Stuff
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


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

    // console.log("cat data", categoriesData)
    // console.log("currency", currencyData)

    // const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [expense_total, setExpenseTotal] = useState(0);
    const [expense_converted, setExpenseConverted] = useState(0)
    const [description, setDescription] = useState('');
    // const [budget, setBudget] = useState(0);
    const [category, setCategory] = useState(0);
    const [error, setError] = useState('');
    const [createExpense, result] = useCreateExpenseMutation();

    // Modal Stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // const handleBudgetIdInputChange = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setBudget({ ...budget, [name]: parseInt(value) });
    // };

    // const handleExpenseConverted = (e) => {
    //     const value = e.target.value;
    //     setExpenseConverted(value)
    //     console.log(value)
    // }

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
    }

    let homeCountry = "";
    let destination = "";
    async function budgetInfo(){
        try{
            destination += budgetsData[parseInt(props.props)-1]["destination_country"];
            homeCountry += budgetsData[parseInt(props.props)-1]["home_country"];
        } catch(err) {
            console.log("EEEKK")
        }
    }
    budgetInfo();

    // let rates = ExchangeRates(props);
    // console.log("rates", rates)
    const {
        data: currencyData,
        error: currencyError,
        isLoading: currencyIsLoading
    } = useGetCurrencyRatesQuery(homeCountry);

    console.log("currency", currencyData)

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

                        <Button className="btn btn-primary" variant="dark my-3" onClick={handleShow}>
                            Add Expense
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>

                            <Modal.Title>Add Expense</Modal.Title>
                            </Modal.Header>

                        <Modal.Body>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="title">Title</label>
                                <BulmaInput onChange={setTitle} value={title.title} required placeholder="Title" type="text" name="title" id="title" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date">Date</label>
                                <BulmaInput onChange={setDate} value={date.date} required placeholder="Date" type="date" name="date" id="date" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expenseTotal">Expense Total
                                ({destination})
                                </label>
                                <BulmaInput onChange={setExpenseTotal} value={expense_total.expense_total} required placeholder="Expense Total" type="number" name="expenseTotal" id="expenseTotal" className="form-control"/>
                            </div>
                            <div className="mb-3 text-left">
                                <label htmlFor='convertedTotal'>Home Currency Total
                                ({homeCountry})
                                </label>
                                <p name="convertedTotal"
                                    placeholder='0'
                                    // onChange={handleExpenseConverted}
                                    // value={parseFloat(expense_total / rates[destination]).toFixed(2).expense_converted}
                                    >
                                    {parseFloat(expense_total / currencyData.rates[destination]).toFixed(2)}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description">Description</label>
                                    <BulmaInput onChange={setDescription} value={description.description} required placeholder="Description" type="text" name="description" id="description" className="form-control"/>
                            </div>
                            {/* <div className="mb-3">
                                <select onChange={handleBudgetIdInputChange} value={budget.budget_id} required name="budget_id" id="budget" className="form-select">
                                    <option value="">Budgets:</option>
                                    {
                                        budgetsData.map(budget => {
                                            return <option key={budget.id} value={budget.id}>{budget.title}</option>
                                        })
                                    }
                                </select>
                            </div> */}
                            <div className="mb-3">
                                <select onChange={handleCategoryIdInputChange} value={category.category_id} required name="category_id" id="category" className="form-select">
                                    <option value="">Categories:</option>
                                    {
                                        categoriesData.map(category => {
                                            return <option key={category.id} value={category.id}>{category.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="field">
                                <button className="btn btn-dark" onClick={handleClose}>Save</button>
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
