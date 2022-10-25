import { useParams } from 'react-router-dom';
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
import UpdateBudgetForm from './UpdateBudget';



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
    const [showActions, setShowActions] = useState(false);


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


    const handleSettingsClick = () => {
        setShowActions(!showActions);
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
                    <div className="d-flex">
                    <p className="dashboard-title" id="budget-title">{budgetsData.title}</p>
                    <div className="actions-dropdown" id="budgets-dropdown">
                        <svg onClick={handleSettingsClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                        </svg>
                        {showActions
                            ? <div>
                                <ul className="menu">
                                    <li className="menu-item">
                                        <div className="button table-data">
                                            <UpdateBudgetForm
                                                props={budget_id}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="button table-data">
                                            <a id="delete-budget" href={'/budgets'} onClick={() => deleteBudget(budget_id)}>Delete</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            : null
                        }
                    </div>
                    </div>
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
                                {Math.floor(budgetsData.budget - total).toLocaleString()}</p>
                            <p className="metric-label">Budget Remaining</p>
                        </div>
                        <div className="col-sm">
                            <p className="sub-metric">
                                {getSymbolFromCurrency(budgetsData["home_country"])}
                                {Math.floor(total).toLocaleString()}
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
                <div id="add-footer-margin">
                    <TravelRecommendations
                        budget={budget_id}
                        categories={categoriesData}
                        remaining={budgetsData.budget - total}
                    />
                </div>
            </>
        )
    }
}


export default BudgetDetails;
