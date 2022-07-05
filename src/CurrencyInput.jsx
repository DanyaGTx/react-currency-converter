import React from 'react'

const CurrencyInput = ({currencyOptions,selectedCurrency,onChangeCurrency,amount,onChangeAmount}) => {
  return (
    <div>
      <input className='currency__input' type='number' value={amount} onChange={onChangeAmount}/>
      <select className='currency__select' value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(valute => <option key={valute} value={valute}>{valute}</option>)}
      </select>
    </div>
  )
}

export default CurrencyInput