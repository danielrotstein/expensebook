import { useState, useEffect } from 'react';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';
import { useGetCategoriesQuery, useUpdateExpenseMutation, useGetExpenseQuery } from '../store/expensesApi';
import BulmaInput from '../BulmaInput';
import Notification from '../Notification';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function UpdateExpenseForm(props) {
    const expense_id = JSON.parse(localStorage.getItem('expense_id'));
    const { data, isLoading } = useGetExpenseQuery(expense_id);

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
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(0);
    // const [budget_id, setBudgetID] = useState(0)
    const [updateExpense, updated_expense] = useUpdateExpenseMutation(expense_id);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    } else {
        console.log("DATA", data)
        console.log("TITLE ", data.title);
    }


    const handleCategoryIdInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCategory({ ...category, [name]: parseInt(value) });
    };

    // const handleConfirmClick = () => {
    //     const value = data.budget_id
    //     console.log("VALUE", value)
    //     setBudgetID(value)
    // }


    async function handleSubmit(e) {
        e.preventDefault();
        const id = expense_id
        const category_id = category
        console.log("PROPS", props.props)
        console.log("EXPENSE ID", id)
        console.log("EXPENSE ID TYPE", typeof id)
        updateExpense(expense_id);
        // updateExpense(id, title, date, expense_total, description, budget_id, category_id)
    }

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
                                <BulmaInput onChange={setExpenseTotal} value={expense_total.expense_total} required placeholder="Expense Total" type="number" name="expenseTotal" id="expenseTotal" className="form-control input" label="Expense Total"/>
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
                            {/* <div className='field'>
                                <button className="btn btn-primary expense-save" onClick={handleConfirmClick} value={data.budget_id}></button>
                            </div> */}
                            <div className="field">
                                {console.log(expense_id)}
                                <button className="btn btn-primary expense-save" onClick={() => handleSubmit({expense_id})}>Save</button>
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