import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';
import { useGetCategoriesQuery } from '../store/expensesApi';
import { useCreateExpenseMutation } from '../store/expensesApi';
import BulmaInput from '../BulmaInput';
import Notification from '../Notification';


function ExpenseForm() {
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

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [expense_total, setExpenseTotal] = useState(0);
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(0);
    const [category, setCategory] = useState(0);
    const [error, setError] = useState('');
    const [createExpense, result] = useCreateExpenseMutation();

    const handleBudgetIdInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBudget({ ...budget, [name]: parseInt(value) });
    };

    const handleCategoryIdInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCategory({ ...category, [name]: parseInt(value) });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const budget_id = budget.budget_id
        const category_id = category.category_id
        createExpense({title, date, expense_total, description, 
            budget_id, category_id,});
    }

    if (result.isSuccess) {
        navigate("/budgets/details");
    } else if (result.isError) {
        setError(result.error);
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
                            <div className="mb-3">
                                <label htmlFor="description">Description</label>
                                <BulmaInput onChange={setDescription} value={description.description} required placeholder="Description" type="text" name="description" id="description" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleBudgetIdInputChange} value={budget.budget_id} required name="budget_id" id="budget" className="form-select">
                                    <option value="">Budget</option>
                                    {
                                        budgetsData.map(budget => {
                                            return <option key={budget.id} value={budget.id}>{budget.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleCategoryIdInputChange} value={category.category_id} required name="category_id" id="category" className="form-select">
                                    <option value="">Category</option>
                                    {
                                        categoriesData.map(category => {
                                            return <option key={category.id} value={category.id}>{category.title}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="field">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default ExpenseForm;