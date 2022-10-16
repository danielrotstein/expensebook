import { Link } from 'react-router-dom';
import { useGetBudgetQuery } from '../store/budgetsApi';
import ErrorNotification from '../ErrorNotification';
import { useParams } from 'react-router-dom';
import { useGetExpensesQuery } from '../store/expensesApi';


function BudgetDetails() {
    const { budget_id } = useParams();
    const { data, error, isLoading } = useGetBudgetQuery(budget_id);
    // const { data2, isLoading2 } = useGetExpensesQuery();

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }
    
    // console.log("EXPENSES----: ", data2)

    return (
        <div className="container">
            <ErrorNotification error={error} />
            <div className="budget-card shadow-sm">
                <h1>Budget details</h1>
                <p>Title: {data.title}</p>
                <p>Date: {data.start_date} - {data.end_date}</p>
                <p>Budget: {data.budget}</p>
                {/* <div className="d-flex">
                {data2.map(expense => {
                    return (
                        <div className="budget-card shadow-sm" key={expense.id}>
                            <a href={`/budgets/${expense.id}`}>
                                <h3 className="budget-title">{expense.title}</h3>
                            </a>
                        </div>
                    )}
                )}
            </div> */}
            </div>
        </div>
    )
}


export default BudgetDetails;
