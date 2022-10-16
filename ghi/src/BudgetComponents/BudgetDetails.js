import { Link } from 'react-router-dom';
import { useGetBudgetQuery } from '../store/budgetsApi';
import ErrorNotification from '../ErrorNotification';
import { useParams } from 'react-router-dom';
// import { useGetExpenseQuery } from '../store/expensesApi';
import ExpenseModal from './ExpenseModal';
import ExpenseForm from './ExpenseForm';



function BudgetDetails() {
    const { budget_id } = useParams();
    const { data, error, isLoading } = useGetBudgetQuery(budget_id);
    // const { expense_id } = useParams();
    // const { data2, isLoading2 } = useGetExpenseQuery(expense_id);

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }
    // if (isLoading2) {
    //     return (
    //         <progress className="progress is-primary" max="100"></progress>
    //     );
    // }
    
    // console.log("BUDGETS ____: ", data)
    // console.log("EXPENSES----: ", expense_id)

    return (
        <div className="container">
            <ErrorNotification error={error} />
            <ExpenseForm props={budget_id}/>
            <div className="budget-card shadow-sm mb-5">
                <h1>Budget details</h1>
                <p>Title: {data.title}</p>
                <p>Date: {data.start_date} - {data.end_date}</p>
                <p>Budget: {data.budget}</p>

                {/* <div className="d-flex">
                {data2.map(expense => {
                    return (
                        <div className="budget-card shadow-sm" key={expense.id}>
                            <a href={`/budgets/${expense.id}`}>
                                <h3 className="budget-title">{expense.title}</h3>
                            </a>
                        </div>
                    )}
                )}
            </div> */}
            </div>
            
        </div>
    )
}


export default BudgetDetails;
