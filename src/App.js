import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import Context from './context/Context';
import API from './services/API';

function App() {
  const [inputs, setInputs] = useState({
    column: 'population',
    operator: 'maior que',
    number: 0,
  });
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState([]);
  const [columnFilter, setColumnFilter] = useState([]);
  const [saveFilter, setSaveFilter] = useState([]);

  useEffect(() => {
    API().then((result) => setData(result));
  }, []);

  const value = useMemo(() => ({
    data,
    setData,
    filter,
    setFilter,
    inputs,
    setInputs,
    search,
    setSearch,
    columnFilter,
    setColumnFilter,
    saveFilter,
    setSaveFilter,
  }), [data, setData, filter, setFilter, inputs,
    setInputs, search, setSearch, columnFilter, setColumnFilter,
    saveFilter, setSaveFilter]);

  return (
    <div>
      <Context.Provider value={ value }>
        <span>Star Wars</span>
        <Header />
        <Table />
      </Context.Provider>
    </div>
  );
}

export default App;
