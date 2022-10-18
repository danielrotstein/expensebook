import { useEffect, useState } from "react";


export default function ExchangeRates(props) {
const [exchangeRates, setExchangeRates] = useState([]);
const [error, setError] = useState([]);

    useEffect(() => {
        async function getExchangeData() {
        const url = "https://api.exchangerate.host/latest?&base=USD";
        // const url = `https://api.exchangerate.host/latest&base=${props.homeCountry}`;
        // console.log(url);
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
