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
        <div className="converter-div">
          <div className="converter-sub-div">
            <div className="converter-block-div">
              <p className="converter-title">Your Friendly Currency Converter</p>
              <p className="converter-cta" ><strong style={{color: "#70c244"}}>Step 1:</strong> To use our free currency converter, search for your countries' currency codes using the dropdown below.</p>
              <select className="form-select converter-country-dropdown" onChange={handleSearchCountryInputChange} required name="searchCountry" id="searchCountry">
                <option value="">Lookup Currency Code by Country</option>
                {
                  countries.map(country => {
                      return <option key={country.name} value={country.name}>{country.name} - {country.currency_code}</option>
                  })
                }
              </select>
              <br />
              <p className="converter-cta"><strong style={{color: "#70c244"}}>Step 2:</strong> Input the codes into the converter, and we'll calculate the conversion for you.</p>
            <div className="sub-container">
              <p className="converter-sub-title"><strong style={{color: "#70c244"}}>From:</strong></p>
              <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
                className="input"
              />
              <br/>
              <p className="converter-sub-title"><strong style={{color: "#70c244"}}>To:</strong></p>
              <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
                className="input"
              />
              <br />
              <p className="converter-cta" style={{marginTop: "15px"}}><strong style={{color: "#70c244"}}>Step 3:</strong> Create a budget to track your converted expenses in one place.  <Link to="../signup">Signup</Link> to get started today.</p>
              <br />
            </div>  
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrencyConverter;