import React from 'react';
import './App.css';
import Table from './components/table/Table';
import JsonState from './context/jsonplaceholder/JsonState';
function App() {
  return (
  <JsonState>
    <div className="App">
      <div className='table-container'>
        <Table/>
      </div>
    </div>
  </JsonState>);
}

export default App;
