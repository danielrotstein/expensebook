import React from 'react'
import countries from '../CountryList';


export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props


  return (
    <div className="converter-input-div">
      <input type="number" className="converter-input" value={amount} onChange={onChangeAmount} />
      <select className="converter-dropdown" value={selectedCurrency} onChange={onChangeCurrency}>
        {countries.map(option => (
          <option key={option} value={option.currency_code}>{option.name} - {option.currency_code}</option>
        ))}
      </select>
    </div>
  )
}