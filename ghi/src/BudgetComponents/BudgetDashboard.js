import { useGetBudgetsQuery } from "../store/budgetsApi";


function BudgetDashboard() {
    const { data, error, isLoading } = useGetBudgetsQuery();

    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }

    return (
        <div className="container">
            {console.log("DATA: ", data)}
            <h1>Budget Dashboard Page</h1>
            {data.map(budget => {
                return (
                    <div key={budget.id}>
                        <h3>{budget.title}</h3>
                        <p>{`${budget.start_date} ${budget.end_date}`}</p>
                    </div>
                )}
            )}
        </div>
    )
}

export default BudgetDashboard;
