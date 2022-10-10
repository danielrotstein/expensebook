import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './AboutUs';
import CurrencyConverter from './CurrencyConverter';
import LoginForm from './LoginComponents/Login';
import SignUpForm from './LoginComponents/SignUp';
import MainPage from './MainPage';
import Nav from './Nav';
import ExpenseForm from './TripComponents/ExpenseForm';
import TripDashboard from './TripComponents/TripDashboard';
import TripDetails from './TripComponents/TripDetails';
import TripForm from './TripComponents/TripForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='about' element={< AboutUs/>}/>
        <Route path='login' element={<LoginForm/>}/>
        <Route path='signup' element={< SignUpForm/>} />
        <Route path='currency-converter' element={< CurrencyConverter/>}/>
        <Route path='trips'>
          <Route index element={<TripDashboard />} />
          <Route path='details' element={< TripDetails/>} />
          <Route path='add-trip' element={< TripForm/>} />
          <Route path='add-expense' element={< ExpenseForm/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
