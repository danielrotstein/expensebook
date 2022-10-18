import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'
import countries from './CountryList';

// const url = "https://api.apilayer.com/exchangerates_data/latest"
// const api_key = "chVGAxFwlHINXiLLCQW29oRM1VAPZq3l"

const url = "https://api.exchangerate.host/latest"

function CurrencyConverter() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  

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
        setFromCurrency(data.base) // EURO
        setToCurrency(firstCurrency) // USD
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


  
  {
    countries.map(country => {
        return <option key={country.name} value={country.name}>{country.name}</option>
    })
  }




  return (
    <>
      <h1>Your Friendly Currency Converter</h1>
      <br/>
      <h3>From</h3>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <br/>
      <h3>To</h3>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default CurrencyConverter;