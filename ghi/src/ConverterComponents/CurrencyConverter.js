import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyRow from './CurrencyRow';
import countries from '../CountryList';


const url = "https://api.exchangerate.host/latest"

function CurrencyConverter() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [country, setCountry] = useState()


  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(`${url}`)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[46]
        setCurrencyOptions([data.base="USD", ...Object.keys(data.rates)])
        setFromCurrency(data.base) // USD
        setToCurrency(firstCurrency) // EURO
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])
  
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  const handleSearchCountryInputChange = (e) => {
    const value = e.target.value;
    setCountry(value);
};



  return (
    <>
      <div className="container">
        <p className="converter-title">Your Friendly Currency Converter</p>
        <br/>



        <div className='container'>
          <h4>Look up currency code for each country:</h4>

            <select onChange={handleSearchCountryInputChange} required name="searchCountry" id="searchCountry" className="form-select input">
                <option value="">Search</option>
                {
                    countries.map(country => {
                        return <option key={country.name} value={country.name}>{country.name} - {country.currency_code}</option>
                    })
                }
              </select>

          </div>




        <div className="sub-container">
          <p className="converter-sub-title">From:</p>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
            className="input"
          />
          <br/>
          <p className="converter-sub-title">To:</p>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
            className="input"
          />
          <br />
        </div>
      </div>
    </>
  );
}

export default CurrencyConverter;