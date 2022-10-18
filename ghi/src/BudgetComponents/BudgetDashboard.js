import Moment from 'moment';
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery, useGetBudgetsByOneUserQuery } from '../store/budgetsApi';
import { Link } from 'react-router-dom';


function BudgetDashboard() {
    const { data, error, isLoading } = useGetBudgetsQuery();
    // const { data, error, isLoading } = useGetBudgetsByOneUserQuery();
    console.log("DATA", data)

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }

    return (
        <div className="container">
            <ErrorNotification error={error} />
            <p className="dashboard-title">Budget Dashboard</p>
            <div className="create-new-budget-div">
                <Link to="/budgets/add-budget" className="btn btn-primary px-4 gap-3" id="create-new-budget-button">Create New Budget</Link>
            </div>
            <div className="sub-container d-flex">
                {/* FILTER BY ACCOUNT_id=USER */}
                {data.map(budget => {
                    return (
                        <a href={`/budgets/${budget.id}`} key={budget.id} className="budget-card">
                            <div>
                                <p className="budget-title">{budget.title}</p>
                                <p className="budget-date">{`${Moment(budget.start_date).format('MMM DD, YYYY')} - ${Moment(budget.end_date).format('MMM DD, YYYY')}`}</p>
                                <p className="budget-amount">${budget.budget.toLocaleString()}</p>
                            </div>
                        </a>
                    )}
                )}
            </div>
        </div>
    )
}

export default BudgetDashboard;
