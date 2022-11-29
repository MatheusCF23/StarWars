import React, { useContext } from 'react';
import Context from '../context/Context';

function Header() {
  const { filter, setFilter } = useContext(Context);
  return (
    <header>
      <h1>Iciando Projeto Star Wars !</h1>
      <label htmlFor="filters">
        <input
          type="text"
          id="filters"
          name="SearchFilter"
          data-testid="name-filter"
          value={ filter }
          onChange={ (element) => setFilter(element.target.value) }
        />
      </label>
    </header>
  );
}

export default Header;
