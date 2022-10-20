import { useEffect, useState } from "react";
import { useGetBudgetsQuery } from './store/budgetsApi';


export default function ExchangeRates(props) {
    const [exchangeRates, setExchangeRates] = useState([]);
    const {
        data: budgetsData,
        // error: budgetsError,
        // isLoading: budgetsIsLoading
    } = useGetBudgetsQuery();
    // const [budgetExchange, setBudgetExchange] = useState([]);
    let homeCountry = "";
    async function budgetInfo(){
        try{
            homeCountry += budgetsData[parseInt(props.props)-1]["home_country"];
        } catch(err) {
            console.log("woops")
        }
    }
    budgetInfo();

    const [error, setError] = useState([]);
    const dynamicUrl = `https://api.exchangerate.host/latest?base=${homeCountry}`
    console.log(dynamicUrl)

        useEffect(() => {
            async function getExchangeData() {
            // const url = "https://api.exchangerate.host/latest?base=USD";
            const url = dynamicUrl;
            const response = await fetch(url);
            if (response.ok) {
                const exchangeData = await response.json();
                setExchangeRates(exchangeData);
            } else {
                setError('Could not load page data');
            }
            };
            getExchangeData();
        }, []);

    return exchangeRates.rates
}
