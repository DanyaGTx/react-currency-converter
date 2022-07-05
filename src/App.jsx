import { useEffect, useState } from 'react';
import './App.css';
import CurrencyInput from './CurrencyInput';



const URL = "https://api.exchangerate.host/latest";


function App() {

  const [usd, setUsd] = useState(0);
  const [euro, setEuro] = useState(0);


  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(2)
  }

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[147] //перевод в usd (стартовый перевод)
        setCurrencyOptions(Object.keys(data.rates))
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
        setUsd((data.rates.USD * data.rates.UAH).toFixed(2))
        setEuro((data.rates.EUR * data.rates.UAH).toFixed(2))
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${URL}?base=${fromCurrency}&symbols=${toCurrency}`)
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

  return (
    <div className='App'>
      <header className='header'>
        <h1 className='app__title'>Currency Converter</h1>
        <div className='current__rate'>
          <div className='current__USD'>
            <h3>USD</h3>
            <h2 className='current__rate-color' >{usd}₴</h2>
          </div>
          <div className='current__EUR'>
            <h3>EUR</h3>
            <h2 className='current__rate-color' >{euro}₴</h2>
          </div>
        </div>
      </header>
      <main>
        <div className='currencies__blocks'>
          <div className='currency__block'>
            <h3 className='input__title'>Give:</h3>
            <CurrencyInput
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={e => setFromCurrency(e.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
          </div>
          <div className='currency__block'>
            <h3 className='input__title'>Get:</h3>
            <CurrencyInput
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={e => setToCurrency(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
            />
          </div>

        </div>
      </main>

    </div>
  );
}

export default App;