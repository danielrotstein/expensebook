import Moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map'
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsByOneUserQuery } from '../store/budgetsApi';
import { Link } from 'react-router-dom';
import NotFoundPage from '../404Page';


function BudgetDashboard() {
    const email = JSON.parse(localStorage.getItem('email'));
    const { data, error, isLoading } = useGetBudgetsByOneUserQuery(email);


    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }

    
    return (
        <div className="container" id="add-footer-margin">
            <ErrorNotification error={error} />
            <p className="dashboard-title">Budget Dashboard</p>
            <div className="create-new-budget-div">
                <Link to="/budgets/add-budget" className="btn btn-primary px-4 gap-3" id="create-new-budget-button">Create New Budget</Link>
            </div>
            <div className="sub-container d-flex">
                {data
                ? <>
                    {data.map(budget => {
                        return (
                            <a href={`/budgets/id=${budget.id}`} key={budget.id} className="budget-card">
                                <div>
                                    <p className="budget-title">{budget.title}</p>
                                    <p className="budget-date">{`${Moment(budget.start_date).format('MMM DD, YYYY')} - ${Moment(budget.end_date).format('MMM DD, YYYY')}`}</p>
                                    <p className="budget-amount">{getSymbolFromCurrency(budget.home_country)}{budget.budget.toLocaleString()}</p>
                                </div>
                            </a>
                        )}
                    )}
                </>
                :
                <NotFoundPage />
                }
            </div>
            <br />
            <br />
        </div>
    )
}


export default BudgetDashboard;