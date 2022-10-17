import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';
import BudgetForm from './BudgetForm';


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
            <BudgetForm />
            {/* <div className="create-new-trip-div">
                <Link to="/budgets/add-budget" className="btn btn-dark px-4 gap-3">
                    Create New Budget
                </Link>
            </div> */}
            <div className="d-flex">
                {data.map(budget => {
                    return (
                        <div className="budget-card shadow-sm" key={budget.id}>
                            <a href={`/budgets/${budget.id}`}>
                                <h3 className="budget-title">{budget.title}</h3>
                            </a>
                                <p className="budget-date">{`${budget.start_date} ${budget.end_date}`}</p>
                                <h2 className="budget-amount">${budget.budget.toLocaleString()}</h2>
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}

export default BudgetDashboard;
