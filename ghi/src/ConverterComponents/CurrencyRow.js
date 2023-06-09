import React from 'react'


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
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}