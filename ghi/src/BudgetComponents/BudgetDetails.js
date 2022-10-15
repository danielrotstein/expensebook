import { useGetBudgetQuery } from '../store/budgetsApi';
import ErrorNotification from '../ErrorNotification';
import { useNavigate } from 'react-router-dom';



function BudgetDetails() {
    const { budget_id } = useNavigate();
    const { data, error, isLoading } = useGetBudgetQuery(15);

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }
    console.log("DATA________: ", data)
    console.log("BUDGET-ID: ", budget_id)
    return (
        <div className="container">
            {/* <ErrorNotification error={error} /> */}
            <div className="budget-card shadow-sm">
                <h1>Budget details</h1>
                <p>{data.title}</p>
            </div>
        </div>
    )
}


export default BudgetDetails;
