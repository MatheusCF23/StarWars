import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Header() {
  const { data, setFilter, inputs, setInputs, setSearch, search,
    columnFilter, setColumnFilter, saveFilter,
    setSaveFilter } = useContext(Context);

  useEffect(() => {
    setColumnFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  }, [setColumnFilter]);

  const handleSelect = () => {
    let arrayFilter = data;
    switch (inputs.operator) {
    case 'menor que':
      arrayFilter = search.filter((element) => Number(element[inputs
        .column]) < Number(inputs.number));
      break;
    case 'maior que':
      arrayFilter = search.filter((element) => Number(element[inputs
        .column]) > Number(inputs.number));
      break;
    default:
      arrayFilter = search.filter((element) => Number(element[inputs
        .column]) === Number(inputs.number));
      break;
    }
    setSearch(arrayFilter);
  };

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const removeColumn = () => {
    setSaveFilter([...saveFilter, inputs]);
    const remove = columnFilter.filter((element) => element !== inputs.column);
    setColumnFilter(remove);
  };

  const clickButton = () => {
    handleSelect();
    setSaveFilter([...saveFilter, inputs]);
    setInputs({ ...inputs, column: columnFilter[0] });
    removeColumn();
  };

  const removeFilter = (event) => {
    setSaveFilter(saveFilter.filter((element) => element.column !== event.target.value));
  };

  const removeFilterAll = () => {
    setSaveFilter([]);
    setColumnFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setSearch(data);
  };

  return (
    <div>
      <label htmlFor="search">
        Pesquisar
        <input
          data-testid="name-filter"
          type="text"
          name="search"
          id="search"
          onChange={ (element) => setFilter(element.target.value) }
        />
      </label>
      <form>
        <label htmlFor="column">
          Coluna
          <select
            name="column"
            id="column"
            value={ inputs.column }
            data-testid="column-filter"
            onChange={ handleChange }
          >
            {
              columnFilter.map((element) => (
                <option key={ element } value={ element }>{ element }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="operator">
          Operador
          <select
            id="operator"
            name="operator"
            value={ inputs.operator }
            data-testid="comparison-filter"
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="number">
          <input
            type="number"
            name="number"
            id="number"
            value={ inputs.number }
            data-testid="value-filter"
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ clickButton }
        >
          Filtrar
        </button>
      </form>
      <ul>
        {
          saveFilter.map((element, item) => (
            <li key={ item } data-testid="filter">
              <p>{`${element.column} ${element.operator} ${element.number}`}</p>
              <button
                type="button"
                value={ element.column }
                onClick={ removeFilter }
              >
                Delete
              </button>
            </li>
          ))
        }
      </ul>
      <button
        type="button"
        onClick={ removeFilterAll }
        data-testid="button-remove-filters"
      >
        Delete all
      </button>
    </div>
  );
}

export default Header;
