import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    setError(null);
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/' + fromCurrency);
      const rate = response.data.rates[toCurrency];
      const result = amount * rate;
      setConvertedAmount(result.toFixed(2));
    } catch (err) {
      setError('Could not fetch conversion rate. Please try again later.');
    }
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="converter-container">
        <div className="input-group">
          <label>Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>From</label>
          <input 
            type="text" 
            value={fromCurrency} 
            onChange={(e) => setFromCurrency(e.target.value.toUpperCase())} 
          />
        </div>
        <div className="input-group">
          <label>To</label>
          <input 
            type="text" 
            value={toCurrency} 
            onChange={(e) => setToCurrency(e.target.value.toUpperCase())} 
          />
        </div>
        <button onClick={handleConvert}>Convert</button>
        {error && <p className="error">{error}</p>}
        {convertedAmount && (
          <div className="result">
            <h2>Converted Amount:</h2>
            <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;