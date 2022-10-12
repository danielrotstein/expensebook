import { Link } from 'react-router-dom';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';


function BudgetDashboard() {
    const { data, error, isLoading } = useGetBudgetsQuery();

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }

    return (
        <div className="container">
            <ErrorNotification error={error} />
            <div className="create-new-trip-div">
                <Link to="/budgets/add-budget" className="btn btn-primary px-4 gap-3">Create New Budget</Link>
            </div>
            {data.map(budget => {
                return (
                    <div className="budget-card shadow-sm" key={budget.id}>
                        <h3 className="budget-title">{budget.title}</h3>
                        <p className="budget-date">{`${budget.start_date} ${budget.end_date}`}</p>
                        <h2 className="budget-amount">${budget.budget.toLocaleString()}</h2>
                    </div>
   
                )}
            )}
        </div>
        
        
        



    )
}

export default BudgetDashboard;
