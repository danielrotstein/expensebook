import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './AboutUs';
// import CurrencyConverter from './CurrencyConverter';
import Login from './LoginComponents/Login';
import Logout from './LoginComponents/Logout'
import SignUpForm from './LoginComponents/SignUp';
import MainPage from './MainPage';
import Nav from './Nav';
import ExpenseForm from './BudgetComponents/ExpenseForm';
import BudgetDashboard from './BudgetComponents/BudgetDashboard';
import BudgetDetails from './BudgetComponents/BudgetDetails';
import BudgetForm from './BudgetComponents/BudgetForm';
import ExpensesDashboard from './BudgetComponents/ExpenseDashboard';
import ExpenseDetails from './BudgetComponents/ExpenseDetails';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='about' element={< AboutUs/>}/>
        <Route path='login' element={< Login/>}/>
        <Route path='logout' element={< Logout/>}/>
        <Route path='signup' element={< SignUpForm/>} />
        <Route path='accounts' />
        <Route path='budgets'>
          <Route index element={<BudgetDashboard />} />
          <Route path=':budget_id' element={< BudgetDetails/>} />
          <Route path='add-budget' element={< BudgetForm/>} />
          {/* <Route path=':budget_id/add-expense' element={< ExpenseForm/>} /> */}
        </Route>
        {/* <Route path='expenses'>
          <Route index element={<ExpensesDashboard />} />
          <Route path=':expense_id' element={< ExpenseDetails/>} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
