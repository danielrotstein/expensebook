import React from 'react'
import Notification from '../Notification';
import countries from '../CountryList';

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props

  console.log(amount)

  if (amount === undefined || amount === NaN) {
    return (
      <div className="container">
        <Notification type="info">Loading...</Notification>
      </div>
    );
  } else {  
    return (
      <div>
        <input type="number" className="input" value={amount} onChange={onChangeAmount} />
        <select value={selectedCurrency} onChange={onChangeCurrency} className="converter-input">
          {countries.map(option => (
            <option key={option.name} value={option.name}>{`${option.name} ${option.currency_code}`}</option>
          ))}
        </select>
      </div>
    )
  }
}