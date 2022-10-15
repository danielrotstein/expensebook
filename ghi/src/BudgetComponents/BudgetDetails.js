import { useGetBudgetQuery } from '../store/budgetsApi';
import ErrorNotification from '../ErrorNotification';
import { useParams } from 'react-router-dom';


function BudgetDetails() {
    const { budgetId } = useParams();
    const { data, error, isLoading } = useGetBudgetQuery(budgetId);

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }

    return (
        <div className="container">
            <ErrorNotification error={error} />
            <div className="budget-card shadow-sm">
                <h1>Budget details</h1>
                <p>Title: {data.title}</p>
                <p>Date: {data.start_date} - {data.end_date}</p>
                <p>Budget: {data.budget}</p>
            </div>
        </div>
    )
}


export default BudgetDetails;
