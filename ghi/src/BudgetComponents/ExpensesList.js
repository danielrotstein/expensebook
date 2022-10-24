import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery, useDeleteExpenseMutation, useUpdateExpenseMutation } from '../store/expensesApi';
import { useGetBudgetsQuery } from '../store/budgetsApi'
import ErrorNotification from '../ErrorNotification';
import Notification from '../Notification';
import Moment from 'moment';
import UpdateExpenseForm from './UpdateExpense.js';
import getSymbolFromCurrency from 'currency-symbol-map'


function ExpensesList(props) {
    const { expense_id, budget_id } = useParams();

    const {
        data: budgetsData,
        error: budgetsError,
        isLoading: budgetsIsLoading
    } = useGetBudgetsQuery();

    const { data, error, isLoading } = useGetCategoriesQuery();
    const [deleteExpense, deleted] = useDeleteExpenseMutation(expense_id);
    const [categories, setCategories] = useState({});

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
        console.log("localStorage expense_id: ", localStorage.getItem('expense_id'));
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
                        <th className='table-header'>Update</th>
                        <th className="table-header">Edit</th>
                        <th className="table-header">{props.destinationCurrency}</th>
                        <th className="table-header">{props.homeCurrency}</th>
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
                                <div className="button" onClick={() => handleSubmit(expense.id)}>
                                    <UpdateExpenseForm 
                                        props={expense.id}
                                        // props={budget_id}
                                        // remaining={budgetsData.budget - total}
                                        // homeCurrency={budgetsData.home_country}
                                        // destinationCurrency={budgetsData.destination_country}
                                    />
                                </div>
                            </td>
                            <td>
                                <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                            </td>
                            <td className="table-data">
                                {getSymbolFromCurrency(props.destinationCurrency)}
                                {expense.expense_total.toLocaleString()}
                            </td>
                            <td className="table-data">
                                {getSymbolFromCurrency(props.homeCurrency)}
                                {expense.expense_converted.toLocaleString()}
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
