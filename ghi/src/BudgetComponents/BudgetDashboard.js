import Moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map'
import ErrorNotification from '../ErrorNotification';
import { useGetBudgetsQuery } from '../store/budgetsApi';
import { useGetBudgetsByOneUserQuery } from '../store/budgetsApi';

import { useGetOneAccountQuery } from '../store/accountsApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NotFoundPage from '../404Page';


function BudgetDashboard() {
    const email = JSON.parse(localStorage.getItem('email'));
    const { data, error, isLoading } = useGetBudgetsByOneUserQuery(email);
    // console.log("data: ", data);
    const { data:accountdata, error:accounterror, isLoading:accountisLoading } = useGetOneAccountQuery(email);
    // console.log("accountdata: ", accountdata);

    const navigate = useNavigate();

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
