import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorNotification from '../ErrorNotification';
import ExpenseForm from './ExpenseForm';
import { useGetBudgetQuery } from '../store/budgetsApi';
import { useGetExpensesQuery } from '../store/expensesApi';
import { useGetCategoriesQuery } from '../store/expensesApi';
import ExpensesList from './ExpensesList';
import TravelRecommendations from './TravelRecommendations';
import Notification from '../Notification';
import Moment from 'moment';



function BudgetDetails() {
    const { budget_id } = useParams();

    const { 
        data: budgetsData, 
        error: budgetsError, 
        isLoading: budgetsIsLoading,
    } = useGetBudgetQuery(budget_id);
    const { 
        data: expensesData, 
        error: expensesError, 
        isLoading: expensesIsLoading,
    } = useGetExpensesQuery();
    const { 
        data: categoriesData, 
        error: categoriesError, 
        isLoading: categoriesIsLoading,
    } = useGetCategoriesQuery();


    const [filteredExpenses, setFilteredExpenes] = useState([]);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        if (!(expensesIsLoading)) {
            const filtered = [];
            expensesData.map(expense => {
                if (expense.budget_id === parseInt(budget_id)) {
                    filtered.push(expense);
                }
                return null;
            });
            setFilteredExpenes(filtered);

            let total = 0;
            filtered.map(expense => {
                total += expense.expense_total;
            });
            setTotal(total);
            
        }
    }, [expensesData]);


    const handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }


    if (budgetsIsLoading || expensesIsLoading || categoriesIsLoading) {
        return (
          <div className="container">
            <Notification type="info">Loading...</Notification>
          </div>
        );
    } else {    
        return (
            <>
                <div className="container">
                    <ErrorNotification error={budgetsError} />
                    <p className="dashboard-title">{budgetsData.title}</p>
                    <br />
                    <div className="row metrics-div">
                        <div className="col-sm">
                            <p className="sub-metric">${budgetsData.budget.toLocaleString()}</p>
                            <p className="metric-label">Budget</p>
                        </div>
                        <div className="col-sm">
                            <p className="primary-metric">${(budgetsData.budget - total).toLocaleString()}</p>
                            <p className="metric-label">Budget Remaining</p>
                        </div>
                        <div className="col-sm">
                            <p className="sub-metric">${total.toLocaleString()}</p>
                            <p className="metric-label">Spend</p>
                        </div>
                    </div>
                </div>
                <div className="container filters-div">
                    <div className="d-flex">
                        <div className="d-flex filters-sub-div">
                            <select onChange={handleChange} value="" name="date" id="date" className="form-select filter">
                                <option value="">Filter by Date</option>
                                    {
                                        filteredExpenses.map(expense => {
                                            return <option key={expense.id} value={expense.id}>{Moment(expense.date).format('MMM DD, YYYY')}</option>
                                        })
                                    }
                            </select>
                            <select onChange={handleChange} value="" name="category" id="category" className="form-select filter">
                                <option value="">Filter by Category</option>
                                    {
                                        categoriesData.map(category => {
                                            return <option key={category.id} value={category.id}>{category.title}</option>
                                        })
                                    }
                            </select>
                        </div>
                        <ExpenseForm props={budget_id}/>
                    </div>
                </div>
                <br />
                <div className="container">
                    <br />         
                    <ExpensesList 
                        expenses={filteredExpenses} 
                        budget={budgetsData.budget}
                        total={total}
                        remaining={budgetsData.budget - total}
                    />
                </div>
                <TravelRecommendations categories={categoriesData}/>
            </>
        )
    }
}


export default BudgetDetails;
