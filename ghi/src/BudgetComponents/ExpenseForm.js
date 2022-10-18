import { useState, useEffect } from 'react';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';
import { useGetCategoriesQuery } from '../store/expensesApi';
import { useCreateExpenseMutation } from '../store/expensesApi';
import BulmaInput from '../BulmaInput';
import Notification from '../Notification';
import ExchangeRates from '../ExchangeRates';

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

    // const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [expense_total, setExpenseTotal] = useState(0);
    const [expense_converted, setConvertedTotal] = useState('')
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

    // let currency = []
    // for (let i of budgetsData) {
    //     console.log("here", i["id"])
    //     if (i === props.props)
    //     console.log("i",i)
    //     currency.push(i["home_country"])


    // }
    // console.log("currency", currency)
    // console.log(props.props)
    // console.log("budget",budgetsData)

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
            // ^^ need to add expense_converted field
            // and get data from currency API
    }

    let homeCountry = "";
    let destination = "";
    async function budgetInfo(){
        destination += budgetsData[parseInt(props.props)-1]["destination_country"];
        homeCountry += budgetsData[parseInt(props.props)-1]["home_country"];
    }
    budgetInfo();
    let rates = ExchangeRates(homeCountry);
    // console.log(rates)
    console.log("converted", homeCountry)
    console.log("local", destination)
    // console.log("budgets", budgetsData[budgetID])
    // console.log("props", props)


    if (budgetsIsLoading || categoriesIsLoading) {
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
                                <label htmlFor="expenseTotal">Expense Total</label>
                                <BulmaInput onChange={setExpenseTotal} value={expense_total.expense_total} required placeholder="Expense Total" type="number" name="expenseTotal" id="expenseTotal" className="form-control"/>
                            </div>
                            <div>
                                <label htmlFor='convertedTotal'>Home Currency Total</label>
                                <p name="convertedTotal" placeholder='0' onChange={setConvertedTotal} value={parseFloat(expense_total / rates[destination]).toFixed(2)}>{parseFloat(expense_total / rates[destination]).toFixed(2)}</p>
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
