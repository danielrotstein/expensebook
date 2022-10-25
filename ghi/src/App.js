import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CurrencyConverter from './ConverterComponents/CurrencyConverter';
import Login from './LoginComponents/Login';
import SignUpForm from './LoginComponents/SignUp';
import MainPage from './MainPage';
import Nav from './Nav';
import Footer from './Footer';
import BudgetDashboard from './BudgetComponents/BudgetDashboard';
import BudgetDetails from './BudgetComponents/BudgetDetails';
import BudgetForm from './BudgetComponents/BudgetForm';
import NotFoundPage from './404Page';


function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
    <div className="page-container">
    <div className="content-wrap">
    <BrowserRouter basename={basename}>
      <Nav />
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='login' element={< Login/>}/>
        <Route path='signup' element={< SignUpForm/>} />
        <Route path='accounts' />
        <Route path='budgets'>
          <Route index element={<BudgetDashboard />} />
          <Route path='id=:budget_id' element={< BudgetDetails/>} />
          <Route path='add-budget' element={< BudgetForm/>} />
        </Route>
        <Route path='$converter' element={< CurrencyConverter/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </div>
    <Footer />
    </div>
  );
}


export default App;