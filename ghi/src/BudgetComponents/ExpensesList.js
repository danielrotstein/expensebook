import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery, useDeleteExpenseMutation, useUpdateExpenseMutation } from '../store/expensesApi';
import { useGetBudgetQuery } from '../store/budgetsApi'
import ErrorNotification from '../ErrorNotification';
import Notification from '../Notification';
import Moment from 'moment';
import UpdateExpenseForm from './UpdateExpense.js';
import getSymbolFromCurrency from 'currency-symbol-map'


function ExpensesList(props) {
    const { expense_id, budget_id } = useParams();
    const wrap = "id".concat("=", budget_id);


    const {
        data: budgetsData,
        error: budgetsError,
        isLoading: budgetsIsLoading
    } = useGetBudgetQuery(wrap);


    const { data, error, isLoading } = useGetCategoriesQuery();
    const [deleteExpense, deleted] = useDeleteExpenseMutation(expense_id);
    const [categories, setCategories] = useState({});
    const [showActions, setShowActions] = useState(false);
    const [showActionsId, setShowActionsId] = useState(0);


    useEffect(() => {
        if (!(isLoading)) {
            const categoryObj = {};
            data.map(category => {
                categoryObj[category.id] = category.title;
                return null;
            });
            setCategories(categoryObj);
        }
    }, [props.expenses]);


    async function handleSubmit(expense_id) {
        localStorage.setItem('expense_id', JSON.stringify(expense_id));
    }


    const handleClick = expenseId => {
        setShowActions(!showActions);
        setShowActionsId(expenseId);
    }


    if (props.expenses === [] || isLoading) {
        return (
          <div className="container">
            <Notification type="info">Loading...</Notification>
          </div>
        );
    } else {
        return (
            <table className="table">
                <ErrorNotification error={error} />
                <thead>
                    <tr>
                        <th className="table-header">Title</th>
                        <th className="table-header">Date</th>
                        <th className="table-header">Category</th>
                        <th className="table-header">Description</th>
                        <th className="table-header">{props.destinationCurrency}</th>
                        <th className="table-header">{props.homeCurrency}</th>
                        <th className="table-header"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.expenses.map(expense => {
                        return (
                        <tr key={expense.id}>
                            <td className="table-data">{expense.title}</td>
                            <td className="table-data">{Moment(expense.date).format('MMM DD, YYYY')}</td>
                            <td className="table-data">{categories[expense.category_id]}</td>
                            <td className="table-data" id="description">{expense.description}</td>
                            <td className="table-data">
                                {getSymbolFromCurrency(props.destinationCurrency)}
                                {expense.expense_total.toLocaleString()}
                            </td>
                            <td className="table-data">
                                {getSymbolFromCurrency(props.homeCurrency)}
                                {expense.expense_converted.toLocaleString()}
                            </td>
                            <td className='table-data'>
                                <div className="actions-dropdown">
                                    <svg onClick={() => handleClick(expense.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                    </svg>
                                    {showActions && showActionsId === expense.id
                                        ? <div>
                                            <ul className="menu">
                                                <li className="menu-item">
                                                    <div className="button table-data" onClick={() => handleSubmit(expense.id)}>
                                                        <UpdateExpenseForm 
                                                            props={budget_id}
                                                            homeCurrency={budgetsData.home_country}
                                                            destinationCurrency={budgetsData.destination_country}
                                                            expense_id={expense.id}
                                                        />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="button table-data">
                                                        <a onClick={() => deleteExpense(expense.id)}>Delete</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        : null
                                    }
                                </div>
                            </td>
                        </tr>
                        );
                    })}
                    <tr id="row-no-border">
                        <td className="table-data"></td>
                        <td className="table-data"></td>
                        <td className="table-data"></td>
                        <td className="table-data"></td>
                        <td className="table-data" id={props.remaining > 0 ? "budget-remaining" : "budget-remaining-over"}>Budget Remaining</td>
                        <td className="table-data" id={props.remaining > 0 ? "budget-remaining" : "budget-remaining-over"}>
                            {getSymbolFromCurrency(props.homeCurrency)}
                            {props.remaining.toLocaleString()}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}


export default ExpensesList;
