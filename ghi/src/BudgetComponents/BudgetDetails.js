import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorNotification from '../ErrorNotification';
import ExpenseForm from './ExpenseForm';
import { useGetBudgetQuery, useDeleteBudgetMutation, useUpdateBudgetMutation } from '../store/budgetsApi';
import { useGetExpensesQuery } from '../store/expensesApi';
import { useGetCategoriesQuery } from '../store/expensesApi';
import ExpensesList from './ExpensesList';
import TravelRecommendations from './TravelRecommendations';
import Notification from '../Notification';
import Moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map'



function BudgetDetails() {
    const { budget_id } = useParams();
    const wrap = "id".concat("=", budget_id);

    const {
        data: budgetsData,
        error: budgetsError,
        isLoading: budgetsIsLoading,
    } = useGetBudgetQuery(wrap);

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


    const [expenses, setExpenes] = useState([]);
    const [dates, setDates] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [total, setTotal] = useState(0);
    const [deleteBudget, deleted] = useDeleteBudgetMutation(budget_id);
    const [updateBudget, update_response] = useUpdateBudgetMutation(budget_id);


    useEffect(() => {
        if (!(expensesIsLoading)) {
            const expenses = [];
            const dates = [];
            expensesData.map(expense => {
                if (expense.budget_id === parseInt(budget_id)) {
                    expenses.push(expense);
                    if (!(dates.includes(expense.date))) {
                        dates.push(expense.date);
                    }
                }
                return null;
            });
            setExpenes(expenses);
            setDates(dates);
            setFilteredExpenses(expenses);

            let total = 0;
            expenses.map(expense => {
                total += expense.expense_converted;
            });
            setTotal(total);
        }
    }, [expensesData]);


    const handleDateChange = event => {
        const value = event.target.value;
        const dateExpenses = [];

        if (value === "") {
            setFilteredExpenses(expenses);
        } else {
            expenses.map(expense => {
                if (expense.date === value) {
                    dateExpenses.push(expense);
                }
            });
            setFilteredExpenses(dateExpenses);
        }
    }


    const handleCategoryChange = event => {
        const value = event.target.value;
        const categoryExpenses = [];

        if (value === "") {
            setFilteredExpenses(expenses);
        } else {
            expenses.map(expense => {
                if (expense.category_id.toString() === value) {
                    categoryExpenses.push(expense);
                }
            });
            setFilteredExpenses(categoryExpenses);
        }
    }
    // console.log("Budget Data: ---",budgetsData.home_country)
    // console.log("data: ",budgetsData["home_country"])
    // console.log(getSymbolFromCurrency(budgetsData["home_country"]))

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
                    <Link to={'/budgets'}><button onClick={() => deleteBudget(budget_id)} className="btn btn-primary">Delete</button></Link>
                    <Link to={'/budgets/add-budget'}><button onChange={updateBudget} className="btn btn-primary">Update</button></Link>
                    <div className="row metrics-div">
                        <div className="col-sm">
                            <p className="sub-metric">
                                {getSymbolFromCurrency(budgetsData["home_country"])}
                                {budgetsData.budget.toLocaleString()}</p>
                            <p className="metric-label">Budget</p>
                        </div>
                        <div className="col-sm">
                            <p className={(budgetsData.budget - total) > 0 ? "primary-metric" : "primary-metric-over"}>
                                {getSymbolFromCurrency(budgetsData["home_country"])}
                                {(budgetsData.budget - total).toLocaleString()}</p>
                            <p className="metric-label">Budget Remaining</p>
                        </div>
                        <div className="col-sm">
                            <p className="sub-metric">
                                {getSymbolFromCurrency(budgetsData["home_country"])}
                                {total.toLocaleString()}
                            </p>
                            <p className="metric-label">Spend</p>
                        </div>
                    </div>
                </div>
                <div className="container filters-div">
                    <div className="d-flex">
                        <div className="d-flex filters-sub-div">
                            <select onChange={handleDateChange} name="date" id="date" className="form-select filter">
                                <option value="">Filter by Date</option>
                                    {
                                        dates.map((date, index) => {
                                            return <option key={index} value={date}>{Moment(date).format('MMM DD, YYYY')}</option>
                                        })
                                    }
                            </select>
                            <select onChange={handleCategoryChange} name="category" id="category" className="form-select filter">
                                <option value="">Filter by Category</option>
                                    {
                                        categoriesData.map(category => {
                                            return <option key={category.id} value={category.id}>{category.title}</option>
                                        })
                                    }
                            </select>
                        </div>
                        <div className="add-expense-component">
                            <ExpenseForm
                                props={budget_id}
                                remaining={budgetsData.budget - total}
                                homeCurrency={budgetsData.home_country}
                                destinationCurrency={budgetsData.destination_country}
                            />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <br />
                    <ExpensesList
                        expenses={filteredExpenses}
                        budget={budgetsData.budget}
                        total={total}
                        remaining={budgetsData.budget - total}
                        homeCurrency={budgetsData.home_country}
                        destinationCurrency={budgetsData.destination_country}
                    />
                </div>
                <TravelRecommendations
                    budget={budget_id}
                    categories={categoriesData}
                    remaining={budgetsData.budget - total}
                />
            </>
        )
    }
}


export default BudgetDetails;
