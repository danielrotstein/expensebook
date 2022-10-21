import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../store/expensesApi';
import ErrorNotification from '../ErrorNotification';
import Notification from '../Notification';
import Moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map'


function ExpensesList(props) {
    const { data, error, isLoading } = useGetCategoriesQuery();

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
