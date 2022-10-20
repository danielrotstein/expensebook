import { useState, useEffect } from 'react';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';
import { useGetCategoriesQuery } from '../store/expensesApi';
import { useCreateExpenseMutation } from '../store/expensesApi';
import BulmaInput from '../BulmaInput';
import Notification from '../Notification';
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

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [expense_total, setExpenseTotal] = useState(0);
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
        createExpense({title, date, expense_total, description, 
            budget_id, category_id,});
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